import React from 'react'
import { useSelector } from 'react-redux'
import UserList from '../UserDisplay/UserList'
import { getLocalUser, getUsersByActiveRoom } from '../../store/users'
import { joinSideRoom } from '../../modules/meeting'
import './SideRoom.scss'


export default ({ name }) => {

  const users = useSelector(getUsersByActiveRoom(name))
  // console.warn('sideRoomUsers=' + JSON.stringify(users))

  const localUser = useSelector(getLocalUser)

  const localUserInRoom = localUser.activeRoom === name

  const onClick = () => {
    !localUserInRoom && joinSideRoom(name)
  }

  return (
    <div className="side-room" onClick={onClick}>
      <div className="bg"/>
      <div className="room-header">{name}</div>
      <div className="room-users">
        <UserList users={users} roomName={name} isAudioActive={localUserInRoom}/>
      </div>
    </div>
  )
}