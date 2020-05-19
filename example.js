// https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/API.md

const options = {
    hosts: {
        domain: "dror-testing.tlvengnetapp.com",
        focus: 'focus.dror-testing.tlvengnetapp.com',
        muc: "conference.dror-testing.tlvengnetapp.com"
        // bridge: 'jitsi-videobridge.dror-testing.tlvengnetapp.com',

    },
    bosh: '//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS', // FIXME: use xep-0156 for that
    // websocket: 'wss://dror-testing.tlvengnetapp.com/xmpp-websocket', // FIXME: use xep-0156 for that
    clientNode: "http://jitsi.org/jitsimeet",
    desktopSharingChromeDisabled: true,
    openBridgeChannel: 'datachannel',
    enableTalkWhileMuted: true,
    enableNoAudioDetection: true,
    enableNoisyMicDetection: true,
    enableLipSync: false,
    disableAudioLevels: false,
    disableSimulcast: true,
    p2p: {
        enabled: false
    },
    // useStunTurn: true,
    useIPv6: false

};

const mini_conferences = {
    second_room: []
};


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

let desiredSendResolution = 180;

function onLocalTrackAudioEventChanged(e) {
    console.warn(`TRACK_AUDIO_LEVEL_CHANGED`, e);
}

function onLocalTrackMuteChanged(track) {
    console.error(`Local TRACK_MUTE_CHANGED`, track.track.label, track.isMuted(), track);
    if (track.type === "audio") {
        if (track.isMuted()) {
            $(".video_self").addClass("muted");
        } else {
            $(".video_self").removeClass("muted");
        }
    }
    else
    {
        if (track.isMuted()) {
            $(".video_self").addClass("no_video");
        } else {
            $(".video_self").removeClass("no_video");
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
    } else {
        if (track.isMuted()) {
            $(`.video_${track.ownerEndpointId}`).addClass("no_video");
        } else {
            $(`.video_${track.ownerEndpointId}`).removeClass("no_video");
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
        <div class="video person no_video local_muted remote_participant muted video_${participant}">
            <div class="emoji">${GLOBAL_EMOJI_STATE[participant]}</div>
            <div class="id">${the_actual_participnt.getDisplayName()} | ${participant}</div>
            <div class="chat"></div>
            <div class="chat_private"></div>
            <div class="in"></div>
            <video autoplay='1' id='${participant}video' />
            <audio autoplay='1' id='${participant}audio' />
        </div>`
    );

    $('.remote_participant .in').off('click');
    $(".remote_participant .in").click(function (event) {

        console.error("Clicked on participant")
        event.stopPropagation();

        var participantData = event.target.parentNode.querySelector(".id").innerHTML.split("|");
        var nick = $.trim(participantData[0]);
        var targetParticipantId = $.trim(participantData[1]);

        const msg = window.prompt(`Say something to ${nick}:`);
        console.error(nick, targetParticipantId, msg);

        if (msg && targetParticipantId) {
            room.sendPrivateTextMessage(targetParticipantId, msg);
        }
    })
}

/**
 * Handles remote tracks
 * @param track JitsiTrack object
 */
function onRemoteTrackAdded(track) {

    if (track.isLocal()) {
        Conference.setSenderVideoConstraint(180);
        return;
    }

    console.error("Remote TRACK_ADDED", track.getParticipantId(), track.isMuted(), track);

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

    track.attach($(`#${id}`)[0]);

    if (track.getType() === "audio" && !track.isMuted()) {
        $(`.video_${participant}`).removeClass("muted");
    }

    const local_inside_miniroom = (mini_conferences["second_room"].indexOf(Conference.myUserId()) > -1);
    const remote_inside_miniroom = (mini_conferences["second_room"].indexOf(participant) > -1);
    // Probably just track restart for some reason
    if (local_inside_miniroom && remote_inside_miniroom) {
        return;
    }

    console.error("Locally muting sound of ", participant);
    document.getElementById(id).volume = 0;

    console.error("before", $(`.video_${participant}`).attr("class"));

    if (track.getType() === "audio") {
        if (track.isMuted()) {
            $(`.video_${participant}`).addClass("muted").removeClass("local_muted");
        } else {
            console.error("adding local_muted class");
            $(`.video_${participant}`).removeClass("muted").addClass("local_muted");
        }
    } else {
        if (!track.isMuted()) {
            $(`.video_${participant}`).removeClass("no_video");
        }
    }

    console.error("after", $(`.video_${participant}`).attr("class"));


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

    fillFreeSeats();

    isJoined = true;

    user_id = Conference.myUserId();

    $("#container").append(
        `<div class="video no_video person video_self muted video_${user_id}">
            <div class="emoji"></div>
            <div class="id">${user_id}</div>
            <div class="chat"></div>
            <div class="in"></div>
            <video muted autoplay="1" id="localVideo" />
            <audio muted autoplay="1" id="localAudio" />
        </div>`
    );

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

                Conference.setSenderVideoConstraint(180);

                Conference.addTrack(local_track).then(function () {
                    if (local_track.getType() === "video") {
                        console.error("GOT LOCAL VIDEO!!@#!@#@!")
                        // TODO(DROR): Remember video decisiotn
                        local_track.unmute();
                        local_track.attach(document.getElementById("localVideo"));
                        $(".video_self").removeClass("no_video");
                    } else {
                        // Always mute audio track
                        local_track.mute();
                        local_track.attach(document.getElementById("localAudio"));
                    }

                    window.setTimeout(function () {
                        Conference.setSenderVideoConstraint(180);
                    }, 1000)
                });


            }

        })
        .catch((error) => {
            // TODO(DROR): Do something about this!!
            // window.alert("No audio/video for you...");
            // throw error;
        });


    $("#mute_toggle").click(function () {
        if (Conference.getLocalVideoTrack().isMuted()) {
            // Conference.getLocalAudioTrack().unmute();
            Conference.getLocalVideoTrack().unmute()
        } else {
            // TODO(DROR): These methods return a promise, whatever the fuck that means
            // Conference.getLocalAudioTrack().mute();
            Conference.getLocalVideoTrack().mute()
        }
    });

    $(document).on("click", ".free_seat", function () {
        if (mini_conferences["second_room"].indexOf(Conference.myUserId()) > -1) {
            Conference.removeCommand("JOIN_MINI_CONFERENCE");
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

const MAX_SEATS = 5;

function fillFreeSeats() {
    const n_free_seats = MAX_SEATS - mini_conferences["second_room"].length
    console.error("FILL_FREE_SEATS", n_free_seats);
    $(".video.free_seat").remove();
    for (let i = 0; i < n_free_seats; i++) {
        $(`
            <div class="video free_seat">
                <div class="id">Join the conversation</div>
                <div class="in"></div>
            </div>
        `).appendTo("#second_room");
    }
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

    room.addCommandListener("JOIN_MINI_CONFERENCE", function (e) {

        let from = e.attributes["from"];
        let to = e.attributes["to"];

        console.error("JOIN_MINI_CONFERENCE", from, to, mini_conferences);

        if (mini_conferences[to].indexOf(from) > -1) {
            // Probably command sent twice, do not address it
            console.error("Skipping handling of JOIN_MINI_CONFERENCE", from, to)
            return;
        }

        mini_conferences[to].push(from);

        $(`.video_${from}`).prependTo(`#${to}`);

        fillFreeSeats();

        if (from === Conference.myUserId()) {

            $("body").removeClass("outside_mini_conference").addClass("inside_mini_conference");

            // Join the room, start talking
            const local_audio_track = Conference.getLocalAudioTrack();
            if (local_audio_track) {
                Conference.getLocalAudioTrack().unmute()
            }

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
            } else {
                $(`.video_${from}`).addClass("local_muted");
            }
        }
    });

    room.addCommandListener("LEAVE_MINI_CONFERENCE", function (e) {
        let from = e.attributes["from"];
        let to = e.attributes["to"];

        // Probably command sent twice, do not address it
        if (mini_conferences[to].indexOf(from) === -1) {
            console.error("Skipping handling of LEAVE_MINI_CONFERENCE", from, to)
            return;
        }

        console.error("LEAVE_MINI_CONFERENCE", from, mini_conferences);
        $(`.video_${from}`).appendTo(`#container`);

        if (from === Conference.myUserId()) {

            $("body").addClass("outside_mini_conference").removeClass("inside_mini_conference");

            // Leave the room, stop talking
            const local_audio_track = Conference.getLocalAudioTrack();
            if (local_audio_track) {
                Conference.getLocalAudioTrack().mute()
            }

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

        fillFreeSeats();

    });

    room.addCommandListener("SET_HD_USERS", function (e) {
        var user_list = e.attributes['user_list'].split(",");

        console.error("setting users to hd", user_list);

        if (user_list.indexOf(room.myUserId()) > -1) {
            desiredSendResolution = 1080;
            room.setSenderVideoConstraint(desiredSendResolution);
        } else {
            desiredSendResolution = 180;
            room.setSenderVideoConstraint(desiredSendResolution);
        }

        room.selectParticipants(user_list);
    });

    room.addCommandListener("SET_EMOJI", function (e) {
        let emoji = e.attributes["emoji"];
        let id = e.attributes["id"];
        console.error("SET_EMOJI", id, emoji);
        GLOBAL_EMOJI_STATE[id] = emoji
        $(`.video_${id} .emoji`).text(emoji);
    });

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

    Conference.on(JitsiMeetJS.events.conference.DOMINANT_SPEAKER_CHANGED, function (id) {
        console.error("DOMINANT_SPEAKER_CHANGED", id);
        $(`.video`).removeClass("dominant");
        $(`.video_${id}`).addClass("dominant");
    });

    Conference.on(JitsiMeetJS.events.conference.SUBJECT_CHANGED, function (subject) {
        console.error("SUBJECT_CHANGED", subject)
    });

    Conference.on(JitsiMeetJS.events.conference.MESSAGE_RECEIVED, function (id, text, ts) {
        $(`.video_${id} .chat`).show().text(text).delay(10000).fadeOut(800);
        console.error("MESSAGE_RECEIVED", id, text, ts);
    });

    Conference.on(JitsiMeetJS.events.conference.PRIVATE_MESSAGE_RECEIVED, function (id, text, ts) {
        $(`.video_${id} .chat_private`).show().text(text).delay(10000).fadeOut(800);
        console.error("PRIVATE_MESSAGE_RECEIVED", id, text, ts);
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

connection.connect(undefined);


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
