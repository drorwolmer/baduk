import _ from 'lodash'
import {ROOMS} from '../consts'
import {getFromLocalStorage, getLocalTracks} from '../utils'
import {setRoom} from '../store/room'
import {addUser, updateUser, addRemoteUserTrack, removeUser, updateDominantSpeaker} from '../store/users'
import {pushMessage} from '../store/messages'

const JOIN_MINI_CONFERENCE_CMD = 'JOIN_MINI_CONFERENCE'
const LEAVE_MINI_CONFERENCE_CMD = 'LEAVE_MINI_CONFERENCE'
const SET_EMOJI_CMD = 'SET_EMOJI'
const DEFAULT_EMOJI = '😷'
const DEFAULT_USERNAME = 'anonymous'

export const onVideoMuteToggle = () => {
    const {video} = getLocalTracks()
    if (!video) {
        return
    }
    if (video.isMuted()) {
        video.unmute()
        window.localStorage.setItem("SHOW_VIDEO", "true")
    } else {
        video.mute()
        window.localStorage.setItem("SHOW_VIDEO", "false")
    }
}

export const initJitsi = (options, dispatch) => {

    console.warn('initJitsi')

    const JitsiMeetJS = window.JitsiMeetJS

    JitsiMeetJS.init(options)

    const JitsiConnection = new JitsiMeetJS.JitsiConnection(null, null, options)

    window.JitsiConnection = JitsiConnection

    let JitsiConference

    const {CONNECTION_ESTABLISHED, CONNECTION_FAILED, CONNECTION_DISCONNECTED} = JitsiMeetJS.events.connection

    const onConnectionSuccess = () => {
        console.warn('onConnectionSuccess')

        const roomKey = window.location.href.indexOf('toilet') > -1 ? 'toilet' : 'block'
        const roomConfig = ROOMS[roomKey]

        JitsiConference = JitsiConnection.initJitsiConference(roomConfig.jitsiRoomName, options)

        // bind events
        const {
            DISPLAY_NAME_CHANGED, MESSAGE_RECEIVED, PRIVATE_MESSAGE_RECEIVED,
            CONFERENCE_JOINED, USER_JOINED, TRACK_ADDED, TRACK_REMOVED, USER_LEFT,
            DOMINANT_SPEAKER_CHANGED
        } = JitsiMeetJS.events.conference

        JitsiConference.on(DISPLAY_NAME_CHANGED, (id, displayName) => {
            dispatch(updateUser(id, {displayName}))
        })

        JitsiConference.on(DOMINANT_SPEAKER_CHANGED, (id) => {
            dispatch(updateDominantSpeaker(id))
        })

        JitsiConference.addCommandListener(SET_EMOJI_CMD, e => {
            const userId = e.attributes['id']
            const emoji = e.attributes['emoji']

            console.error(SET_EMOJI_CMD, userId, emoji)

            dispatch(updateUser(userId, {emoji}))
        })

        JitsiConference.on(MESSAGE_RECEIVED, function (id, text, ts) {
            // TODO(DROR): ts can be none here,
            console.warn('MESSAGE_RECEIVED', id, text, ts)
            dispatch(pushMessage(id, text))
        })

        JitsiConference.on(PRIVATE_MESSAGE_RECEIVED, function (id, text, ts) {
            // TODO(DROR): ts can be none here,
            console.warn('PRIVATE_MESSAGE_RECEIVED', id, text, ts)
            dispatch(pushMessage(id, text))
        })

        JitsiConference.on(CONFERENCE_JOINED, onConferenceJoined)
        JitsiConference.on(USER_JOINED, onUserJoined)
        JitsiConference.on(TRACK_ADDED, onRemoteTrackAdded)
        JitsiConference.on(TRACK_REMOVED, onRemoteTrackRemoved)
        JitsiConference.on(USER_LEFT, onUserLeft)

        JitsiConference.addCommandListener(JOIN_MINI_CONFERENCE_CMD, onSideRoomJoined)
        JitsiConference.addCommandListener(LEAVE_MINI_CONFERENCE_CMD, onSideRoomLeft)

        window.JitsiConference = JitsiConference

        dispatch(setRoom(roomConfig))

        JitsiConference.join()
    }

    const onConnectionFailed = e => {
        console.error("Connection Failed!", e)
    }

    const disconnect = () => {
        JitsiConnection.removeEventListener(CONNECTION_ESTABLISHED, onConnectionSuccess)
        JitsiConnection.removeEventListener(CONNECTION_FAILED, onConnectionFailed)
        JitsiConnection.removeEventListener(CONNECTION_DISCONNECTED, disconnect)
    }

    const onSideRoomJoined = e => {
        const userId = e.attributes['from']
        const to = e.attributes['to']

        console.error(JOIN_MINI_CONFERENCE_CMD, userId, to)

        if (userId === window.JitsiConference.myUserId()) {
            const {audio} = getLocalTracks()
            if (audio) {
                audio.unmute()
            }
        }

        dispatch(updateUser(userId, {activeRoom: to}))
    }

    const onSideRoomLeft = e => {
        const userId = e.attributes['from']

        console.error(LEAVE_MINI_CONFERENCE_CMD, userId)

        if (userId === JitsiConference.myUserId()) {
            const {audio} = getLocalTracks()
            audio && audio.mute()
        }

        dispatch(updateUser(userId, {activeRoom: 'MAIN'}))
    }

    /////////////////
    // LOCAL USER
    /////////////////
    const onConferenceJoined = () => {
        console.warn('onConferenceJoined')

        const userId = JitsiConference.myUserId()

        const displayName = getFromLocalStorage('DISPLAY_NAME', DEFAULT_USERNAME)
        const emoji = getFromLocalStorage('EMOJI', DEFAULT_EMOJI)
        // TODO(DROR): Remember camera state

        dispatch(addUser({
            id: userId,
            isLocal: true,
            displayName: displayName,
            emoji: emoji,
            activeRoom: 'MAIN'
        }))

        // Send the cached display_name and emoji to other participants
        setLocalDisplayName(userId, displayName)
        setLocalEmoji(userId, emoji)

        // Try to get audio/video. TODO(DROR): This might fail, we need the users's help
        JitsiMeetJS.createLocalTracks({devices: ['audio', 'video']})
            .then(onLocalTracks)
            .catch((error) => {
                throw error
            })
    }

    const onLocalTracks = in_tracks => {
        _.map(in_tracks, (local_track) => {

            local_track.addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                onTrackMuteChanged
            )

            // Send lower quality video by default
            JitsiConference.setSenderVideoConstraint(180)

            if (local_track.getType() === "video") {
                const last_video_preference = getFromLocalStorage('SHOW_VIDEO', "false")
                if (last_video_preference === "true") {
                    console.error("unmuting video")
                    local_track.unmute()
                } else {
                    local_track.mute()
                }
            } else {
                // Always start with audio muted
                local_track.mute().then(() => {
                    console.error("audio muted...")
                })
            }

            JitsiConference.addTrack(local_track).then(() => {

                console.error("FOO", local_track)

                dispatch(updateUser(JitsiConference.myUserId(), {
                    hasTracks: true,
                    [`muted_${local_track.getType()}`]: local_track.isMuted(),
                    [`has_${local_track.getType()}`]: true
                }))

                // Send lower quality video by default, incase the first time didn't work
                window.setTimeout(function () {
                    JitsiConference.setSenderVideoConstraint(180)
                }, 1000)
            })
        })

        dispatch(updateUser(JitsiConference.myUserId(), {hasTracks: true}))
    }

    const onLocalTrackMuteChanged = () => {
    }
    const onLocalTrackStopped = () => {
    }
    const OnLocalTrackAudioOutputChanged = () => {
    }

    /////////////////
    // REMOTE USERS
    /////////////////
    const onUserJoined = userId => {
        const user = JitsiConference.getParticipantById(userId)
        console.warn('onUserJoined', user)

        dispatch(addUser({
            id: userId,
            activeRoom: 'MAIN',
            displayName: user.getDisplayName()
        }))
    }

    const onTrackMuteChanged = (track) => {
        console.error("TRACK_MUTE_CHANGED", track)

        if (!track) {
            return
        }
        const userId = track.ownerEndpointId ? track.ownerEndpointId : window.JitsiConference.myUserId()

        dispatch(updateUser(userId, {
            [`muted_${track.getType()}`]: track.isMuted()
        }))

    }

    const onRemoteTrackAdded = track => {
        if (track.isLocal()) {
            JitsiConference.setSenderVideoConstraint(180)
            return
        }

        console.warn('Remote TRACK_ADDED', track.getParticipantId(), track.isMuted(), track)

        track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, onTrackMuteChanged)
        track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
            console.warn('remote track stoped')
        )
        track.addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            (deviceId) =>
                console.warn(`track audio output device was changed to ${deviceId}`)
        )

        const userId = track.getParticipantId()

        dispatch(addRemoteUserTrack(userId, track.getType(), track.isMuted()))
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
    JitsiConnection.addEventListener(CONNECTION_ESTABLISHED, onConnectionSuccess)
    JitsiConnection.addEventListener(CONNECTION_FAILED, onConnectionFailed)
    JitsiConnection.addEventListener(CONNECTION_DISCONNECTED, disconnect)

    JitsiConnection.connect(undefined)
}

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

export const setLocalEmoji = (userId, emoji) => {
    if (!window.JitsiConference) return

    // This will send the event name to other participants
    window.JitsiConference.sendCommand(SET_EMOJI_CMD, {
            attributes: {
                'id': userId,
                'emoji': emoji
            }
        }
    )
    window.localStorage.setItem('EMOJI', emoji)
}

export const sendPublicMessage = (msg) => {
    if (!window.JitsiConference) return

    window.JitsiConference.sendMessage(msg)
}

export const sendPrivateMessage = (targetId, msg) => {
    if (!window.JitsiConference) return

    console.error('sendPrivateTextMessage to ' + targetId)
    window.JitsiConference.sendPrivateTextMessage(targetId, msg)
}

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
