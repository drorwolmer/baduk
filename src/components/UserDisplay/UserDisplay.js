import React, {useEffect, useRef, useState} from 'react'
import _ from 'lodash'
import {getTracks} from '../../utils'
import {sendPrivateMessage, sendPublicMessage, setLocalDisplayName} from '../../modules/meeting'
import {getUserLastMessage} from '../../store/messages'
import classNames from 'classnames'
import './UserDisplay.scss'
import {useSelector} from 'react-redux'
import Popup from '../Popup'
import AutoHide from '../AutoHide'
import EmojiSelection from '../EmojiSelection'
import SpeechBubble from '../SpeechBubble'
import TextInput from '../TextInput'

const attach = (track, ref) => track && ref.current && track.attach(ref.current)

const detachAndDispose = (track, ref) => {
    if (track && ref.current) {
        track.detach(ref.current)
        track.dispose()
    }
}

const UserDisplay = ({id: userId, globalUID, isLocal, has_audio, has_video, muted_audio, muted_video, displayName, emoji, isAudioActive, isDominantSpeaker}) => {

    const videoRef = useRef(null)
    const audioRef = useRef(null)

    const [videoTrack, setVideoTrack] = useState(null)
    const [audioTrack, setAudioTrack] = useState(null)

    const [popup, setPopup] = useState(null)

    const bubbleMessage = useSelector(getUserLastMessage(globalUID))

    useEffect(() => {

        if (has_video) {
            const {video} = getTracks(userId, isLocal)
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
            const {audio} = getTracks(userId, isLocal)
            attach(audio, audioRef)
            setAudioTrack(audio)
        }

        return () => {
            if (has_audio) {
                detachAndDispose(audioTrack, audioRef)
            }
        }
    }, [has_audio, audioRef])

    const renderInputBubble = ({ className, placeholder, submit, onHeightChange }) => (
        <SpeechBubble className={className}>
            <TextInput placeholder={placeholder}
                       submit={submit}
                       onHeightChange={onHeightChange}
                       dismiss={hidePopup}/>
        </SpeechBubble>
    )

    const onClick = e => {
        e.stopPropagation()

        if (isLocal) {
            //send public message
            setPopup(renderInputBubble({
                placeholder: 'Say something',
                submit: sendPublicMessage,
            }))
        } else {
            // send private message
            setPopup(renderInputBubble({
                className: 'centered no-pointer',
                placeholder: `Say something to ${displayName}:`,
                submit: msg => sendPrivateMessage(globalUID, displayName, msg),
            }))
        }

    }

    const onNameClick = e => {
        e.stopPropagation()

        if (!isLocal) return

        setPopup(renderInputBubble({
            className: 'centered no-pointer',
            placeholder: 'Choose name',
            submit: newName => setLocalDisplayName(userId, newName),
        }))
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
        [`id_${userId}`]: true,
        [`globalUID_${globalUID}`]: true
    })

    const popupOpen = !_.isNil(popup)

    return (
        <div className={videoClassNames} onClick={onClick}>
            <div className="emoji" onClick={onEmojiClick}>{emoji}</div>
            <div className="id" onClick={onNameClick}>{displayName}</div>
            {bubbleMessage && (
                <AutoHide ttl={7000} refreshKey={bubbleMessage.ts} hidden={popupOpen}>
                    <SpeechBubble className={classNames({
                        from_me: bubbleMessage.from_me && bubbleMessage.recipient !== 'public',
                        to_me: bubbleMessage.to_me,
                    })}>
                        {bubbleMessage.text}
                    </SpeechBubble>
                </AutoHide>
            )}
            <div className="in"/>
            {has_video && (
                <video autoPlay="1" ref={videoRef}/>
            )}
            {has_audio && (
                <audio muted={isLocal || !isAudioActive} autoPlay="1" ref={audioRef}/>
            )}
            {popupOpen && (
                <Popup onOutsideClick={hidePopup}>{popup}</Popup>
            )}
        </div>
    )
}

export default UserDisplay
