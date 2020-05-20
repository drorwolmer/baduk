import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import UserList from '../UserDisplay/UserList'
import { getLocalUser, getUsersByActiveRoom } from '../../store/users'
import { joinSideRoom } from '../../modules/meeting'
import './SideRoom.scss'

export default ({ name, maxSeats }) => {

  const users = useSelector(getUsersByActiveRoom(name))
  // console.warn('sideRoomUsers=' + JSON.stringify(users))

  const userCount = _.size(users)
  const emptySeatCount = maxSeats - userCount

  const localUser = useSelector(getLocalUser)

  const localUserInRoom = localUser.activeRoom === name

  const onFreeSeatClick = () => {
    !localUserInRoom && joinSideRoom(name)
  }

  return (
    <div className="side-room" onClick={e => e.stopPropagation()}>
      <div className="bg"/>
      <UserList users={users} roomName={name} isAudioActive={localUserInRoom}/>
      {_.map(Array(emptySeatCount), (o, i) => {
        return (
          <div className={classNames("user-display free-seat")} onClick={onFreeSeatClick}>
            <div className="id">Speak up</div>
            <div className="in"/>
          </div>
        )
      })}
    </div>
  )
}
