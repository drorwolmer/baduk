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

export const videoArtPlayerBaseConfig = {
    id: 'muteYouTubeVideoPlayer',
    containerClassName: 'video-art-player',
    videoId: 'm6cy9PqMgIk',
    options: {
        videoId: 'm6cy9PqMgIk', // YouTube Video ID
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
            playlist: 'm6cy9PqMgIk', // for the loop
            // start: 60,
            // origin: 'https://foosa-a977b5f6.localhost.run',
        },
    },
    onReady: e => {
        e.target.playVideo()
    }
//            onEnd: e => {
//                console.error("onEnd")
//                e.target.seekTo(0)
//            }
    }


const videoArtStartTime = 1590157170;

const videoArtVideos = [{
    'run_time': 67,
    'videoId': 'm6cy9PqMgIk'
    }, {
    'run_time': 63,
    'videoId': 'YlUgvW4tUW4'
    }
]

const totalVideoArtPlayTime = videoArtVideos => videoArtVideos.reduce((total, curr) => total + curr['run_time'], 0);

export const videoArtArray = [
    {
    id: 'muteYouTubeVideoPlayer',
    containerClassName: 'video-art-player',
    videoId: 'YlUgvW4tUW4',
    options: {
        videoId: 'YlUgvW4tUW4', // YouTube Video ID
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
            playlist: 'm6cy9PqMgIk', // for the loop
            // start: 60,
            // origin: 'https://foosa-a977b5f6.localhost.run',
        },
    },
    onReady: e => {
        console.error("YOUTUBE onREady, playing video!")
        //e.target.playVideo()
    }
//            onEnd: e => {
//                console.error("onEnd")
//                e.target.seekTo(0)
//            }
    },
    {
    id: 'muteYouTubeVideoPlayer',
    containerClassName: 'video-art-player',
    videoId: 'm6cy9PqMgIk',
    options: {
        videoId: 'm6cy9PqMgIk', // YouTube Video ID
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
            playlist: 'm6cy9PqMgIk', // for the loop
            // start: 60,
            // origin: 'https://foosa-a977b5f6.localhost.run',
        },
    },
    onReady: e => {
        console.error("YOUTUBE onREady, playing video!")
        //e.target.playVideo()
    }
//            onEnd: e => {
//                console.error("onEnd")
//                e.target.seekTo(0)
//            }
    },
        {
    id: 'muteYouTubeVideoPlayer',
    containerClassName: 'video-art-player',
    videoId: 'YlUgvW4tUW4',
    options: {
        videoId: 'YlUgvW4tUW4', // YouTube Video ID
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
            playlist: 'm6cy9PqMgIk', // for the loop
            // start: 60,
            // origin: 'https://foosa-a977b5f6.localhost.run',
        },
    },
    onReady: e => {
        console.error("YOUTUBE onREady, playing video!")
        //e.target.playVideo()
    }
//            onEnd: e => {
//                console.error("onEnd")
//                e.target.seekTo(0)
//            }
    },
]

export const currentVideoArtPlayer = () => {
    var now = Math.round(new Date().getTime() / 1000);
    var delta = now - videoArtStartTime;

    var currentVideoId = 'YlUgvW4tUW4';

    var currentVideoArtConfig = videoArtPlayerBaseConfig;

    currentVideoArtConfig['videoId'] = currentVideoId;
    console.error(currentVideoArtConfig);

    currentVideoArtConfig['options']['videoId'] = currentVideoId;

    return currentVideoArtConfig;
}
