(this.webpackJsonpbaduk=this.webpackJsonpbaduk||[]).push([[0],{19:function(e){e.exports=JSON.parse('["\ud83d\ude01","\ud83e\udd2f","\ud83e\udd23","\ud83e\udd29","\ud83d\ude37","\ud83d\udc4f","\ud83d\ude4f","\ud83e\udd18","\ud83d\udc43","\ud83d\udc45","\ud83d\udc40","\ud83d\udd14","\ud83d\udc7d","\ud83d\udc7b","\ud83d\udc79"]')},28:function(e,t,n){e.exports=n(59)},33:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),a=n(11),c=n.n(a),r=(n(33),n(1)),s=n.n(r),u=n(4),d=n.n(u),l=n(2),m={id:"player-soundtrack",containerClassName:"player-soundtrack",videoId:"T92xtvU4WRc",options:{videoId:"T92xtvU4WRc",playlist:"QtXx3Qubmys",width:1,height:1,playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:1,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,start:100}},onReady:function(e){e.target.setVolume(100),e.target.playVideo()}},f={id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"3V9bPvna3nM",options:{videoId:"3V9bPvna3nM",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"3V9bPvna3nM",origin:"https://foosa-a977b5f6.localhost.run"}},onReady:function(e){e.target.playVideo()}},E=n(5),w=n(6),p=function(e,t){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,o=arguments.length>1?arguments[1]:void 0;return e[o.type]?e[o.type](n,o):n}},v=function(e,t){var n=window.localStorage.getItem(e);return n&&"null"!==n?n:t},N=function(){return window.JitsiConference?{audio:window.JitsiConference.getLocalAudioTrack(),video:window.JitsiConference.getLocalVideoTrack()}:{}},_=function(e,t){if(t)return N();var n=window.JitsiConference.getParticipantById(e).getTracks();return{audio:s.a.find(n,(function(e){return"audio"===e.getType()})),video:s.a.find(n,(function(e){return"video"===e.getType()}))}},b={block:{roomName:"block",jitsiRoomName:"block_demo_block",sideRooms:[]},toilet:{roomName:"toilet",jitsiRoomName:"block_demo_toiletsss",sideRooms:[{name:"second_room",maxSeats:5}]}},C=window.location.href.indexOf("toilet")>-1?b.toilet:b.block,O=function(e){return e.room},y=p({SET_ROOM:function(e,t){return t.payload.room}},C),S=function(e){return{type:"ADD_USER",payload:{user:e}}},g=function(e,t){return{type:"UPDATE_USER",payload:{userId:e,update:t}}},I=function(e){return s.a.find(e.users,{isLocal:!0})},J=function(e){return function(t){return s.a.filter(t.users,(function(t){return t.activeRoom===e}))}},A=function(e,t,n){return Object(w.a)(Object(w.a)({},e),{},Object(E.a)({},t.id,Object(w.a)(Object(w.a)({},t),n)))},j=p({ADD_USER:function(e,t){var n=t.payload.user;return Object(w.a)(Object(w.a)({},e),{},Object(E.a)({},n.id,n))},REMOVE_USER:function(e,t){var n=t.payload.userId;return s.a.omit(e,n)},UPDATE_USER:function(e,t){var n=t.payload,o=n.userId,i=n.update,a=e[o]||{};return A(e,a,i)},ADD_REMOTE_USER_TRACK:function(e,t){var n,o=t.payload,i=o.userId,a=o.trackType,c=o.isMuted,r=e[i]||{},s=(n={},Object(E.a)(n,"has_".concat(a),!0),Object(E.a)(n,"muted_".concat(a),c),n);return A(e,r,s)},UPDATE_DOMINANT_SPEAKER:function(e,t){var n=t.payload.userId;return console.warn("UPDATE_DOMINANT_SPEAKER",t),s.a.forEach(e,(function(e){e.isDominantSpeaker=e.id===n})),e}},{}),D=n(26),R=function(e){return e.messages},M=p({PUSH_MESSAGE:function(e,t){return[].concat(Object(D.a)(e),[t.payload.msg])},DELETE_MESSAGE:function(e,t){return s.a.filter(e,(function(e){return e.key!==t.payload.key}))}},[]),T=n(9),k=function(e){var t=e.dispatch,n=e.getState,o=window.JitsiMeetJS.events.connection,i=o.CONNECTION_ESTABLISHED,a=o.CONNECTION_FAILED,c=o.CONNECTION_DISCONNECTED;window.JitsiConnection=new window.JitsiMeetJS.JitsiConnection(null,null,T.a);var r=function(){console.warn("onConnectionSuccess");var e=O(n());h(t,e)},s=function(e){console.error("Connection Failed!",e)};window.JitsiConnection.addEventListener(i,r),window.JitsiConnection.addEventListener(a,s),window.JitsiConnection.addEventListener(c,(function e(){window.JitsiConnection.removeEventListener(i,r),window.JitsiConnection.removeEventListener(a,s),window.JitsiConnection.removeEventListener(c,e)})),window.JitsiConnection.connect(void 0)},h=function(e,t){if(window.JitsiConnection){console.warn("roomConfig="+JSON.stringify(t));var n=window.JitsiConnection.initJitsiConference(t.jitsiRoomName,T.a),o=window.JitsiMeetJS.events.conference,i=o.DISPLAY_NAME_CHANGED,a=o.MESSAGE_RECEIVED,c=(o.PRIVATE_MESSAGE_RECEIVED,o.CONFERENCE_JOINED),r=o.USER_JOINED,u=o.TRACK_ADDED,d=o.TRACK_REMOVED,l=o.USER_LEFT,m=o.DOMINANT_SPEAKER_CHANGED;n.on(i,(function(t,n){e(g(t,{displayName:n}))})),n.on(m,(function(t){e({type:"UPDATE_DOMINANT_SPEAKER",payload:{userId:t}})})),n.addCommandListener("SET_EMOJI",(function(t){var n=t.attributes.id,o=t.attributes.emoji;console.warn("SET_EMOJI",n,o),e(g(n,{emoji:o}))})),n.on(a,(function(t,n,o){console.warn("MESSAGE_RECEIVED",t,n,o);var i,a=JSON.parse(n),c=L();a.from_me=s.a.indexOf(c,a.id)>-1,a.to_me=s.a.indexOf(c,a.recipient)>-1,(a.from_me||a.to_me||"public"===a.recipient)&&e((i=Object(w.a)(Object(w.a)({},a),{},{ts:o?new Date(Date.parse(o)):new Date}),function(e){"".concat(i.id,"-").concat((new Date).getTime()),e({type:"PUSH_MESSAGE",payload:{msg:i}})}))})),n.on(c,P(e)),n.on(r,V(e)),n.on(u,x(e)),n.on(d,K(e)),n.on(l,F(e)),n.addCommandListener("JOIN_MINI_CONFERENCE",H(e)),n.addCommandListener("LEAVE_MINI_CONFERENCE",G(e)),window.JitsiConference=n,e({type:"SET_ROOM",payload:{room:t}}),n.join()}},L=function(){return JSON.parse(v("ALL_IDS","[]"))},P=function(e){return function(){console.warn("onConferenceJoined");var t=window.JitsiConference.myUserId(),n=L();n.push(t),window.localStorage.setItem("ALL_IDS",JSON.stringify(n));var o=v("DISPLAY_NAME","anonymous"),i=v("EMOJI","\ud83d\ude37");e(S({id:t,isLocal:!0,displayName:o,emoji:i,activeRoom:"MAIN",all_ids:n})),Y(t,o),X(i);var a={devices:["video","audio"],cameraDeviceId:v("video_device_id",null),onLocalTracks:v("audio_device_id",null)};window.JitsiMeetJS.createLocalTracks(a).then(U(e)).catch((function(e){throw e}))}},U=function(e){return function(t){console.error("onLocalTracks",t),s.a.map(t,(function(t){(window.localStorage.setItem("".concat(t.getType(),"_device_id"),t.getDeviceId()),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,W(e)),window.JitsiConference.setSenderVideoConstraint(180),"video"===t.getType())?"true"===v("SHOW_VIDEO","false")?(console.warn("unmuting video"),t.unmute()):t.mute():t.mute().then((function(){console.warn("audio muted...")}));window.JitsiConference.addTrack(t).then((function(){var n;console.warn("FOO",t),e(g(window.JitsiConference.myUserId(),(n={hasTracks:!0},Object(E.a)(n,"muted_".concat(t.getType()),t.isMuted()),Object(E.a)(n,"has_".concat(t.getType()),!0),n))),window.setTimeout((function(){window.JitsiConference.setSenderVideoConstraint(180)}),1e3)}))})),e(g(window.JitsiConference.myUserId(),{hasTracks:!0}))}},V=function(e){return function(t){var n=window.JitsiConference.getParticipantById(t);console.warn("onUserJoined",n),e(S({id:t,activeRoom:"MAIN",displayName:n.getDisplayName()}))}},x=function(e){return function(t){if(t.isLocal())window.JitsiConference.setSenderVideoConstraint(180);else{console.warn("Remote TRACK_ADDED",t.getParticipantId(),t.isMuted(),t),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,W(e)),t.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,(function(){return console.warn("remote track stoped")})),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,(function(e){return console.warn("track audio output device was changed to ".concat(e))}));var n=t.getParticipantId();e(function(e,t,n){return{type:"ADD_REMOTE_USER_TRACK",payload:{userId:e,trackType:t,isMuted:n}}}(n,t.getType(),t.isMuted()))}}},K=function(e){return function(e){e.isLocal()||console.warn("Remote TRACK_REMOVED",e,e.containers)}},F=function(e){return function(t){e(function(e){return{type:"REMOVE_USER",payload:{userId:e}}}(t))}},H=function(e){return function(t){var n=t.attributes.from,o=t.attributes.to;if(console.warn("JOIN_MINI_CONFERENCE",n,o),n===window.JitsiConference.myUserId()){var i=N().audio;i&&i.unmute()}e(g(n,{activeRoom:o}))}},G=function(e){return function(t){if(window.JitsiConference){var n=t.attributes.from;if(console.warn("LEAVE_MINI_CONFERENCE",n),n===window.JitsiConference.myUserId()){var o=N().audio;o&&o.mute()}e(g(n,{activeRoom:"MAIN"}))}}},B=function(){var e=N().video;e&&(e.isMuted()?(e.unmute(),window.localStorage.setItem("SHOW_VIDEO","true")):(e.mute(),window.localStorage.setItem("SHOW_VIDEO","false")))},W=function(e){return function(t){if(console.warn("TRACK_MUTE_CHANGED",t),t){var n=t.ownerEndpointId?t.ownerEndpointId:window.JitsiConference.myUserId();e(g(n,Object(E.a)({},"muted_".concat(t.getType()),t.isMuted())))}}},Y=function(e,t){window.JitsiConference&&(console.warn("setLocalDisplayName"),window.JitsiConference.setDisplayName(t),window.localStorage.setItem("DISPLAY_NAME",t),window.JitsiConference.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,e,t))},X=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_EMOJI",{attributes:{id:window.JitsiConference.myUserId(),emoji:e}}),window.localStorage.setItem("EMOJI",e))},Q=function(e,t){if(window.JitsiConference){var n=window.JitsiConference.myUserId(),o=v("DISPLAY_NAME","anonymous"),i=v("EMOJI","\ud83d\ude37"),a={id:n,displayName:o,targetDisplayName:"public"===e?"public":window.JitsiConference.getParticipantById(e).getDisplayName(),emoji:i,recipient:e,text:t};window.JitsiConference.sendMessage(JSON.stringify(a))}},q=function(){window.JitsiConference&&(s.a.each(window.JitsiConference.getLocalTracks(),(function(e){return e.dispose()})),window.JitsiConference.leave(),window.connection.disconnect())},z=n(7),$=(n(39),function(e,t){var n=function(n){e.current&&!e.current.contains(n.target)&&t(n)};Object(o.useEffect)((function(){return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}))}),Z=function(e){var t=e.children,n=e.className,a=e.onOutsideClick,c=Object(o.useRef)(null);return $(c,a),i.a.createElement("div",{className:d()("popup",n),ref:c},t)},ee=function(e){var t=e.children,n=e.refreshKey,i=e.ttl,a=void 0===i?-1:i,c=Object(o.useState)(!0),r=Object(z.a)(c,2),s=r[0],u=r[1];return Object(o.useEffect)((function(){if(a>-1){u(!0);var e=setTimeout((function(){u(!1)}),a);return function(){return clearTimeout(e)}}}),[n]),s&&t},te=n(19),ne=(n(40),function(e){var t=e.onSelection,n=Object(l.c)(I),o=function(e){return function(o){o.stopPropagation(),e!==n.emoji&&(X(e),t&&t(e))}};return i.a.createElement("div",{className:"emoji-selection"},s.a.map(te,(function(e,t){return i.a.createElement("div",{key:"emoji-".concat(t),onClick:o(e),className:d()("emoji-item",{selected:e===n.emoji})},e)})))}),oe=(n(41),function(e){var t=e.children;return i.a.createElement("div",{className:"bubble-wrapper"},i.a.createElement("div",{className:"speech-bubble"},t))}),ie=function(e,t){return e&&t.current&&e.attach(t.current)},ae=function(e,t){e&&t.current&&(e.detach(t.current),e.dispose())},ce=function(e){var t=e.id,n=e.isLocal,a=e.has_audio,c=e.has_video,r=e.muted_audio,u=e.muted_video,m=e.displayName,f=e.emoji,E=e.isAudioActive,w=e.isDominantSpeaker,p=Object(o.useRef)(null),v=Object(o.useRef)(null),N=Object(o.useState)(null),b=Object(z.a)(N,2),C=b[0],O=b[1],y=Object(o.useState)(null),S=Object(z.a)(y,2),g=S[0],I=S[1],J=Object(o.useState)(null),A=Object(z.a)(J,2),j=A[0],D=A[1],R=Object(l.c)(function(e){return function(t){return s.a.last(s.a.filter(t.messages,(function(t){return t.id===e&&"public"===t.recipient})))}}(t));Object(o.useEffect)((function(){if(c){var e=_(t,n).video;ie(e,p),O(e)}return function(){(a||c)&&ae(C,p)}}),[c,p]),Object(o.useEffect)((function(){if(a){var e=_(t,n).audio;ie(e,v),I(e)}return function(){a&&ae(g,v)}}),[a,v]);var M=function(){return D(null)},T=d()("user-display video person",{video_self:n,remote_participant:!n,no_video:!c||u,no_audio:!a||r,muted:!E&&!n,dominant:w,local_muted:!E&&n});return i.a.createElement("div",{className:T,onClick:function(e){if(e.stopPropagation(),n){var o=window.prompt("Say something:");o&&function(e){Q("public",e)}(o)}else{var i=window.prompt("Say something to ".concat(m,":"));i&&Q(t,i)}}},i.a.createElement("div",{className:"emoji",onClick:function(e){e.stopPropagation(),n&&D(i.a.createElement(ne,{onSelection:M}))}},f),i.a.createElement("div",{className:"id",onClick:function(e){if(e.stopPropagation(),n){var o=window.prompt("Display Name???");o&&Y(t,o)}}},m," ",t),R&&i.a.createElement(ee,{ttl:7e3,refreshKey:R.ts},i.a.createElement(oe,null,R.text)),i.a.createElement("div",{className:"in"}),c&&i.a.createElement("video",{autoPlay:"1",ref:p}),a&&i.a.createElement("audio",{muted:n||!E,autoPlay:"1",ref:v}),!s.a.isNil(j)&&i.a.createElement(Z,{onOutsideClick:M},j))},re=function(e){var t=e.users,n=e.isAudioActive,a=Object(o.useCallback)((function(e){return i.a.createElement(ce,Object.assign({key:"user-display-".concat(e.id)},e,{isAudioActive:n}))}),[t]);return s.a.map(s.a.orderBy(t,"id"),a)},se=(n(42),function(e){var t=e.name,n=e.maxSeats,o=Object(l.c)(J(t)),a=n-s.a.size(o),c=Object(l.c)(I).activeRoom===t,r=function(){!c&&function(e){var t=window.JitsiConference;if(t){var n=t.myUserId();t.sendCommand("JOIN_MINI_CONFERENCE",{attributes:{from:n,to:e}})}}(t)};return i.a.createElement("div",{className:"side-room",onClick:function(e){return e.stopPropagation()}},i.a.createElement("div",{className:"bg"}),i.a.createElement(re,{users:o,roomName:t,isAudioActive:c}),s.a.map(Array(a),(function(e,t){return i.a.createElement("div",{className:d()("user-display free-seat"),onClick:r},i.a.createElement("div",{className:"id"},"Speak up"),i.a.createElement("div",{className:"in"}))})))}),ue=n(27),de=n(20),le=function(e){var t=e.volume,n=Object(ue.a)(e,["volume"]),a=Object(o.useState)(null),c=Object(z.a)(a,2),r=c[0],s=c[1];Object(o.useEffect)((function(){r&&r.setVolume(t)}),[t]);return i.a.createElement(de.a,Object.assign({},n,{onReady:function(e){s(e.target),n.onReady&&n.onReady(e)}}))},me=(n(55),n(23)),fe=(n(56),n(57),function(e){var t=e.displayName,n=e.targetDisplayName,o=e.from_me,a=e.to_me,c=e.text,r=e.emoji,s=e.ts,u=e.recipient,l=d()("text-message",{private:"public"!==u,public:"public"===u,from_me:o,to_me:a});return i.a.createElement("div",{className:l},i.a.createElement("span",{className:"emoji"},r),i.a.createElement("span",{className:"nick from"},function(e){return a&&"public"!==u?"Private from ".concat(e):e}(t)),i.a.createElement("span",{className:"nick to"},function(e){return o&&"public"!==u?"Private to ".concat(e):e}(n)),i.a.createElement("span",{className:"msg-date"},"(",function(e){var t=e.getHours().toString().padStart(2,0),n=e.getMinutes().toString().padStart(2,0);return"".concat(t,":").concat(n)}(s),") "),i.a.createElement("span",{className:"text"},c))}),Ee=function(e){Object(me.a)(e);var t=Object(l.c)(R);return i.a.createElement("div",{className:"right-sidebar"},s.a.map(s.a.orderBy(t,"ts","desc"),(function(e){return i.a.createElement(fe,{key:e.ts,ts:e.ts,text:e.text,displayName:e.displayName,targetDisplayName:e.targetDisplayName,from_me:e.from_me,to_me:e.to_me,emoji:e.emoji,recipient:e.recipient})})))},we=function(e){var t=e.roomName,n=e.withVideoArt,o=Object(l.c)((function(e){return e.room})),a=Object(l.c)(J("MAIN")),c=Object(l.c)(I);if(s.a.isEmpty(c))return null;var r="MAIN"===c.activeRoom;return i.a.createElement("div",{className:d()("room",s.a.toLower(t))},i.a.createElement("div",{className:"bg"}),n&&i.a.createElement("div",{className:"video-art-top"},i.a.createElement("div",{className:"big-video-container"},i.a.createElement(le,f))),i.a.createElement("div",{className:"main-area",onClick:function(){!r&&function(e){var t=window.JitsiConference;t&&(t.removeCommand("JOIN_MINI_CONFERENCE"),t.sendCommandOnce("LEAVE_MINI_CONFERENCE",{attributes:{from:t.myUserId(),to:e}}))}(c.activeRoom)}},i.a.createElement(re,{users:a,roomName:"MAIN"}),s.a.map(o.sideRooms,(function(e,t){return i.a.createElement(se,Object.assign({key:"side-room-".concat(t)},e))})),i.a.createElement(Ee,null)))},pe=(n(58),function(e){var t=e.roomName,n=Object(l.b)(),o=function(e){return function(){return n(function(e){return function(t){window.JitsiConference&&window.JitsiConference.leave().then((function(){h(t,e)}))}}(e))}};return i.a.createElement("div",{className:"bottom-nav"},"block"!==t&&i.a.createElement("div",{className:"button button-to-block",onClick:o(b.block)}),"toilet"!==t&&i.a.createElement("div",{className:"button button-to-toilet",onClick:o(b.toilet)}),i.a.createElement("div",{className:"button mute-toggle",onClick:B}),i.a.createElement("div",{className:"button fullscreen-toggle",onClick:function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}}))});var ve=function(){var e=Object(l.c)(O).roomName,t=Object(l.c)(I),n=t&&"MAIN"===t.activeRoom?100:40;return i.a.createElement("div",{className:"app"},i.a.createElement(we,{roomName:e,withVideoArt:"block"===e}),i.a.createElement(pe,{roomName:e}),T.b&&i.a.createElement(le,Object.assign({},m,{volume:n})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ne,_e=n(8),be=n(24),Ce=n.n(be),Oe=n(25),ye=Object(_e.c)({users:j,room:y,messages:M}),Se=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||_e.d,ge=Object(_e.e)(ye,Se(Object(_e.a)(Ce.a,Oe.a)));window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR),Ne=ge,console.warn("initJitsi"),window.JitsiMeetJS.init(T.a),k(Ne),setInterval((function(){if(window.JitsiConference){var e=window.JitsiConference.getParticipants();s.a.forEach(e,(function(e){"interrupted"===e._connectionStatus&&(console.warn("Kicking participant because of interrupted connection",e._id),window.JitsiConference.kickParticipant(e._id))}))}}),5e3),window.addEventListener("beforeunload",q),window.addEventListener("unload",q),c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(l.a,{store:ge},i.a.createElement(ve,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e){e.exports=JSON.parse('{"a":{"hosts":{"domain":"dror-testing.tlvengnetapp.com","focus":"focus.dror-testing.tlvengnetapp.com","muc":"conference.dror-testing.tlvengnetapp.com"},"bosh":"//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS","clientNode":"http://jitsi.org/jitsimeet","desktopSharingChromeDisabled":true,"openBridgeChannel":"datachannel","enableTalkWhileMuted":true,"enableNoAudioDetection":true,"enableNoisyMicDetection":true,"enableLipSync":false,"disableAudioLevels":false,"disableSimulcast":true,"p2p":{"enabled":false},"e2eping":{"pingInterval":-1},"useIPv6":false},"b":false}')}},[[28,1,2]]]);
//# sourceMappingURL=main.ba225ba3.chunk.js.map