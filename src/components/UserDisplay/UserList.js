import React, { useCallback } from 'react'
import _ from 'lodash'
import UserDisplay from './index'

const UserList = ({ users, isAudioActive }) => {

  const renderUser = useCallback(user => (
    <UserDisplay key={`user-display-${user.id}`} {...user} isAudioActive={isAudioActive}/>
  ), [users])

  return _.map(_.orderBy(users, 'isLocal'), renderUser)
}

export default UserList