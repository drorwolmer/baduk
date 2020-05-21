import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { getTracks } from '../../utils'
import { sendPrivateMessage, sendPublicMessage, setLocalDisplayName } from '../../modules/meeting'
import { getUserLastPublicMessage } from '../../store/messages'
import classNames from 'classnames'
import './UserDisplay.scss'
import { useSelector } from 'react-redux'
import Popup from '../Popup'
import EmojiSelection from '../EmojiSelection'
import SpeechBubble from '../SpeechBubble'

const attach = (track, ref) => track && ref.current && track.attach(ref.current)

const detachAndDispose = (track, ref) => {
    if (track && ref.current) {
        track.detach(ref.current)
        track.dispose()
    }
}

const UserDisplay = ({ id: userId, isLocal, has_audio, has_video, muted_audio, muted_video, displayName, emoji, isAudioActive, isDominantSpeaker }) => {

    const videoRef = useRef(null)
    const audioRef = useRef(null)

    const [videoTrack, setVideoTrack] = useState(null)
    const [audioTrack, setAudioTrack] = useState(null)

    const [popup, setPopup] = useState(null)

    const bubbleMessage = useSelector(getUserLastPublicMessage(userId))

    useEffect(() => {

        if (has_video) {
            const { video } = getTracks(userId, isLocal)
            attach(video, videoRef)
            setVideoTrack(video)
        }

        return () => {
            if (has_audio || has_video) {
                detachAndDispose(videoTrack, videoRef)
            }
        }
    }, [has_video, videoRef])

    useEffect(() => {

        if (has_audio) {
            const { audio } = getTracks(userId, isLocal)
            attach(audio, audioRef)
            setAudioTrack(audio)
        }

        return () => {
            if (has_audio) {
                detachAndDispose(audioTrack, audioRef)
            }
        }
    }, [has_audio, audioRef])

    const onClick = e => {
        e.stopPropagation()

        if (isLocal) {
            //send public message
            const msg = window.prompt('Say something:')
            if (msg) {
                sendPublicMessage(msg)
            }
        } else {
            // send private message
            const msg = window.prompt(`Say something to ${displayName}:`)
            if (msg) {
                sendPrivateMessage(userId, msg)
            }
        }

    }

    const onNameClick = e => {
        e.stopPropagation()

        if (!isLocal) return

        const newName = window.prompt('Display Name???')
        if (newName) {
            setLocalDisplayName(userId, newName)
        }
    }

    const hidePopup = () => setPopup(null)

    const onEmojiClick = e => {
        e.stopPropagation()

        if (!isLocal) return

        setPopup(<EmojiSelection onSelection={hidePopup}/>)
    }

    const videoClassNames = classNames('user-display video person', {
        'video_self': isLocal,
        'remote_participant': !isLocal,
        'no_video': !has_video || muted_video,
        'no_audio': !has_audio || muted_audio,
        'muted': !isAudioActive && !isLocal,
        'dominant': isDominantSpeaker,
        'local_muted': !isAudioActive && isLocal,
    })

    return (
        <div className={videoClassNames} onClick={onClick}>
            <div className="emoji" onClick={onEmojiClick}>{emoji}</div>
            <div className="id" onClick={onNameClick}>{displayName} {userId}</div>
            {bubbleMessage && (
                <SpeechBubble text={bubbleMessage.text}/>
            )}
            <div className="in"/>
            {has_video && (
                <video autoPlay="1" ref={videoRef}/>
            )}
            {has_audio && (
                <audio muted={isLocal || !isAudioActive} autoPlay="1" ref={audioRef}/>
            )}
            {!_.isNil(popup) && (
                <Popup onOutsideClick={hidePopup}>{popup}</Popup>
            )}
        </div>
    )
}

export default UserDisplay
