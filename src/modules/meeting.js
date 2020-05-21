import _ from 'lodash'
import {getFromLocalStorage, getLocalTracks, randomString} from '../utils'
import {getRoom, setRoom} from '../store/room'
import {
    addUser,
    updateUser,
    addRemoteUserTrack,
    removeUser,
    updateDominantSpeaker,
} from '../store/users'
import {pushMessage} from '../store/messages'
import {jitsi as jitsiConfig} from '../config/config.dev'

const JOIN_MINI_CONFERENCE_CMD = 'JOIN_MINI_CONFERENCE'
const LEAVE_MINI_CONFERENCE_CMD = 'LEAVE_MINI_CONFERENCE'
const SET_GLOBAL_UID_CMD = 'SET_GLOBAL_UID'
const SET_EMOJI_CMD = 'SET_EMOJI'
const DEFAULT_EMOJI = '😷'
const DEFAULT_USERNAME = 'anonymous'

export const initJitsi = store => {
    console.warn('initJitsi')

    window.JitsiMeetJS.init(jitsiConfig)

    connect(store)
}

const connect = ({dispatch, getState}) => {
    const {CONNECTION_ESTABLISHED, CONNECTION_FAILED, CONNECTION_DISCONNECTED} = window.JitsiMeetJS.events.connection

    window.JitsiConnection = new window.JitsiMeetJS.JitsiConnection(null, null, jitsiConfig)

    const onConnectionSuccess = () => {
        console.warn('onConnectionSuccess')

        const roomConfig = getRoom(getState())
        joinConference(dispatch, roomConfig)
    }

    const onConnectionFailed = e => {
        console.error('Connection Failed!', e)
    }

    const disconnect = () => {
        window.JitsiConnection.removeEventListener(CONNECTION_ESTABLISHED, onConnectionSuccess)
        window.JitsiConnection.removeEventListener(CONNECTION_FAILED, onConnectionFailed)
        window.JitsiConnection.removeEventListener(CONNECTION_DISCONNECTED, disconnect)
    }

    // bind connection events
    window.JitsiConnection.addEventListener(CONNECTION_ESTABLISHED, onConnectionSuccess)
    window.JitsiConnection.addEventListener(CONNECTION_FAILED, onConnectionFailed)
    window.JitsiConnection.addEventListener(CONNECTION_DISCONNECTED, disconnect)

    window.JitsiConnection.connect(undefined)
}

/////////////////
// ROOMS
/////////////////
const joinConference = (dispatch, roomConfig) => {
    if (!window.JitsiConnection) return

    console.warn('roomConfig=' + JSON.stringify(roomConfig))

    const JitsiConference = window.JitsiConnection.initJitsiConference(roomConfig.jitsiRoomName, jitsiConfig)

    const {
        DISPLAY_NAME_CHANGED, MESSAGE_RECEIVED, PRIVATE_MESSAGE_RECEIVED,
        CONFERENCE_JOINED, USER_JOINED, TRACK_ADDED, TRACK_REMOVED, USER_LEFT,
        DOMINANT_SPEAKER_CHANGED
    } = window.JitsiMeetJS.events.conference

    JitsiConference.on(DISPLAY_NAME_CHANGED, (id, displayName) => {
        dispatch(updateUser(id, {displayName}))
    })

    JitsiConference.on(DOMINANT_SPEAKER_CHANGED, (id) => {
        dispatch(updateDominantSpeaker(id))
    })

    JitsiConference.addCommandListener(SET_EMOJI_CMD, e => {
        const userId = e.attributes['id']
        const emoji = e.attributes['emoji']

        console.warn(SET_EMOJI_CMD, userId, emoji)

        dispatch(updateUser(userId, {emoji}))
    })

    JitsiConference.addCommandListener(SET_GLOBAL_UID_CMD, e => {

        const conference_id = e.attributes['conference_id']
        const globalUID = e.attributes['globalUID']

        console.warn(SET_GLOBAL_UID_CMD, conference_id, globalUID, e.attributes)

        dispatch(updateUser(conference_id, {globalUID}))
    })

    JitsiConference.on(MESSAGE_RECEIVED, function (id, text, ts) {
        // TODO(DROR): ts can be none here,
        console.warn('MESSAGE_RECEIVED', id, text, ts)
        let msg_object = null
        try {
            msg_object = JSON.parse(text)

        } catch (e) {
            return;
        }

        const globalUID = getFromLocalStorage('GLOBAL_UID')
        msg_object.from_me = msg_object.globalUID === globalUID
        msg_object.to_me = msg_object.recipient === globalUID

        if (msg_object.from_me || msg_object.to_me || msg_object.recipient === "public") {
            dispatch(pushMessage({
                ...msg_object,
                ts: ts ? new Date(Date.parse(ts)) : new Date(),  // ts is only sent when we refresh
            }))
        }

    })


    JitsiConference.on(CONFERENCE_JOINED, onConferenceJoined(dispatch))
    JitsiConference.on(USER_JOINED, onUserJoined(dispatch))
    JitsiConference.on(TRACK_ADDED, onRemoteTrackAdded(dispatch))
    JitsiConference.on(TRACK_REMOVED, onRemoteTrackRemoved(dispatch))
    JitsiConference.on(USER_LEFT, onUserLeft(dispatch))

    JitsiConference.addCommandListener(JOIN_MINI_CONFERENCE_CMD, onSideRoomJoined(dispatch))
    JitsiConference.addCommandListener(LEAVE_MINI_CONFERENCE_CMD, onSideRoomLeft(dispatch))

    window.JitsiConference = JitsiConference

    dispatch(setRoom(roomConfig))

    JitsiConference.join()
}

export const changeConference = roomConfig => dispatch => {
    if (!window.JitsiConference) return

    window.JitsiConference.leave()
        .then(() => {
            joinConference(dispatch, roomConfig)
        })
}

/////////////////
// LOCAL USER


/////////////////
const onConferenceJoined = dispatch => () => {
    console.warn('onConferenceJoined')

    const userId = window.JitsiConference.myUserId()

    const displayName = getFromLocalStorage('DISPLAY_NAME', DEFAULT_USERNAME)
    const emoji = getFromLocalStorage('EMOJI', DEFAULT_EMOJI)
    const globalUID = getFromLocalStorage('GLOBAL_UID', randomString(16))

    dispatch(addUser({
        id: userId,
        globalUID: globalUID,
        isLocal: true,
        displayName: displayName,
        emoji: emoji,
        activeRoom: 'MAIN',
    }))

    // Send the cached display_name and emoji to other participants
    setLocalDisplayName(userId, displayName)
    setLocalEmoji(emoji)
    setGlobalUID(globalUID)

    // We want to explicitly ask for the device we last used
    // for dror for example, switching rooms selects the snap camera instead of the regular
    // This fixes it
    const create_local_track_options = {
        devices: ["video", "audio"],
        cameraDeviceId: getFromLocalStorage("video_device_id", null),
        onLocalTracks: getFromLocalStorage("audio_device_id", null),
    }

    // Try to get audio/video. TODO(DROR): This might fail, we need the users's help
    window.JitsiMeetJS.createLocalTracks(create_local_track_options)
        .then(onLocalTracks(dispatch))
        .catch((error) => {
            throw error
        })
}

const onLocalTracks = dispatch => in_tracks => {

    console.error("onLocalTracks", in_tracks)

    _.map(in_tracks, (local_track) => {

        window.localStorage.setItem(`${local_track.getType()}_device_id`, local_track.getDeviceId())

        local_track.addEventListener(
            window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            onTrackMuteChanged(dispatch)
        )

        // Send lower quality video by default
        window.JitsiConference.setSenderVideoConstraint(180)

        if (local_track.getType() === 'video') {
            const last_video_preference = getFromLocalStorage('SHOW_VIDEO', 'false')
            if (last_video_preference === 'true') {
                console.warn('unmuting video')
                local_track.unmute()
            } else {
                local_track.mute()
            }
        } else {
            // Always start with audio muted
            local_track.mute().then(() => {
                console.warn('audio muted...')
            })
        }

        window.JitsiConference.addTrack(local_track).then(() => {

            console.warn('FOO', local_track)

            dispatch(updateUser(window.JitsiConference.myUserId(), {
                hasTracks: true,
                [`muted_${local_track.getType()}`]: local_track.isMuted(),
                [`has_${local_track.getType()}`]: true
            }))

            // Send lower quality video by default, incase the first time didn't work
            window.setTimeout(function () {
                window.JitsiConference.setSenderVideoConstraint(180)
            }, 1000)
        })
    })

    dispatch(updateUser(window.JitsiConference.myUserId(), {hasTracks: true}))
}

/////////////////
// REMOTE USERS
/////////////////
const onUserJoined = dispatch => userId => {
    const user = window.JitsiConference.getParticipantById(userId)
    console.warn('onUserJoined', user)

    dispatch(addUser({
        id: userId,
        activeRoom: 'MAIN',
        displayName: user.getDisplayName()
    }))
}

const onRemoteTrackAdded = dispatch => track => {
    if (track.isLocal()) {
        window.JitsiConference.setSenderVideoConstraint(180)
        return
    }

    console.warn('Remote TRACK_ADDED', track.getParticipantId(), track.isMuted(), track)

    track.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, onTrackMuteChanged(dispatch))
    track.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
        console.warn('remote track stoped')
    )
    track.addEventListener(
        window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId) =>
            console.warn(`track audio output device was changed to ${deviceId}`)
    )

    const userId = track.getParticipantId()

    dispatch(addRemoteUserTrack(userId, track.getType(), track.isMuted()))
}

const onRemoteTrackRemoved = dispatch => track => {
    if (track.isLocal()) {
        return
    }
    console.warn('Remote TRACK_REMOVED', track, track.containers)

    // const userId = track.getParticipantId()
    // dispatch(removeRemoteTrack(userId, track))
}

const onUserLeft = dispatch => userId => {
    dispatch(removeUser(userId))
}

/////////////////
// SIDE ROOMS
/////////////////
export const joinSideRoom = roomName => {
    const room = window.JitsiConference
    if (!room) return

    const userId = room.myUserId()

    room.sendCommand(JOIN_MINI_CONFERENCE_CMD, {
        attributes: {
            from: userId,
            to: roomName
        }
    })

    // dispatch(updateUser(userId, { activeRoom: roomName }))
}

const onSideRoomJoined = dispatch => e => {
    const userId = e.attributes['from']
    const to = e.attributes['to']

    console.warn(JOIN_MINI_CONFERENCE_CMD, userId, to)

    if (userId === window.JitsiConference.myUserId()) {
        const {audio} = getLocalTracks()
        if (audio) {
            audio.unmute()
        }
    }

    dispatch(updateUser(userId, {activeRoom: to}))
}

export const leaveSideRoom = roomName => {
    const room = window.JitsiConference
    if (!room) return

    room.removeCommand(JOIN_MINI_CONFERENCE_CMD)
    room.sendCommandOnce(LEAVE_MINI_CONFERENCE_CMD, {
        attributes: {
            from: room.myUserId(),
            to: roomName
        }
    })

    // dispatch(updateUser(room.myUserId(), { activeRoom: 'MAIN' }))
}

const onSideRoomLeft = dispatch => e => {
    if (!window.JitsiConference) return

    const userId = e.attributes['from']

    console.warn(LEAVE_MINI_CONFERENCE_CMD, userId)

    if (userId === window.JitsiConference.myUserId()) {
        const {audio} = getLocalTracks()
        audio && audio.mute()
    }

    dispatch(updateUser(userId, {activeRoom: 'MAIN'}))
}

//////////////////////
// USER INTERACTIONS
//////////////////////
export const onVideoMuteToggle = () => {
    const {video} = getLocalTracks()
    if (!video) {
        return
    }
    if (video.isMuted()) {
        video.unmute()
        window.localStorage.setItem('SHOW_VIDEO', 'true')
    } else {
        video.mute()
        window.localStorage.setItem('SHOW_VIDEO', 'false')
    }
}

const onTrackMuteChanged = dispatch => track => {
    console.warn('TRACK_MUTE_CHANGED', track)

    if (!track) {
        return
    }
    const userId = track.ownerEndpointId ? track.ownerEndpointId : window.JitsiConference.myUserId()

    dispatch(updateUser(userId, {
        [`muted_${track.getType()}`]: track.isMuted()
    }))

}

const onLocalTrackMuteChanged = () => {
}

const onLocalTrackStopped = () => {
}

const OnLocalTrackAudioOutputChanged = () => {
}

export const setLocalDisplayName = (userId, displayName) => {
    if (!window.JitsiConference) return

    console.warn('setLocalDisplayName')

    // This will send the event name to other participants
    window.JitsiConference.setDisplayName(displayName)

    // Save this on localStorage
    window.localStorage.setItem('DISPLAY_NAME', displayName)

    // Because DISPLAY_NAME_CHANGED is not fired for local users, fire it
    window.JitsiConference.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, userId, displayName)
}

export const setLocalEmoji = (emoji) => {
    if (!window.JitsiConference) return

    // This will send the event name to other participants
    window.JitsiConference.sendCommand(SET_EMOJI_CMD, {
            attributes: {
                'id': window.JitsiConference.myUserId(),
                'emoji': emoji
            }
        }
    )
    window.localStorage.setItem('EMOJI', emoji)
}

export const setGlobalUID = (globalUID) => {
    if (!window.JitsiConference) return

    // This will send the event name to other participants
    window.JitsiConference.sendCommand(SET_GLOBAL_UID_CMD, {
            attributes: {
                'globalUID': globalUID,
                'conference_id': window.JitsiConference.myUserId()
            }
        }
    )
    window.localStorage.setItem('GLOBAL_UID', globalUID)
}

export const sendPublicMessage = (msg) => {
    sendPrivateMessage("public", "public", msg);
}

export const sendPrivateMessage = (targetGlobalUID, targetDisplayName, msg) => {
    if (!window.JitsiConference) return

    console.error("sendPrivate", targetGlobalUID, targetDisplayName, msg)

    // TODO(DROR,ASAF): Can we access the state here?
    const displayName = getFromLocalStorage('DISPLAY_NAME', DEFAULT_USERNAME)
    const emoji = getFromLocalStorage('EMOJI', DEFAULT_EMOJI)


    const msg_object = {
        globalUID: getFromLocalStorage('GLOBAL_UID'),
        displayName: displayName,
        targetDisplayName: targetDisplayName,
        emoji: emoji,
        recipient: targetGlobalUID,
        text: msg
    }

    window.JitsiConference.sendMessage(JSON.stringify(msg_object))
}

/////////////////
// MISC
/////////////////
export const kickInterruptedConnections = () => {
    if (!window.JitsiConference) return

    const participants = window.JitsiConference.getParticipants()
    _.forEach(participants, p => {
        if (p._connectionStatus === 'interrupted') {
            console.warn('Kicking participant because of interrupted connection', p._id)
            window.JitsiConference.kickParticipant(p._id)
        }
    })
}

export const unload = () => {
    if (!window.JitsiConference) return

    _.each(window.JitsiConference.getLocalTracks(), track => track.dispose())
    window.JitsiConference.leave()
    window.connection.disconnect()
}
