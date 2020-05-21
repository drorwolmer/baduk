import React, { useCallback } from 'react'
import _ from 'lodash'
import UserDisplay from './index'

const UserList = ({ users, isAudioActive }) => {

  const renderUser = useCallback(user => (
    <UserDisplay key={`user-display-${user.id}`} {...user} isAudioActive={isAudioActive}/>
  ), [users])

  return (
      <div className="users-display">
        {_.map(_.orderBy(users, 'id'), renderUser)}
      </div>
  )
}

export default UserList
