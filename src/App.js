import React, { useState } from 'react'
// import { ROOMS } from './consts'
import Room from './components/Room'
import MuteButton from './components/MuteButton'

function App () {
  const [roomName, setRoomName] = useState('BLOCK')

  return (
    <div className="app">
      <div className="rooms-menu">
        <MuteButton/>
        {/*<div className="video button room-button" onClick={() => setRoomName('BLOCK')}>Block</div>*/}
        {/*<div className="video button room-button" onClick={() => setRoomName('TOILET')}>Toilets</div>*/}
      </div>
      <Room roomName={roomName}/>
    </div>
  )
}

export default App
