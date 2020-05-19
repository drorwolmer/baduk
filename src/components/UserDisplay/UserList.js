import React from 'react'
import _ from 'lodash'
import UserDisplay from './index'


const UserList = ({users, roomName}) => {
  return _.map(
    _.orderBy(users, 'isLocal'),
    (user, i) => {
      return (
        <UserDisplay key={`user-display-${i}`} {...user} />
      )
    }
  )
}

export default UserList