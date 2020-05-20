import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'


const YouTubePlayer = ({volume, ...props}) => {

  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (player) {
      player.setVolume(volume)
    }
  }, [volume])

  const onReady = e => {
    setPlayer(e.target)
    props.onReady && props.onReady(e)
  }

  return (
    <YouTube {...props} onReady={onReady} />
  )
}

export default YouTubePlayer
