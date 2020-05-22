import React, {useState} from 'react'
import './BottomNav.scss'
import {onVideoMuteToggle, changeConference} from '../../modules/meeting'
import {ROOMS} from '../../consts'
import {useDispatch} from 'react-redux'
import Options from "../Options/options";
import Popup from '../Popup'

const BottomNav = ({roomName}) => {

    const dispatch = useDispatch()

    const [optionsVisible, setOptionsVisible] = useState(false)


    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    const hidePopup = () => setOptionsVisible(false)

    const onOptionsClick = (e) => {
        e.stopPropagation()
        setOptionsVisible(true)
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
            {optionsVisible && (
                <Popup onOutsideClick={hidePopup}>
                    <Options/>
                </Popup>
            )}

        </div>
    )
}

export default BottomNav
