import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserList from '../UserDisplay/UserList'
import { getLocalUser, getUsersByActiveRoom, updateUser } from '../../store/users'

export default ({ name }) => {

  const users = useSelector(getUsersByActiveRoom(name))
  // console.warn('sideRoomUsers=' + JSON.stringify(users))

  const localUser = useSelector(getLocalUser)

  const localUserInRoom = localUser.activeRoom === name

  const dispatch = useDispatch()

  const onClick = () => {
    !localUserInRoom && dispatch(updateUser(localUser.id, { activeRoom: name }))
  }

  return (
    <div className="side-room" onClick={onClick}>
      <div className="bg"/>
      <div className="room-header">{name}</div>
      <div className="room-users">
        <UserList users={users} roomName={name}/>
      </div>
    </div>
  )
}