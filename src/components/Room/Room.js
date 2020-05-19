import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { leaveSideRoom } from '../../modules/meeting'
import { getLocalUser, getUsersByActiveRoom } from '../../store/users'
// import YouTubePlayer from '../YouTubePlayer'
import UserList from '../UserDisplay/UserList'
import SideRoom from '../SideRoom'
import './Room.scss'

const Room = ({ roomName }) => {

  const room = useSelector(state => state.room)
  const mainAreaUsers = useSelector(getUsersByActiveRoom('MAIN'))

  const localUser = useSelector(getLocalUser)

  if (_.isEmpty(localUser)) {
    return null
  }

  // console.warn('mainAreaUsers=' + JSON.stringify(mainAreaUsers))

  const userInMainArea = localUser.activeRoom === 'MAIN'

  const onMeetingAreaClick = () => {
    !userInMainArea && leaveSideRoom(localUser.activeRoom)
  }

  return (
    <div className={classNames('room', _.toLower(roomName))}>
      {/*<div className="youtube-container">*/}
      {/*  <YouTubePlayer/>*/}
      {/*</div>*/}
      <div className="bg"/>
      <div className="main-area" onClick={onMeetingAreaClick}>
        <UserList users={mainAreaUsers} roomName="MAIN" />
      </div>
      <div className="side-rooms">
        {_.map(room.sideRooms, (sideRoom, i) => (
          <SideRoom key={`side-room-${i}`} {...sideRoom}/>
        ))}
      </div>
    </div>
  )
}

export default Room
