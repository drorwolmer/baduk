// https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/API.md

// Conference.getParticipantCount()   Gives 2 when only 1 connected

const options = {
    hosts: {
        domain: "beta.meet.jit.si",
        muc: "conference.beta.meet.jit.si",
    },
    bosh: '//beta.meet.jit.si/http-bind?room=ELHAMIN_BLOCKUS', // FIXME: use xep-0156 for that
    websocket: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
    clientNode: "http://jitsi.org/jitsimeet",
    desktopSharingChromeDisabled: true,
    openBridgeChannel: "websocket",
    enableTalkWhileMuted: true,
    enableNoAudioDetection: true,
    enableNoisyMicDetection: true,
    enableLipSync: true,
    disableAudioLevels: false

};


let connection = null;
let isJoined = false;
let room = null;
let user_id = null;

let localTracks = [];
const remoteTracks = {};

let haramotTimePoints = [];
let sentHaramot = [];
let max_haramot_per_user = 30;
let harama_cooldown = 30.0;
let total_haramot_sent = 0;


function onLocalTrackAudioEventChanged(e) {
    console.warn(`TRACK_AUDIO_LEVEL_CHANGED`, e);
}

function onLocalTrackMuteChanged(track) {
    console.warn(`Local TRACK_MUTE_CHANGED`, track.track.label, track.isMuted(), track);
    if (track.type === "audio") {
        if (track.isMuted()) {
            $(".video_self").addClass("muted");
        } else {
            $(".video_self").removeClass("muted");
        }
    }
}

function onRemoteTrackMuteChanged(track) {
    console.warn(`Remote TRACK_MUTE_CHANGED`, track, track.isMuted(), track);
    if (track.type === "audio") {
        if (track.isMuted()) {
            $(`.video_${track.ownerEndpointId}`).addClass("muted");
        } else {
            $(`.video_${track.ownerEndpointId}`).removeClass("muted");
        }
    }
}

function onRemoteStatsUpdated(id, stats) {
    console.error("REMOTE_STATS_UPDATED", id, stats);
}

function onLocalStatsUpdated(stats) {
    console.error("LOCAL_STATS_UPDATED", stats);
}

function onUserStatusChanged(id, status) {
    console.error("onUserStatusChanged", id, status);
}

function onLocalTrackStopped(e) {
    console.warn(`LOCAL_TRACK_STOPPED`, e);
}

function OnLocalTrackAudioOutputChanged(e) {
    console.warn(`TRACK_AUDIO_OUTPUT_CHANGED`, e);
}

function onLocalTracks(tracks) {
    console.warn("OnLocalTracks");
    localTracks = tracks;

    for (let i = 0; i < localTracks.length; i++) {
        let local_track = localTracks[i];
        let local_track_type = local_track.getType();

        console.warn(local_track_type, local_track.track.label);

        local_track.unmute();

        // local_track.addEventListener(
        //     JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        //     onLocalTrackAudioEventChanged
        // );
        local_track.addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            onLocalTrackMuteChanged
        );
        local_track.addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            onLocalTrackStopped
        );
        local_track.addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            OnLocalTrackAudioOutputChanged
        );

        if (local_track_type === "video") {

            $("#container").append(
                `<div class="video person video_self"><div class="in"></div><video muted autoplay='1' id='localVideo${i}' /></div>`
            );
            localTracks[i].attach($(`#localVideo${i}`)[0]);
        } else {
            $("body").append(
                `<audio autoplay='1' muted='true' id='localAudio${i}' />`
            );
            localTracks[i].attach($(`#localAudio${i}`)[0]);
        }
        if (isJoined) {
            console.error("room", room);
            console.error("localtracks", localTracks);
            room.addTrack(localTracks[i]);
        }
    }
}

/**
 * Handles remote tracks
 * @param track JitsiTrack object
 */
function onRemoteTrackAdded(track) {
    if (track.isLocal()) {
        return;
    }

    console.error("Remote TRACK_ADDED", track.getParticipantId(), track);


    const participant = track.getParticipantId();

    if (!remoteTracks[participant]) {
        remoteTracks[participant] = [];
    }

    // if (remoteTracks[participant].length === 2) {
    //     console.error('not attaching!');
    //     return;
    // }
    const idx = remoteTracks[participant].push(track);

    // track.addEventListener(
    //     JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
    //     (audioLevel) => console.warn(`Audio Level remote: ${audioLevel}`)
    // );
    track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, onRemoteTrackMuteChanged);
    track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
        console.warn("remote track stoped")
    );
    track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId) =>
            console.warn(`track audio output device was changed to ${deviceId}`)
    );
    const id = participant + track.getType();

    if (track.getType() === "video") {
        $("#container").append(
            `<div class="video person local_muted remote_participant video_remote video_${participant}"><div class="id">${participant}</div><div class="in"></div><video muted autoplay='1' id='${id}' /></div>  `
        );
        $(`.video_${participant}`).data("id", participant);
    } else {
        $("#container").append(`<audio autoplay='1' id='${id}' class="audio_remote"/>`);
        // Audio Track is always LOCALLY muted on start!
        document.getElementById(id).volume = 0;
    }

    track.attach($(`#${id}`)[0]);


}

function onRemoteTrackRemoved(track) {
    if (track.isLocal()) {
        return;
    }
    console.error("Remote TRACK_REMOVED", track, track.containers);

    const participant = track.getParticipantId();

    container = track.containers[0];

    track.detach(container);

    const index = remoteTracks[participant].indexOf(track);
    if (index > -1) {
        remoteTracks[participant].splice(index, 1);
    }

    if (container) {
        container.remove();

    }

    if (remoteTracks[participant].length === 0) {
        $(`.video_${participant}`).remove();
    }


}

/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.warn("onConferenceJoined");


    $("#mute_toggle").click(function () {
        if (Conference.getLocalAudioTrack().isMuted()) {
            Conference.getLocalAudioTrack().unmute();
            Conference.getLocalVideoTrack().unmute()
        } else {
            // TODO(DROR): These methods return a promise, whatever the fuck that means
            Conference.getLocalAudioTrack().mute();
            Conference.getLocalVideoTrack().mute()
        }
    });

    $(document).on("click", ".remote_participant", function () {
        let participant_id = $(this).data()["id"];
        let audio_el = document.getElementById(`${participant_id}audio`);
        if (audio_el.volume > 0) {
            audio_el.volume = 0;
            $(`.video_${participant_id}`).addClass("local_muted");
        } else {
            audio_el.volume = 1;
            $(`.video_${participant_id}`).removeClass("local_muted");

        }
    });

    $("#second_room").click(function () {
        Conference.sendCommand("CHANGE_ROOM", {
            attributes: {
                id: Conference.myUserId(),
                to: "second_room"
            }
        });
    });

    Conference.addCommandListener("CHANGE_ROOM", function (e) {
        let participant_id = e.attributes["id"];
        $(`video_${participant_id}`).appendTo("#second_room");
    });


    // TODO(DROR): Probably there's another way to do this
    user_id = Conference.myUserId()
    console.warn("user_id", user_id);

    $('.video_self').addClass(`video_${user_id}`).prepend(`<div class="id">${user_id}</div>`)

    isJoined = true;

    for (let i = 0; i < localTracks.length; i++) {
        room.addTrack(localTracks[i]);
    }
}

/**
 *
 * @param id
 */
function onUserLeft(id) {
    console.log("user left");
    if (!remoteTracks[id]) {
        return;
    }
    const tracks = remoteTracks[id];

    console.error(id, tracks);

    for (let i = 0; i < tracks.length; i++) {
        console.error(i, tracks[i]);
        console.error(
            document.getElementById(`#${id}${tracks[i].getType()}${i + 1}`)
        );
        tracks[i].detach(
            document.getElementById(`#${id}${tracks[i].getType()}${i + 1}`)
        );
    }
    console.error("About to remove", "#video_".concat(id));
    console.error(document.querySelectorAll(".video_".concat(id)));
    document.querySelectorAll(".video_".concat(id)).forEach((e) => e.remove());
}

window.Conference = null;

/**
 * That function is called when connection is established successfully
 */
function onConnectionSuccess() {
    console.warn("onConnectionSuccess");
    current_room = getRoom();

    current_room_config = rooms[current_room];

    //document.getElementById("body").classList.add(current_room_config["body_class"])

    let room_name = current_room_config["jitsi_room_name"]

    console.error("Joining jitsi room", room_name);
    room = connection.initJitsiConference(room_name, options);
    room.addCommandListener("FOO", function (e) {
        console.error("GOT FOO", e);
    });

    room.addCommandListener("HARAMA", function (e) {
        haramotTimePoints.push({
            time: Math.round(new Date().getTime() / 1000),
            user: e.attributes["user"]
        });
    });

    window.Conference = room;

    room.on(JitsiMeetJS.events.conference.USER_STATUS_CHANGED, onUserStatusChanged);

    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrackAdded);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onRemoteTrackRemoved);
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
    room.on(JitsiMeetJS.events.conference.USER_JOINED, (id) => {
        console.error("user join");
        remoteTracks[id] = [];
    });
    room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
    room.on(
        JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
        (userID, displayName) => console.log(`${userID} - ${displayName}`)
    );
    room.addEventListener(
            JitsiMeetJS.events.conference.CONFERENCE_LEFT, () => console.error("CONFERENCE_LEFT")
    );
    // room.on(
    //     JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
    //     (userID, audioLevel) => console.error(`${userID} - ${audioLevel}`)
    // );

    // room.addEventListener(
    //     JitsiMeetJS.events.connectionQuality.LOCAL_STATS_UPDATED, onLocalStatsUpdated
    // );
    //
    // room.addEventListener(
    //     JitsiMeetJS.events.connectionQuality.REMOTE_STATS_UPDATED, onRemoteStatsUpdated
    // );

    room.join();
}

/**
 * This function is called when the connection fail.
 */
function onConnectionFailed(e) {
    console.error("Connection Failed!", e);
}

/**
 * This function is called when the connection fail.
 */
function onDeviceListChanged(devices) {
    console.info("current devices", devices);
}

/**
 * This function is called when we disconnect.
 */
function disconnect() {
    console.log("disconnect!");
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess
    );
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed
    );
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        disconnect
    );
}

function disposeLocalTracks() {
    console.warn("DISPOSING LOCAL TRACKS");
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].dispose();
    }
}

/**
 *
 */
function unload() {
    disposeLocalTracks();
    room.leave()
    connection.disconnect();
    console.error("DISCONNECTED", room);
}

function unloadAndJoinNewRoom() {
    disposeLocalTracks();
    room.leave().then(() => {
      console.error("Left room");
      roomInit();
    });
}

let isVideo = true;

/**
 *
 */
function switchVideo() {
    // eslint-disable-line no-unused-vars
    isVideo = !isVideo;
    if (localTracks[1]) {
        localTracks[1].dispose();
        localTracks.pop();
    }
    JitsiMeetJS.createLocalTracks({
        devices: [isVideo ? "video" : "desktop"],
    })
        .then((tracks) => {
            localTracks.push(tracks[0]);
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log("local track muted")
            );
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log("local track stoped")
            );
            localTracks[1].attach($("#localVideo1")[0]);
            room.addTrack(localTracks[1]);
        })
        .catch((error) => console.log(error));
}

/**
 *
 * @param selected
 */
function changeAudioOutput(selected) {
    // eslint-disable-line no-unused-vars
    JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
}

function checkHaramot() {

    var users = {};
    var current_time = new Date().getTime() / 1000;
    var total = 0;
    var remove_amount = 0;

    for (let i = haramotTimePoints.length; i != 0; i--) {
        var harama_user = haramotTimePoints[i - 1]["user"];
        var harama_time = haramotTimePoints[i - 1]["time"];

        // Because we're iterating backwards the first time our 'harama_time' is invalid all the following
        // ones are invalid too
        if (harama_time + harama_cooldown < current_time) {
            remove_amount = i + 1;
            break;
        }

        if (harama_user in users) {
            if (users[harama_user] == max_haramot_per_user) {
                continue;
            }
            users[harama_user] += 1;

        } else {
            users[harama_user] = 1;
        }

        total += 1;

    }

    haramotTimePoints.splice(0, remove_amount);

    return total;
}

function sendHarama() {

    if (total_haramot_sent == max_haramot_per_user) {
        console.warn("Not sending any more haramot atm");
        return;
    }

    var o = {
        attributes: {
            user: room.myUserId()
        }
    };

    room.sendCommandOnce("HARAMA", o);
    total_haramot_sent += 1;

    setTimeout(function () {
        total_haramot_sent -= 1;
    }, harama_cooldown * 1000);
}

rooms = {
    "block": {
        "available_moves": ["toilet", "hamin"],
        "jitsi_room_name": "block_room",
        "body_class": "block"
    },
    "toilet": {
        "available_moves": ["block"],
        "jitsi_room_name": "toilet_room",
        "body_class": "toilet"
    },
    "hamin": {
        "available_moves": ["block"],
        "jitsi_room_name": "hamin_room",
        "body_class": "hamin"
    }
}

function changeRoom(new_room) {
    current_room = document.getElementById("current_room").setAttribute('data-value', new_room);
    roomCleanup();
    unloadAndJoinNewRoom();
    console.warn("Done unload")

}

function roomInit() {
    console.warn("roomInit")
//    $(window).bind("beforeunload", unload);
//    $(window).bind("unload", unload);

    current_room = getRoom();
    current_room_config = rooms[current_room];

    document.getElementById("body").classList = [current_room_config["body_class"]];

    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARNING);

    JitsiMeetJS.init(options);

    connection = new JitsiMeetJS.JitsiConnection(null, null, options);

    connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess
    );
    connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed
    );
    connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        disconnect
    );


    JitsiMeetJS.mediaDevices.addEventListener(
        JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
        onDeviceListChanged
    );

    connection.connect(undefined, undefined, "ELHAMIN_BLOCK");

    JitsiMeetJS.createLocalTracks({devices: ["audio", "video"]})
        .then(onLocalTracks)
        .catch((error) => {
            throw error;
        });

    if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable("output")) {
        JitsiMeetJS.mediaDevices.enumerateDevices((devices) => {
            const audioOutputDevices = devices.filter((d) => d.kind === "audiooutput");

            if (audioOutputDevices.length > 1) {
                $("#audioOutputSelect").html(
                    audioOutputDevices
                        .map((d) => `<option value="${d.deviceId}">${d.label}</option>`)
                        .join("\n")
                );

                $("#audioOutputSelectWrapper").show();
            }
        });
    }
}

function roomCleanup() {
    $('.video_self').remove();
    $('.audio_self').remove();
    $('.video_remote').remove();
    $('.audio_remote').remove();
}

function getRoom() {
    current_room = document.getElementById("current_room").getAttribute('data-value');
    return current_room;
}

function addYoutubePlayer() {
    if (getRoom() === "block") {
                var player2;
                var utcstart = 1589278643;
                var utcnow = Math.round(new Date().getTime() / 1000);
                var offset = utcnow - utcstart;
                player1 = new YT.Player("muteYouTubeVideoPlayer", {
                    videoId: "zMG7K5_Jv2M", // YouTube Video ID
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
                        origin: "https://foosa-a977b5f6.localhost.run",
                    },
                    events: {
                        onReady: function (e) {
                            // e.target.mute();
                            e.target.setVolume(30);
                            e.target.playVideo();
                        },
                        // onStateChange: function (e) {
                        //     if (e.data == YT.PlayerState.PLAYING) {
                        //         e.target.setPlaybackQuality('hd720');  // <-- WORKS!
                        //     }
                        // }
                    },
                });
            }
}

document.addEventListener("DOMContentLoaded", roomInit);