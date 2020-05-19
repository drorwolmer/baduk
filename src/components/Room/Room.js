import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentUser } from '../../store/currentUser'
// import YouTubePlayer from '../YouTubePlayer'
import UserDisplay from '../UserDisplay'
import CurrentUserDisplay from '../UserDisplay/CurrentUserDisplay'
import SideRoom from '../SideRoom'
import './Room.scss'

const Room = ({ roomName }) => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.currentUser)
  const room = useSelector(state => state.room)
  const remoteTracks = useSelector(state => state.remoteUsers)

  if (!user) {
    return null
  }

  const userInMainArea = user.activeRoom === 'MAIN'

  const onMeetingAreaClick = () => {
    !userInMainArea && dispatch(updateCurrentUser({ activeRoom: 'MAIN' }))
  }

  return (
    <div className={classNames('room', _.toLower(roomName))}>
      {/*<div className="youtube-container">*/}
      {/*  <YouTubePlayer/>*/}
      {/*</div>*/}
      <div className="bg"/>
      <div className="main-area" onClick={onMeetingAreaClick}>
        {userInMainArea && (<CurrentUserDisplay/>)}
        {_.map(remoteTracks, (remote, userId) => {
          return (
            <UserDisplay key={`remote-user-display-${userId}`}
                         videoTrack={remote.video}
                         audioTrack={remote.audio}
                         userId={userId}/>
          )
        })}
      </div>
      <div className="side-rooms">
        {_.map(room.sideRooms, (sideRoom, i) => (
          <SideRoom key={`side-room-${i}`} {...sideRoom} currentUser={user}/>
        ))}
      </div>
    </div>
  )
}

export default Room
