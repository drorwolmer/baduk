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
            `<div class="video person local_muted remote_participant video_${participant}"><div class="id">${participant}</div><div class="in"></div><video muted autoplay='1' id='${id}' /></div>  `
        );
        $(`.video_${participant}`).data("id", participant);
    } else {
        $("#container").append(`<audio autoplay='1' id='${id}' />`);
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
    console.error("yu", window.location.href);
    if (window.location.href.indexOf("toilet") > -1) {
        // console.error(jQuery("#body"));
        document.getElementById("body").classList.add("toilet");
    } else {
        document.getElementById("body").classList.add("block");
    }

    let room_name = "block_demo_block";
    if (window.location.href.indexOf("toilet") > -1) {
        room_name = "block_demo_toiletsss";
    }

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

/**
 *
 */
function unload() {
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].dispose();
    }
    room.leave();
    connection.disconnect();
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

$(window).bind("beforeunload", unload);
$(window).bind("unload", unload);

JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARNING);
// const initOptions = {
//     disableAudioLevels: true,
//
//     // The ID of the jidesha extension for Chrome.
//     desktopSharingChromeExtId: "mbocklcggfhnbahlnepmldehdhpjfcjp",
//
//     // Whether desktop sharing should be disabled on Chrome.
//     desktopSharingChromeDisabled: true,
//
//     // The media sources to use when using screen sharing with the Chrome
//     // extension.
//     desktopSharingChromeSources: ["screen", "window"],
//
//     // Required version of Chrome extension
//     desktopSharingChromeMinExtVersion: "0.1",
//
//     // Whether desktop sharing should be disabled on Firefox.
//     desktopSharingFirefoxDisabled: true,
// };

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

