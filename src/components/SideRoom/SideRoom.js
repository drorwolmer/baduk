import React from 'react'
import { useDispatch } from 'react-redux'
import CurrentUserDisplay from '../UserDisplay/CurrentUserDisplay'
import { updateCurrentUser } from '../../store/currentUser'

export default ({ name, currentUser }) => {

  const currentUserInRoom = currentUser.activeRoom === name

  const dispatch = useDispatch()

  const onClick = () => {
    !currentUserInRoom && dispatch(updateCurrentUser({ activeRoom: name }))
  }

  return (
    <div className="side-room" onClick={onClick}>
      <div className="bg"/>
      <div className="room-header">{name}</div>
      <div className="room-users">
        {currentUserInRoom && (<CurrentUserDisplay/>)}
      </div>
    </div>
  )
}