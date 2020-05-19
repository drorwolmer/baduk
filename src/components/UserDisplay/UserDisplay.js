import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import './UserDisplay.scss'

const attach = (track, ref) => track && ref.current && track.attach(ref.current)

const detachAndDispose = (track, ref) => {
  if (track && ref.current) {
    track.detach(ref.current)
    track.dispose()
  }
}

const getTracks = (userId, isLocal) => {
  if (isLocal) return {
    audio: window.room.getLocalAudioTrack(),
    video: window.room.getLocalVideoTrack()
  }

  const participant = window.room.getParticipantById(userId)
  const tracks = participant.getTracks()
  // const types = _.map(tracks, t => t.getType())
  // console.warn('remote tracks = ' + JSON.stringify(types))
  return {
    audio: _.find(tracks, t => t.getType() === 'audio'),
    video: _.find(tracks, t => t.getType() === 'video'),
  }
}

const UserDisplay = ({ id: userId, isLocal, hasTracks, displayName, emoji }) => {

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

  const idSuffix = isLocal ? 'self' : userId

  const videoClassNames = classNames('video person', {
    'video_self': isLocal,
    'remote_participant': !isLocal,
    'muted': locallyMuted && !isLocal,
    'local_muted': locallyMuted && isLocal,
  })

  // videoTrack && audioTrack && console.error('isSelf=', isSelf, ', videoMuted=', videoTrack.isMuted(), ', audioMuted=', audioTrack.isMuted())

  return (
    <div className={videoClassNames} onClick={onMuteClick}>
      <div className="emoji">{emoji}</div>
      <div className="id">{displayName} | ${userId}</div>
      <div className="chat"/>
      <div className="chat_private"/>
      <div className="in"/>
      {hasTracks && (
        <video muted={locallyMuted} autoPlay="1" id={`user-video-${idSuffix}`} ref={videoRef}/>
      )}
      {hasTracks && (
        <audio muted={isLocal || locallyMuted} autoPlay="1" id="localAudio" ref={audioRef}/>
      )}
    </div>
  )
}

export default UserDisplay