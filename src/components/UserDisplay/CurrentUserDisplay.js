import React, { memo } from 'react'
import UserDisplay from './UserDisplay'
import { useSelector } from 'react-redux'

const CurrentUserDisplay = memo(() => {

  const currentUser = useSelector(state => state.currentUser)
  const localTracks = useSelector(state => state.localTracks)

  return localTracks && (
    <UserDisplay videoTrack={localTracks.video} audioTrack={localTracks.audio} {...currentUser} isSelf={true}/>
  )
})

export default CurrentUserDisplay