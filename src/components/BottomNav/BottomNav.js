import React from 'react'
import MuteButton from '../MuteButton/MuteButton'
import './BottomNav.scss'

const BottomNav = ({ roomName }) => {
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
      <MuteButton/>
    </div>
  )
}

export default BottomNav