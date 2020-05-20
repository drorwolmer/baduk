import React from 'react'
import {getLocalTracks} from '../../utils'
import './BottomNav.scss'
import {onVideoMuteToggle} from "../../modules/meeting";

const BottomNav = ({roomName}) => {

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
            <div className="video button mute-toggle" onClick={onVideoMuteToggle}/>
            <div className="video button fullscreen-toggle" onClick={toggleFullscreen}/>
        </div>
    )
}

export default BottomNav
