import React from 'react'
import { getLocalTracks } from '../../utils'

export default () => {

  const toggleMute = () => {
    const { video, audio } = getLocalTracks()

    if (audio.isMuted()) {
      audio.unmute()
      video.unmute()
    } else {
      audio.mute()
      video.mute()
    }
  }

  return (
    <div className="video button mute-toggle" onClick={toggleMute} />
  )
}