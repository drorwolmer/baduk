import React from 'react'
import { getLocalTracks } from '../../utils'
import './BottomNav.scss'

const BottomNav = ({ roomName }) => {

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div className="bottom-nav">
      {roomName !== 'block' && (
        <div className="video button button-to-block ">
          <a href="?room=block"> </a>
        </div>
      )}
      {roomName !== 'toilet' && (
        <div className="video button button-to-toilet">
          <a href="?room=toilet"> </a>
        </div>
      )}
      <div className="video button mute-toggle" onClick={toggleMute}/>
      <div className="video button fullscreen-toggle" onClick={toggleFullscreen}/>
    </div>
  )
}

export default BottomNav