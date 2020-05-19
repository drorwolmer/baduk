import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import './UserDisplay.scss'

const attach = (track, ref) => track && ref.current && track.attach(ref.current)
const detachAndDispose = (track, ref) => {
  if (track && ref.current) {
    track.detach(ref.current)
    track.dispose()
  }
}

const UserDisplay = ({ videoTrack, audioTrack, isSelf, id: userId, displayName, emoji }) => {

  const videoRef = useRef(null)
  const audioRef = useRef(null)

  const [locallyMuted, setLocallyMuted] = useState(isSelf)

  useEffect(() => {
    attach(videoTrack, videoRef)
    attach(audioTrack, audioRef)

    return () => {
      if (!isSelf) {
        detachAndDispose(videoTrack, videoRef)
        detachAndDispose(audioTrack, audioRef)
      }
    }
  }, [videoTrack, audioTrack, videoRef, audioRef])

  const onMuteClick = () => {
    if (isSelf) return

    setLocallyMuted(!locallyMuted)
  }

  const idSuffix = isSelf ? 'self' : userId

  const videoClassNames = classNames('video person', {
    'video_self': isSelf,
    'remote_participant': !isSelf,
    'muted': locallyMuted && !isSelf,
    'local_muted': locallyMuted && isSelf,
  })

  videoTrack && audioTrack && console.error('isSelf=', isSelf, ', videoMuted=', videoTrack.isMuted(), ', audioMuted=', audioTrack.isMuted())

  return (
    <div className={videoClassNames} onClick={onMuteClick}>
      <div className="emoji">{emoji}</div>
      <div className="id">{displayName} | ${userId}</div>
      <div className="chat"/>
      <div className="chat_private"/>
      <div className="in"/>
      {videoTrack && (
        <video muted={locallyMuted || videoTrack.isMuted()} autoPlay="1" id={`user-video-${idSuffix}`} ref={videoRef}/>
      )}
      {audioTrack && (
        <audio muted={isSelf || locallyMuted || audioTrack.isMuted()} autoPlay="1" id="localAudio" ref={audioRef}/>
      )}
    </div>
  )
}

export default UserDisplay