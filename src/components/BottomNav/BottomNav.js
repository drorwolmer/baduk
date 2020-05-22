import React, {useState} from 'react'
import './BottomNav.scss'
import {onVideoMuteToggle, changeConference} from '../../modules/meeting'
import {ROOMS} from '../../consts'
import {useDispatch} from 'react-redux'
import Options from "../Options/options";

const BottomNav = ({roomName}) => {

    const dispatch = useDispatch()

    const [popup, setPopup] = useState(null)


    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    const onOptionsClick = (e) => {
        e.stopPropagation()
        setPopup(<Options/>)
    }

    const goToRoom = roomConfig => () => dispatch(changeConference(roomConfig))

    return (
        <div className="bottom-nav">
            {roomName !== 'block' && (
                <div className="button button-to-block" onClick={goToRoom(ROOMS.block)}/>
            )}
            {roomName !== 'toilet' && (
                <div className="button button-to-toilet" onClick={goToRoom(ROOMS.toilet)}/>
            )}
            <div className="button mute-toggle" onClick={onVideoMuteToggle}/>
            <div className="button fullscreen-toggle" onClick={toggleFullscreen}/>
            <div className="button button-options" onClick={onOptionsClick}/>
            <Options/>
        </div>
    )
}

export default BottomNav
