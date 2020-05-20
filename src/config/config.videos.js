
export const soundtrackPlayerConfig = {
  id: 'player-soundtrack',
  containerClassName: 'player-soundtrack',
  videoId: 'T92xtvU4WRc',
  options: {
    videoId: 'T92xtvU4WRc',
    playlist: 'QtXx3Qubmys',
    width: 1,               // Player width (in px)
    height: 1,              // Player height (in px)
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
      disablekb: 1,
      start: 100
    },
  },
  onReady: e => {
    e.target.setVolume(100)
    e.target.playVideo()
  }
}

export const videoArtPlayerConfig = {
  id: 'muteYouTubeVideoPlayer',
  containerClassName: 'video-art-player',
  videoId: '3V9bPvna3nM',
  options: {
    videoId: '3V9bPvna3nM', // YouTube Video ID
    // width: 640, // Player width (in px)
    // height: 480, // Player height (in px)
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
      playlist: '3V9bPvna3nM', // for the loop
      // start: offset,
      origin: 'https://foosa-a977b5f6.localhost.run',
    },
  },
  onReady: e => {
    e.target.playVideo()
  }
}