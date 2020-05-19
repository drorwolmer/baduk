import React, { useState } from 'react'
import YouTube from 'react-youtube'
import Room from './components/Room'
import BottomNav from './components/BottomNav'
import { soundtrackPlayerConfig } from './config/config.videos'


function App () {
  const initialRoom = window.location.href.indexOf('toilet') > -1 ? 'toilet' : 'block'
  const [roomName, setRoomName] = useState(initialRoom)

  return (
    <div className="app">
      <Room roomName={roomName} withVideoArt={roomName === 'block'}/>
      <BottomNav roomName={roomName}/>
      <YouTube {...soundtrackPlayerConfig}/>
    </div>
  )
}

export default App
