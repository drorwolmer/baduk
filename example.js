/* global $, JitsiMeetJS */

const options = {
    hosts: {
        domain: "beta.meet.jit.si",
        muc: "conference.beta.meet.jit.si", // FIXME: use XEP-0030
    },
    bosh: "https://beta.meet.jit.si/http-bind", // FIXME: use xep-0156 for that

    // The name of client node advertised in XEP-0115 'c' stanza
    clientNode: "http://jitsi.org/jitsimeet",
    desktopSharingChromeDisabled: true,

};

const confOptions = {
    openBridgeChannel: true,
};

let connection = null;
let isJoined = false;
let room = null;

let localTracks = [];
const remoteTracks = {};
let haramotTimePoints = [];

/**
 * Handles local tracks.
 * @param tracks Array with JitsiTrack objects
 */
function onLocalTracks(tracks) {
    localTracks = tracks;
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            (audioLevel) => console.log(`Audio Level local: ${audioLevel}`)
        );
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log("local track muted")
        );
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log("local track stoped")
        );
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            (deviceId) =>
                console.log(`track audio output device was changed to ${deviceId}`)
        );
        if (localTracks[i].getType() === "video") {
            $("#container").append(
                `<div class="video person"><div class="in"></div><video autoplay='1' id='localVideo${i}' /></div>`
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
function onRemoteTrack(track) {
    console.info("TRACK_ADDED", track);
    if (track.isLocal()) {
        return;
    }
    const participant = track.getParticipantId();

    if (!remoteTracks[participant]) {
        remoteTracks[participant] = [];
    }
    console.error("yoyoyo", participant);
    // if (remoteTracks[participant].length === 2) {
    //     console.error('not attaching!');
    //     return;
    // }
    const idx = remoteTracks[participant].push(track);

    track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        (audioLevel) => console.warn(`Audio Level remote: ${audioLevel}`)
    );
    track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () =>
        console.warn("remote track muted")
    );
    track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () =>
        console.warn("remote track stoped")
    );
    track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        (deviceId) =>
            console.warn(`track audio output device was changed to ${deviceId}`)
    );
    const id = participant + track.getType() + idx;

    console.error("about to add", id);

    if (track.getType() === "video") {
        $("#container").append(
            `<div class="video person video_${participant}"><div class="in"></div><video autoplay='1' id='${id}' /></div>  `
        );
    } else {
        $("#container").append(`<audio autoplay='1' id='${id}' />`);
    }
    console.error(track, `#${id}`);
    track.attach($(`#${id}`)[0]);
}

/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.log("conference joined!");
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
    }
    else {
        document.getElementById("body").classList.add("block");
    }

    let room_name = "block_demo_block";
    if (window.location.href.indexOf("toilet") > -1) {
        room_name = "block_demo_toilet";
    }

    room = connection.initJitsiConference(room_name, confOptions);
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

    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, (track) => {
        console.log("TRACK_REMOVED", track, track.ownerEndpointId)
        // console.error("About to remove", "#video_".concat(id));
        // console.error(document.querySelectorAll(".video_".concat(id)));
        document.querySelectorAll(".video_".concat(track.ownerEndpointId)).forEach((e) => e.remove());
        // console.log(`track removed!!!${track}`);
    });
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
    room.on(JitsiMeetJS.events.conference.USER_JOINED, (id) => {
        console.log("user join");
        remoteTracks[id] = [];
    });
    room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
    room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, (track) => {
        console.log(`${track.getType()} - ${track.isMuted()}`);
    });
    room.on(
        JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
        (userID, displayName) => console.log(`${userID} - ${displayName}`)
    );
    room.on(
        JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
        (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`)
    );
    room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, () =>
        console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`)
    );
    room.join();
    var timer = setInterval(checkHaramot, 1000);
}

/**
 * This function is called when the connection fail.
 */
function onConnectionFailed() {
    console.error("Connection Failed!");
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
  let cooldown = 30.0;
  let max_haramot_per_user = 30;

  var users = {};
  var current_time = new Date().getTime() / 1000;
  var total = 0;
  var remove_amount = 0;


  for (let i = haramotTimePoints.length; i != 0; i--) {
      var harama_user = haramotTimePoints[i - 1]["user"];
      var harama_time = haramotTimePoints[i - 1]["time"];

      // Because we're iterating backwards the first time our 'harama_time' is invalid all the following
      // ones are invalid too
      if (harama_time  + cooldown < current_time) {
        remove_amount = i + 1;
        break;
      }

      if (harama_user in users){
        if (users[harama_user] == max_haramot_per_user){
          continue;
        }
        users[harama_user] += 1;

      }
      else {
        users[harama_user] = 1;
      }

      total += 1;

  }

  haramotTimePoints.splice(0, remove_amount);

  console.error("Total haramot", total);
  return total;
}

function sendHarama() {

    var o = {
        attributes: {
            user: room.myUserId()
        }
    };

    room.sendCommandOnce("HARAMA", o);
}

$(window).bind("beforeunload", unload);
$(window).bind("unload", unload);

JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARNING);
const initOptions = {
    disableAudioLevels: true,

    // The ID of the jidesha extension for Chrome.
    desktopSharingChromeExtId: "mbocklcggfhnbahlnepmldehdhpjfcjp",

    // Whether desktop sharing should be disabled on Chrome.
    desktopSharingChromeDisabled: true,

    // The media sources to use when using screen sharing with the Chrome
    // extension.
    desktopSharingChromeSources: ["screen", "window"],

    // Required version of Chrome extension
    desktopSharingChromeMinExtVersion: "0.1",

    // Whether desktop sharing should be disabled on Firefox.
    desktopSharingFirefoxDisabled: true,
};


JitsiMeetJS.init(initOptions);

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

connection.connect();

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
