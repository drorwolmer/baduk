import React from 'react'
import Room from './components/Room'
import BottomNav from './components/BottomNav'
import { playSoundtrack } from './config/config.dev'
import { soundtrackPlayerConfig } from './config/config.videos'
import { useSelector } from 'react-redux'
import { getLocalUser } from './store/users'
import YouTubePlayer from './components/YouTubePlayer'
import { getRoom } from './store/room'

function App () {

    const { roomName } = useSelector(getRoom)

    const localUser = useSelector(getLocalUser)

    const soundtrackVolume = localUser && localUser.activeRoom === 'MAIN' ? 100 : 40

    return (
        <div className="app">
            <Room roomName={roomName} withVideoArt={roomName === 'block'}/>
            <BottomNav roomName={roomName}/>
            {playSoundtrack && (
                <YouTubePlayer {...soundtrackPlayerConfig} volume={soundtrackVolume}/>
            )}
        </div>
    )
}

export default App
