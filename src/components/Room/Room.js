import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { leaveSideRoom } from '../../modules/meeting'
import { getLocalUser, getUsersByActiveRoom } from '../../store/users'
import {currentVideoArtPlayer, videoArtArray} from '../../config/config.videos'
import UserList from '../UserDisplay/UserList'
import SideRoom from '../SideRoom'
import YouTubePlayer from '../YouTubePlayer'
import YouTubeVideoArtPlayer from '../YouTubeVideoArtPlayer'
import './Room.scss'
import ChatDrawer from '../ChatDrawer'
import { getPublicMessages } from '../../store/messages'

const Room = ({ roomName, withVideoArt }) => {

    const room = useSelector(state => state.room)
    const mainAreaUsers = useSelector(getUsersByActiveRoom('MAIN'))

    const localUser = useSelector(getLocalUser)

    if (_.isEmpty(localUser)) {
        return null
    }

    const userInMainArea = localUser.activeRoom === 'MAIN'

    const onMeetingAreaClick = () => {
        !userInMainArea && leaveSideRoom(localUser.activeRoom)
    }

    return (
        <div className={classNames('room', _.toLower(roomName))}>
            <div className="bg"/>
            {withVideoArt && (
                <div className="video-art-top">
                    <div className="big-video-container">
                        <YouTubeVideoArtPlayer {...videoArtArray}/>
                    </div>
                </div>
            )}
            <div className="main-area" onClick={onMeetingAreaClick}>
                {_.map(room.sideRooms, (sideRoom, i) => (
                    <SideRoom key={`side-room-${i}`} {...sideRoom}/>
                ))}
                <UserList users={mainAreaUsers} roomName="MAIN"/>
                <div className="right-sidebar">
                    <ChatDrawer messagesSelector={getPublicMessages}/>
                </div>
            </div>
        </div>
    )
}

export default Room
