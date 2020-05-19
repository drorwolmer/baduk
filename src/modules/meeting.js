import _ from 'lodash'
import { ROOMS } from '../consts'
import { getFromLocalStorage } from '../utils'
import { setRoom } from '../store/room'
import { addUser, updateUser, addRemoteUserTrack, removeUser } from '../store/users'
import { pushMessage } from '../store/messages'

const JOIN_MINI_CONFERENCE = 'JOIN_MINI_CONFERENCE'
const LEAVE_MINI_CONFERENCE = 'LEAVE_MINI_CONFERENCE'
const SET_EMOJI = 'SET_EMOJI'

export const initJitsi = (options, dispatch) => {
  console.warn('initJitsi')


  const onRemoteTrackMuteChanged = () => {}

  const JitsiMeetJS = window.JitsiMeetJS

  JitsiMeetJS.init(options)

  const connection = new JitsiMeetJS.JitsiConnection(null, null, options)

  window.connection = connection

  let room

  const { CONNECTION_ESTABLISHED, CONNECTION_FAILED, CONNECTION_DISCONNECTED} = JitsiMeetJS.events.connection

  const onConnectionSuccess = () => {
    console.warn('onConnectionSuccess')

    const roomKey = window.location.href.indexOf('toilet') > -1 ? 'toilet' : 'block'
    const roomConfig = ROOMS[roomKey]

    room = connection.initJitsiConference(roomConfig.jitsiRoomName, options)

    // bind events
    const {
      DISPLAY_NAME_CHANGED, MESSAGE_RECEIVED, PRIVATE_MESSAGE_RECEIVED,
      CONFERENCE_JOINED, USER_JOINED, TRACK_ADDED, TRACK_REMOVED, USER_LEFT
    } = JitsiMeetJS.events.conference

    room.on(DISPLAY_NAME_CHANGED, (id, displayName) => {
      dispatch(updateUser(id, { displayName }))
    })

    room.addCommandListener(SET_EMOJI, e => {
      const emoji = e.attributes['emoji']
      const userId = e.attributes['id']

      dispatch(updateUser(userId, { emoji }))
    })

    room.on(MESSAGE_RECEIVED, function (id, text, ts) {
      console.warn('MESSAGE_RECEIVED', id, text, ts)
      dispatch(pushMessage(id, text))
    })

    room.on(PRIVATE_MESSAGE_RECEIVED, function (id, text, ts) {
      console.warn('PRIVATE_MESSAGE_RECEIVED', id, text, ts)
      dispatch(pushMessage(id, text))
    })

    room.on(CONFERENCE_JOINED, onConferenceJoined)
    room.on(USER_JOINED, onUserJoined)
    room.on(TRACK_ADDED, onRemoteTrackAdded)
    room.on(TRACK_REMOVED, onRemoteTrackRemoved)
    room.on(USER_LEFT, onUserLeft)

    room.addCommandListener(JOIN_MINI_CONFERENCE, onSideRoomJoined)
    room.addCommandListener(LEAVE_MINI_CONFERENCE, onSideRoomLeft)

    window.room = room

    dispatch(setRoom(roomConfig))

    room.join()
  }

  const onConnectionFailed = e => {
    console.error("Connection Failed!", e)
  }

  const disconnect = () => {
    connection.removeEventListener(CONNECTION_ESTABLISHED, onConnectionSuccess)
    connection.removeEventListener(CONNECTION_FAILED, onConnectionFailed)
    connection.removeEventListener(CONNECTION_DISCONNECTED, disconnect)
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
  connection.addEventListener(CONNECTION_ESTABLISHED, onConnectionSuccess)
  connection.addEventListener(CONNECTION_FAILED, onConnectionFailed)
  connection.addEventListener(CONNECTION_DISCONNECTED, disconnect)

  connection.connect(undefined)
}

export const joinSideRoom = roomName => {
  const room = window.room
  if (!room) return

  const userId = room.myUserId()

  room.sendCommand(JOIN_MINI_CONFERENCE, {
    attributes: {
      from: userId,
      to: roomName
    }
  })

  // dispatch(updateUser(userId, { activeRoom: roomName }))
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

export const sendPublicMessage = (msg) => {
  if (!window.room) return

  window.room.sendMessage(msg)
}

export const sendPrivateMessage = (targetId, msg) => {
  if (!window.room) return

  console.error('sendPrivateTextMessage to ' + targetId)
  window.room.sendPrivateTextMessage(targetId, msg)
}

export const kickInterruptedConnections = () => {
  if (!window.room) return

  const participants = window.room.getParticipants()
  _.forEach(participants, p => {
    if (p._connectionStatus === 'interrupted') {
      console.warn('Kicking participant because of interrupted connection', p._id)
      window.room.kickParticipant(p._id)
    }
  })
}

export const unload = () => {
  if (!window.room) return

  _.each(window.room.getLocalTracks(), track => track.dispose())
  window.room.leave()
  window.connection.disconnect()
}