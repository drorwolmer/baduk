import _ from 'lodash'
import { ROOMS } from '../consts'
import { getFromLocalStorage, getTracks } from '../utils'
import { setRoom } from '../store/room'
import { addUser, updateUser, addRemoteUserTrack, removeUser } from '../store/users'

const JOIN_MINI_CONFERENCE = 'JOIN_MINI_CONFERENCE'
const LEAVE_MINI_CONFERENCE = 'LEAVE_MINI_CONFERENCE'
const SET_EMOJI = 'SET_EMOJI'

export const initJitsi = (options, dispatch) => {
  console.warn('initJitsi')

  const onConnectionFailed = () => {}
  const disconnect = () => {}
  const unload = () => {}
  const onDeviceListChanged = () => {}
  const onRemoteTrackMuteChanged = () => {}
  const onUserStatusChanged = () => {}

  const JitsiMeetJS = window.JitsiMeetJS

  JitsiMeetJS.init(options)

  const connection = new JitsiMeetJS.JitsiConnection(null, null, options)

  let room

  const onConnectionSuccess = () => {
    console.warn('onConnectionSuccess')

    let room_name = 'block_demo_block'
    if (window.location.href.indexOf('toilet') > -1) {
      room_name = 'block_demo_toiletsss'
    }

    room = connection.initJitsiConference(room_name, options)

    // bind events
    const {
      DISPLAY_NAME_CHANGED, SUBJECT_CHANGED, MESSAGE_RECEIVED, PRIVATE_MESSAGE_RECEIVED,
      USER_STATUS_CHANGED, CONFERENCE_JOINED, USER_JOINED, TRACK_ADDED, TRACK_REMOVED, USER_LEFT
    } = JitsiMeetJS.events.conference

    room.on(DISPLAY_NAME_CHANGED, (id, displayName) => {
      console.error('DISPLAY_NAME_CHANGED', id, displayName)
      dispatch(updateUser(id, { displayName }))
    })

    room.addCommandListener(SET_EMOJI, e => {
      const emoji = e.attributes['emoji']
      const userId = e.attributes['id']
      console.error('SET_EMOJI', id, emoji)
      dispatch(updateUser(userId, { emoji }))
    })

    room.on(SUBJECT_CHANGED, function (subject) {
      console.error('SUBJECT_CHANGED', subject)
    })

    room.on(MESSAGE_RECEIVED, function (id, text, ts) {
      // $(`.video_${id} .chat`).show().text(text).delay(10000).fadeOut(800);
      console.error('MESSAGE_RECEIVED', id, text, ts)
    })

    room.on(PRIVATE_MESSAGE_RECEIVED, function (id, text, ts) {
      // $(`.video_${id} .chat_private`).show().text(text).delay(10000).fadeOut(800)
      console.error('PRIVATE_MESSAGE_RECEIVED', id, text, ts)
    })

    room.on(USER_STATUS_CHANGED, onUserStatusChanged)

    room.on(CONFERENCE_JOINED, onConferenceJoined)
    room.on(USER_JOINED, onUserJoined)
    room.on(TRACK_ADDED, onRemoteTrackAdded)
    room.on(TRACK_REMOVED, onRemoteTrackRemoved)
    room.on(USER_LEFT, onUserLeft)

    room.addCommandListener(JOIN_MINI_CONFERENCE, onSideRoomJoined)
    room.addCommandListener(LEAVE_MINI_CONFERENCE, onSideRoomLeft)

    window.room = room

    dispatch(setRoom(ROOMS.BLOCK))

    room.join()
  }

  const onSideRoomJoined = e => {
    const userId = e.attributes['from']
    const to = e.attributes['to']

    dispatch(updateUser(userId, { activeRoom: to }))
  }

  const onSideRoomLeft = e => {
    const userId = e.attributes['from']

    dispatch(updateUser(userId, { activeRoom: 'MAIN' }))
  }

  /////////////////
  // LOCAL USER
  /////////////////
  const onConferenceJoined = () => {
    console.warn('onConferenceJoined')

    const userId = room.myUserId()
    const displayName = getFromLocalStorage('DISPLAY_NAME', 'ANONYMOUS')
    const emoji = getFromLocalStorage('EMOJI', '😷')

    setLocalDisplayName(userId, displayName)
    setLocalEmoji(userId, emoji)

    dispatch(addUser({ id: userId, isLocal: true, displayName, emoji, activeRoom: 'MAIN' }))

    JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] })
    .then(onLocalTracks)
    .catch((error) => {
      throw error
    })
  }

  const onLocalTracks = in_tracks => {
    _.map(in_tracks, (local_track) => {
      local_track.addEventListener(
        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
        onLocalTrackMuteChanged
      )
      local_track.addEventListener(
        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
        onLocalTrackStopped
      )
      local_track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        OnLocalTrackAudioOutputChanged
      )

      room.setSenderVideoConstraint(180)

      room.addTrack(local_track).then(() => {
        if (local_track.getType() === 'video') {
          local_track.unmute()
        } else {
          local_track.mute()
        }

        window.setTimeout(function () {
          room.setSenderVideoConstraint(180)
        }, 1000)
      })
    })

    dispatch(updateUser(room.myUserId(), { hasTracks: true }))
  }

  const onLocalTrackMuteChanged = () => {}
  const onLocalTrackStopped = () => {}
  const OnLocalTrackAudioOutputChanged = () => {}

  /////////////////
  // REMOTE USERS
  /////////////////
  const onUserJoined = userId => {
    const user = room.getParticipantById(userId)
    console.warn('onUserJoined', user)

    dispatch(addUser({ id: userId, activeRoom: 'MAIN' }))
  }

  const onRemoteTrackAdded = track => {
    if (track.isLocal()) {
      room.setSenderVideoConstraint(180)
      return
    }

    console.warn('Remote TRACK_ADDED', track.getParticipantId(), track.isMuted(), track)

    track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, onRemoteTrackMuteChanged)
    track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
      console.warn('remote track stoped')
    )
    track.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
      (deviceId) =>
        console.warn(`track audio output device was changed to ${deviceId}`)
    )

    const userId = track.getParticipantId()

    dispatch(addRemoteUserTrack(userId))
  }

  const onRemoteTrackRemoved = track => {
    if (track.isLocal()) {
      return
    }
    console.error('Remote TRACK_REMOVED', track, track.containers)

    // const userId = track.getParticipantId()
    // dispatch(removeRemoteTrack(userId, track))
  }

  const onUserLeft = userId => {
    dispatch(removeUser(userId))
  }

  // bind connection events
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    onConnectionSuccess
  )
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    onConnectionFailed
  )
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
    disconnect
  )

  JitsiMeetJS.mediaDevices.addEventListener(
    JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
    onDeviceListChanged
  )

  connection.connect(undefined)

}

export const joinSideRoom = roomName => {
  const room = window.room
  if (!room) return

  const userId = room.myUserId()

  room.sendCommand('JOIN_MINI_CONFERENCE', {
    attributes: {
      from: userId,
      to: roomName
    }
  })

  // dispatch(updateUser(userId, { activeRoom: roomName }))
}

export const setLocalDisplayName = (userId, displayName) => {
  if (!window.room) return

  console.warn('setLocalDisplayName')

  window.room.setDisplayName(displayName)
  window.localStorage.setItem('DISPLAY_NAME', displayName)
  window.room.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, userId, displayName)
}

export const setLocalEmoji = (userId, emoji) => {
  if (!window.room) return

  window.room.sendCommand(SET_EMOJI, {
      attributes: {
        'id': userId,
        'emoji': emoji
      }
    }
  )
  window.localStorage.setItem('EMOJI', emoji)
}

export const leaveSideRoom = roomName => {
  const room = window.room
  if (!room) return

  room.removeCommand(JOIN_MINI_CONFERENCE)
  room.sendCommandOnce(LEAVE_MINI_CONFERENCE, {
    attributes: {
      from: room.myUserId(),
      to: roomName
    }
  })

  // dispatch(updateUser(room.myUserId(), { activeRoom: 'MAIN' }))
}