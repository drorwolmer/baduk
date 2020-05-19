import React from 'react'
import YouTube from 'react-youtube'


const YouTubePlayer = ({ muteOnReady, ...props }) => {

  var utcstart = 1589278643
  var utcnow = Math.round(new Date().getTime() / 1000)
  var offset = utcnow - utcstart

  const player1Id = 'zMG7K5_Jv2M'
  const player1Opts = {
    // videoId: 'zMG7K5_Jv2M', // YouTube Video ID
    width: 640, // Player width (in px)
    height: 480, // Player height (in px)
    playerVars: {
      autoplay: 1, // Auto-play the video on load
      controls: 0, // Show pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      loop: 1, // Run the video in a loop
      fs: 0, // Hide the full screen button
      cc_load_policy: 1, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      autohide: 1, // Hide video controls when playing,
      disablekb: 1,
      start: offset,
      origin: 'https://foosa-a977b5f6.localhost.run',
    },
  }

  const onReady1 = e => {
    e.target.mute()
  }

  const player2Id = '6MyjFHd04R8'
  const player2Opts = {
    playlist: 'QtXx3Qubmys',
    width: 600,               // Player width (in px)
    height: 400,              // Player height (in px)
    playerVars: {
      autoplay: 1,        // Auto-play the video on load
      controls: 0,        // Show pause/play buttons in player
      showinfo: 0,        // Hide the video title
      modestbranding: 1,  // Hide the Youtube Logo
      loop: 1,            // Run the video in a loop
      fs: 1,              // Hide the full screen button
      cc_load_policy: 1, // Hide closed captions
      iv_load_policy: 3,  // Hide the Video Annotations
      autohide: 1,         // Hide video controls when playing,
      disablekb: 1
    },
    ...props,
  }

  const onReady2 = e => {
    // muteOnReady && e.target.mute()
    e.target.setVolume(30)
    e.target.playVideo()
  }

  return (
    <YouTube
      videoId={player2Id}                  // defaults -> null
      id="muteYouTubeVideoPlayer2"                       // defaults -> null
      opts={player2Opts}                        // defaults -> {}
      onReady={onReady1}                    // defaults -> noop
    />
  )
}

export default YouTubePlayer
