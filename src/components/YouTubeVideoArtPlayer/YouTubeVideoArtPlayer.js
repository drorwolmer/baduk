import React, {useEffect, useState, setState} from 'react'
import {currentVideoArtPlayer} from '../../config/config.videos'
import YouTube from 'react-youtube'


const YouTubeVideoArtPlayer = ({volume, ...props}) => {

    const [player, setPlayer] = useState(null)
    const [count, setCount] = useState(0)

    console.error("PROPS", props)

    useEffect(() => {
        if (player) {
            player.setVolume(volume)
        }
    }, [volume])

    useEffect(() => {
        if (player && count > 0) {
            player.playVideo()
            player.seekTo(60)
        }
    }, [count])

    const onReady = e => {

        if (!player){
            setPlayer(e.target)
        }


        console.error("ON READY VIDEOART PLAYER")
        //props[count].onReady && props[count].onReady(e)
        e.target.playVideo()
        e.target.seekTo(60);
    }

//    const valueSetter = player => {
//        setPlayer(player)
//    }

    const onEnd = e => {

        console.error("COUNT before ", count);
        console.error("COUNT", count)
        props[count].onEnd && props[count].onEnd(e)
        console.error("AFTER")
        console.error("AFTER setPlayer")
        setCount(count + 1)

//        console.error("SETSTATE", setPlayer);
    }



    return (
        <YouTube {...props[count]} onReady={onReady} onEnd={onEnd}/>
    )
}

export default YouTubeVideoArtPlayer
