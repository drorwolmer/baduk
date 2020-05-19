import React, { useEffect, useRef, useState } from 'react'
import { getTracks } from '../../utils'
import { setLocalDisplayName, setLocalEmoji } from '../../modules/meeting'
import classNames from 'classnames'
import './UserDisplay.scss'

const attach = (track, ref) => track && ref.current && track.attach(ref.current)

const detachAndDispose = (track, ref) => {
  if (track && ref.current) {
    track.detach(ref.current)
    track.dispose()
  }
}

const UserDisplay = ({ id: userId, isLocal, hasTracks, displayName, emoji, isAudioActive }) => {

  console.warn('rendering UserDisplay hasTracks = ' + hasTracks)

  const videoRef = useRef(null)
  const audioRef = useRef(null)

  const [videoTrack, setVideoTrack] = useState(null)
  const [audioTrack, setAudioTrack] = useState(null)
  const [locallyMuted, setLocallyMuted] = useState(isLocal)

  useEffect(() => {
    if (hasTracks) {
      const { audio, video } = getTracks(userId, isLocal)

      attach(audio, audioRef)
      attach(video, videoRef)
      setAudioTrack(audio)
      setVideoTrack(video)
    }

    return () => {
      if (hasTracks) {
        detachAndDispose(videoTrack, videoRef)
        detachAndDispose(audioTrack, audioRef)
      }
    }
  }, [hasTracks, videoRef, audioRef])

  const onMuteClick = () => {
    if (isLocal) return

    setLocallyMuted(!locallyMuted)
  }

  const onNameClick = e => {
    e.stopPropagation()

    // setLocalDisplayName(userId, 'sniirr')
    const newName = window.prompt('Display Name???')
    if (newName) {
      setLocalDisplayName(userId, newName)
    }
  }

  const onEmojiClick = e => {
    e.stopPropagation()

    // setLocalDisplayName(userId, 'sniirr')
    const newEmoji = window.prompt('what emoji? https://getemoji.com/')
    if (newEmoji) {
      setLocalEmoji(userId, newEmoji)
    }
  }

  const idSuffix = isLocal ? 'self' : userId

  const videoClassNames = classNames('video person', {
    'video_self': isLocal,
    'remote_participant': !isLocal,
    'muted': !isAudioActive && !isLocal,
    'local_muted': !isAudioActive && isLocal,
  })

  return (
    <div className={videoClassNames} onClick={onMuteClick}>
      <div className="emoji" onClick={onEmojiClick}>{emoji}</div>
      <div className="id" onClick={onNameClick}>{displayName} | ${userId}</div>
      <div className="chat"/>
      <div className="chat_private"/>
      <div className="in"/>
      {hasTracks && (
        <video autoPlay="1" id={`user-video-${idSuffix}`} ref={videoRef}/>
      )}
      {hasTracks && (
        <audio muted={isLocal || !isAudioActive} autoPlay="1" id="localAudio" ref={audioRef}/>
      )}
    </div>
  )
}

export default UserDisplay