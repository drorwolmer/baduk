import React, {useEffect, useState, setState} from 'react'
import {currentVideoArtPlayer, currentVideoArtPlayerIx, videoArtArray} from '../../config/config.videos'
import YouTube from 'react-youtube'


const YouTubeVideoArtPlayer = ({volume, ...props}) => {

    const [player, setPlayer] = useState(null)
    const [videoArtIndex, setVideoArtIndex] = useState(currentVideoArtPlayerIx()['index'])

    useEffect(() => {
        if (player) {
            player.setVolume(volume)
        }
    }, [volume])

    useEffect(() => {
        if (player) {
            player.playVideo()
        }
    }, [videoArtIndex])



    const onReady = e => {

        var seek = 0;
        var videoArtIx = 0;

        if (!player){
            console.error("NO PLAYER")
            var videoArtTime = currentVideoArtPlayerIx()

            seek = videoArtTime['seek']
            videoArtIx = videoArtTime['index']
            setPlayer(e.target)
        }

        setVideoArtIndex(videoArtIx)
        e.target.seekTo(seek);
        e.target.playVideo()

    }

    const onEnd = e => {

        console.error("videoArtIndex before ", videoArtIndex);
        console.error("videoArtIndex", videoArtIndex)
        props[videoArtIndex]["player"].onEnd && props[videoArtIndex]["player"].onEnd(e)

        if (videoArtIndex + 1 === videoArtArray.length)
        {
            setVideoArtIndex(0)
        }
        else
        {
            setVideoArtIndex(videoArtIndex + 1)
        }

    }



    return (
        <YouTube {...props[videoArtIndex]["player"]} onReady={onReady} onEnd={onEnd}/>
    )
}

export default YouTubeVideoArtPlayer
