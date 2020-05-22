import React, {useState} from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import './BottomNav.scss'
import {onVideoMuteToggle, changeConference, isLocalUserInConference} from '../../modules/meeting'
import {ROOMS} from '../../consts'
import { useDispatch, useSelector } from 'react-redux'
import Options from "../Options/options";
import Popup from '../Popup'
import { getLocalUser } from '../../store/users'

const BottomNav = ({roomName}) => {

    const dispatch = useDispatch()

    const [optionsVisible, setOptionsVisible] = useState(false)

    // const localUser = useSelector(getLocalUser)

    // const localUserReady = !_.isNil(localUser) && isLocalUserInConference() && localUser.hasTracks


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

    const goToRoom = roomConfig => () => {
        // if (!localUserReady) return
        dispatch(changeConference(roomConfig))
    }

    const renderRoomButton = name => (
        <div className={classNames(`button button-to-${name}`)} onClick={goToRoom(ROOMS[name])}/>
    )

    return (
        <div className="bottom-nav">
            {roomName !== 'block' && renderRoomButton('block')}
            {roomName !== 'toilet' && renderRoomButton('toilet')}

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
