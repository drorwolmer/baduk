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
//            var videoArtTime = currentVideoArtPlayerIx()
//            player.seekTo(videoArtTime['seek'])
        }
        console.error("videoArtIndex useEFFEcT", videoArtIndex)
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

        console.error("ON READY VIDEOART PLAYER", videoArtIx, seek)

        //props[videoArtIndex].onReady && props[videoArtIndex].onReady(e)
        setVideoArtIndex(videoArtIx)
        e.target.seekTo(seek);
        e.target.playVideo()

    }

//    const valueSetter = player => {
//        setPlayer(player)
//    }

    const onEnd = e => {

        console.error("videoArtIndex before ", videoArtIndex);
        console.error("videoArtIndex", videoArtIndex)
        props[videoArtIndex]["player"].onEnd && props[videoArtIndex]["player"].onEnd(e)
        console.error("AFTER")
        console.error("AFTER setPlayer")

        if (videoArtIndex + 1 === videoArtArray.length)
        {
            setVideoArtIndex(0)
        }
        else
        {
            setVideoArtIndex(videoArtIndex + 1)
        }


//        console.error("SETSTATE", setPlayer);
    }



    return (
        <YouTube {...props[videoArtIndex]["player"]} onReady={onReady} onEnd={onEnd}/>
    )
}

export default YouTubeVideoArtPlayer
