import React from 'react'
import './BottomNav.scss'
import { onVideoMuteToggle, changeConference } from '../../modules/meeting'
import { ROOMS } from '../../consts'
import { useDispatch } from 'react-redux'

const BottomNav = ({ roomName }) => {

    const dispatch = useDispatch()

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    const goToRoom = roomConfig => () => dispatch(changeConference(roomConfig))

    return (
        <div className="bottom-nav">
            {roomName !== 'block' && (
                <div className="button button-to-toilet" onClick={goToRoom(ROOMS.block)}/>
            )}
            {roomName !== 'toilet' && (
                <div className="button button-to-toilet" onClick={goToRoom(ROOMS.toilet)}/>
            )}
            <div className="button mute-toggle" onClick={onVideoMuteToggle}/>
            <div className="button fullscreen-toggle" onClick={toggleFullscreen}/>
        </div>
    )
}

export default BottomNav
