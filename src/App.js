import React, { useState } from 'react'
import Room from './components/Room'
import BottomNav from './components/BottomNav'
import { soundtrackPlayerConfig } from './config/config.videos'
import { useSelector } from 'react-redux'
import { getLocalUser } from './store/users'
import YouTubePlayer from './components/YouTubePlayer'


function App () {
  const initialRoom = window.location.href.indexOf('toilet') > -1 ? 'toilet' : 'block'
  const [roomName, setRoomName] = useState(initialRoom)

  const localUser = useSelector(getLocalUser)

  const soundtrackVolume = localUser && localUser.activeRoom === 'MAIN' ? 100 : 40

  return (
    <div className="app">
      <Room roomName={roomName} withVideoArt={roomName === 'block'}/>
      <BottomNav roomName={roomName}/>
      {/*<YouTubePlayer {...soundtrackPlayerConfig} volume={soundtrackVolume}/>*/}
    </div>
  )
}

export default App
