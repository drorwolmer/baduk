// https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/API.md

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
    disableAudioLevels: false,
    disableSimulcast: false

};

const mini_conferences = {
    second_room: []
}


let connection = null;
let isJoined = false;
let room = null;
let user_id = null;

let localTracks = [];
const remoteTracks = {};

const GLOBAL_EMOJI_STATE = {};

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


function onUserJoined(participant) {
    console.error("USER_JOINED", participant);

    const the_actual_participnt = Conference.getParticipantById(participant);

    let video_parent = "#container";
    if (mini_conferences["second_room"].indexOf(participant) > -1) {
        video_parent = "#second_room";
    }

    $(video_parent).append(`
        <div class="video person local_muted remote_participant video_${participant}">
            <div class="emoji">${GLOBAL_EMOJI_STATE[participant]}</div>
            <div class="id">${the_actual_participnt.getDisplayName()} | ${participant}</div>
            <div class="chat"></div>
            <div class="in"></div>
            <video autoplay='1' id='${participant}video' />
            <audio autoplay='1' id='${participant}audio' />
        </div>`
    );


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

    remoteTracks[participant].push(track);

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
    document.getElementById(id).volume = 0;
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

}

/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.warn("onConferenceJoined");

    user_id = Conference.myUserId();

    $("#container").append(
        `<div class="video person video_self video_${user_id}">
            <div class="emoji"></div>
            <div class="id">${user_id}</div>
            <div class="chat"></div>
            <div class="in"></div>
            <video muted autoplay="1" id="localVideo" />
            <audio muted autoplay="1" id="localAudio" />
        </div>`
    );

    isJoined = true;

    JitsiMeetJS.createLocalTracks({devices: ["audio", "video"]})
        .then(function (local_tracks) {

            console.error("ON_LOCAL_TRACKS", local_tracks);

            for (let i = 0; i < local_tracks.length; i++) {

                let local_track = local_tracks[i];

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

                local_track.unmute();

                Conference.addTrack(local_track);

                if (local_track.getType() === "video") {
                    local_track.attach(document.getElementById("localVideo"));
                } else {
                    local_track.attach(document.getElementById("localAudio"));
                }

            }

        })
        .catch((error) => {
            // TODO(DROR): Do something about this!!
            // window.alert("No audio/video for you...");
            // throw error;
        });

    // Try to load the display_name from the local cache
    let display_name = window.localStorage.getItem("DISPLAY_NAME");
    if (!display_name || display_name === "null") {
        display_name = "ANONYMOUS"
    }
    change_local_display_name(display_name);

    // Try to load the emoji from the local cache
    let emoji = window.localStorage.getItem("EMOJI");
    if (!emoji || emoji === "null") {
        emoji = "😷";
    }
    setLocalEmoji(emoji);

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

    $("#second_room").click(function () {
        if (mini_conferences["second_room"].indexOf(Conference.myUserId()) > -1) {
            Conference.removeCommand("JOIN_MINI_CONFERENCE", {
                attributes: {
                    from: Conference.myUserId(),
                    to: "second_room"
                }
            });
            Conference.sendCommandOnce("LEAVE_MINI_CONFERENCE", {
                attributes: {
                    from: Conference.myUserId(),
                    to: "second_room"

                }
            });
        } else {
            Conference.sendCommand("JOIN_MINI_CONFERENCE", {
                attributes: {
                    from: Conference.myUserId(),
                    to: "second_room"
                }
            });
        }
    });

    Conference.addCommandListener("JOIN_MINI_CONFERENCE", function (e) {
        let from = e.attributes["from"];
        let to = e.attributes["to"];

        mini_conferences[to].push(from);

        console.error("JOIN_MINI_CONFERENCE", from, to, mini_conferences);
        $(`.video_${from}`).prependTo(`#${to}`);

        if (from === Conference.myUserId()) {
            Conference.getParticipants().forEach(function (participant) {
                let participant_id = participant.getId();
                let index = mini_conferences[to].indexOf(participant_id);
                if (index > -1) {
                    let audio_el = document.getElementById(`${participant_id}audio`);
                    if (audio_el) {

                        audio_el.volume = 1;
                    }
                    $(`.video_${participant_id}`).removeClass("local_muted");
                }

            });
        } else {
            let index = mini_conferences[to].indexOf(Conference.myUserId());
            if (index > -1) {
                let audio_el = document.getElementById(`${from}audio`);
                if (audio_el) {
                    audio_el.volume = 1;
                }
                $(`.video_${from}`).removeClass("local_muted");
            }
        }
    });


    Conference.addCommandListener("LEAVE_MINI_CONFERENCE", function (e) {
        let from = e.attributes["from"];
        let to = e.attributes["to"];

        console.error("LEAVE_MINI_CONFERENCE", from, mini_conferences);
        $(`.video_${from}`).appendTo(`#container`);

        if (from === Conference.myUserId()) {
            console.error("IM Out!!!");
            Conference.getParticipants().forEach(function (participant) {
                let participant_id = participant.getId();
                let audio_el = document.getElementById(`${participant_id}audio`);
                if (audio_el) {
                    audio_el.volume = 0;
                }
                $(`.video_${participant_id}`).addClass("local_muted");
            });
        } else {
            // Someone else left the mini-room, let's see if we're in that room
            let index = mini_conferences[to].indexOf(Conference.myUserId());
            if (index > -1) {
                let audio_el = document.getElementById(`${from}audio`);
                if (audio_el) {
                    audio_el.volume = 0;
                }
                $(`.video_${from}`).addClass("local_muted");
            }
        }

        let index = mini_conferences[to].indexOf(from);
        if (index > -1) {
            mini_conferences[to].splice(index, 1);
        }
    });

    Conference.addEventListener("USER_ADDED_TO_SCREEN", function (e) {
        console.error("USER_ADDED_TO_SCREEN", e);
    });

    Conference.addCommandListener("SET_HD_USERS", function (e) {
        var user_list = e.attributes['user_list'].split(",");

        console.error("setting users to hd", user_list);

        if (user_list.indexOf(room.myUserId()) > -1) {
            room.setSenderVideoConstraint(1080);
        } else {
            room.setSenderVideoConstraint(180);
        }

        room.selectParticipants(user_list);
    });

    Conference.addCommandListener("SET_EMOJI", function (e) {
        let emoji = e.attributes["emoji"];
        let id = e.attributes["id"];
        GLOBAL_EMOJI_STATE[id] = emoji
        console.error("SET_EMOJI", id, emoji);
        $(`.video_${id} .emoji`).text(emoji);
    });


    $(".video_self .id").click(function (event) {
        event.stopPropagation();

        const display_name = window.prompt("Display Name???");
        if (display_name) {
            change_local_display_name(display_name);

        }
    });

    $(".video_self .in").click(function (event) {
        event.stopPropagation();

        const msg = window.prompt("Say something:");
        if (msg) {
            Conference.sendMessage(msg);
            // No need to emit an event here, we will get this event
        }
    });

    $(".video_self .emoji").click(function (event) {
        event.stopPropagation();
        const emoji = window.prompt("what emoji? https://getemoji.com/");
        if (emoji) {
            setLocalEmoji(emoji);
        }
    });


    setInterval(function () {

        var participants = room.getParticipants();

        for (let i = 0; i < participants.length; i++) {

            var participant = participants[i];
            if (participant._connectionStatus === "interrupted") {
                console.warn("Kicking participant because of interrupted connection", participant._id);
                room.kickParticipant(participant._id);
            }
        }

    }, 5000);
}


function change_local_display_name(display_name) {
    Conference.setDisplayName(display_name);
    window.localStorage.setItem("DISPLAY_NAME", display_name);
    Conference.eventEmitter.emit(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, user_id, display_name);
}

function setLocalEmoji(emoji) {
    window.localStorage.setItem("EMOJI", emoji);
    $(".video_self .emoji").text(emoji);
    console.error(
        `setLocalEmoji(${emoji})`
    );
    Conference.sendCommand("SET_EMOJI", {
            attributes: {
                "id": Conference.myUserId(),
                "emoji": emoji
            }
        }
    );
}

/**
 *
 * @param id
 */
function onUserLeft(id) {
    console.error("USER_LEFT", id);

    if (remoteTracks[id]) {

        for (let i = 0; i < remoteTracks[id].length; i++) {
            let remote_track = remoteTracks[id][i];
            remote_track.detach(remote_track.containers[0]);
        }
    }

    let index = mini_conferences["second_room"].indexOf(id);
    if (index > -1) {
        mini_conferences["second_room"].splice(index, 1);
    }

    // console.error("About to remove", "#video_".concat(id));
    // console.error(document.querySelectorAll(".video_".concat(id)));
    document.querySelectorAll(".video_".concat(id)).forEach((e) => e.remove());
}

window.Conference = null;

function setHdUsers(user_list) {

    Conference.removeCommand("SET_HD_USERS");

    Conference.sendCommand("SET_HD_USERS", {
            attributes: {
                "user_list": user_list.join(",")
            }
        }
    );
}

/**
 * That function is called when connection is established successfully
 */
function onConnectionSuccess() {
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

    room.addCommandListener("HARAMA", function (e) {
        haramotTimePoints.push({
            time: Math.round(new Date().getTime() / 1000),
            user: e.attributes["user"]
        });
    });

    window.Conference = room;

    Conference.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, function (id, display_name) {
        console.error("DISPLAY_NAME_CHANGED", id, display_name);
        $(`.video_${id} .id`).text(`${display_name} | ${id}`);
    });

    Conference.on(JitsiMeetJS.events.conference.SUBJECT_CHANGED, function (subject) {
        console.error("SUBJECT_CHANGED", subject)
    });

    Conference.on(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, function (id, text, ts) {
        $(`.video_${id} .chat`).show().text(text).delay(3000).fadeOut(800);
        console.error("MESSAGE_RECEIVED", id, text, ts);
    });

    room.on(JitsiMeetJS.events.conference.USER_STATUS_CHANGED, onUserStatusChanged);

    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrackAdded);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onRemoteTrackRemoved);
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
    room.on(JitsiMeetJS.events.conference.USER_JOINED, onUserJoined);
    room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);

    // room.on(
    //     JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
    //     (userID, audioLevel) => console.error(

    //
    // `${userID} - ${audioLevel}`


// );

// room.addEventListener(
//     JitsiMeetJS.events.connectionQuality.LOCAL_STATS_UPDATED, onLocalStatsUpdated
// );
//
// room.addEventListener(
//     JitsiMeetJS.events.connectionQuality.REMOTE_STATS_UPDATED, onRemoteStatsUpdated
// );

    room.join();
    room.setSenderVideoConstraint(180);
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

