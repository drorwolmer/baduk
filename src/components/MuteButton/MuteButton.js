import React from 'react'
import { useSelector } from 'react-redux'

export default () => {

  const localTracks = useSelector(state => state.localTracks)

  const toggleMute = () => {
    const { video, audio } = localTracks

    if (audio.isMuted()) {
      audio.unmute()
      video.unmute()
    } else {
      audio.mute()
      video.mute()
    }
  }

  return (
    <div className="video button" id="mute_toggle" onClick={toggleMute}>Mute/Unmute</div>
  )
}