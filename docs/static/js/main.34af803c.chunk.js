(this.webpackJsonpbaduk=this.webpackJsonpbaduk||[]).push([[0],{102:function(e,t,n){},11:function(e){e.exports=JSON.parse('{"a":{"hosts":{"domain":"dror-testing.tlvengnetapp.com","focus":"focus.dror-testing.tlvengnetapp.com","muc":"conference.dror-testing.tlvengnetapp.com"},"bosh":"//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS","clientNode":"http://jitsi.org/jitsimeet","desktopSharingChromeDisabled":true,"openBridgeChannel":"datachannel","enableTalkWhileMuted":true,"enableNoAudioDetection":true,"enableNoisyMicDetection":true,"enableLipSync":false,"disableAudioLevels":false,"disableSimulcast":true,"p2p":{"enabled":false},"e2eping":{"pingInterval":-1},"useIPv6":false},"b":false}')},115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},118:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(16),c=n.n(a),r=(n(47),n(1)),s=n.n(r),u=n(3),l=n.n(u),d=n(2),m={id:"player-soundtrack",containerClassName:"player-soundtrack",videoId:"T92xtvU4WRc",options:{videoId:"T92xtvU4WRc",playlist:"QtXx3Qubmys",width:1,height:1,playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:1,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,start:100}},onReady:function(e){e.target.setVolume(100),e.target.playVideo()}},f={id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"m6cy9PqMgIk",options:{videoId:"m6cy9PqMgIk",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"m6cy9PqMgIk"}},onReady:function(e){e.target.playVideo()},onEnd:function(e){console.error("onEnd"),e.target.seekTo(0)}},E=n(6),p=n(7),v=function(e,t){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,i=arguments.length>1?arguments[1]:void 0;return e[i.type]?e[i.type](n,i):n}},w=function(e,t){var n=window.localStorage.getItem(e);return n&&"null"!==n?n:t},b=function(){return window.JitsiConference?{audio:window.JitsiConference.getLocalAudioTrack(),video:window.JitsiConference.getLocalVideoTrack()}:{}},_=function(e,t){if(t)return b();var n=window.JitsiConference.getParticipantById(e).getTracks();return{audio:s.a.find(n,(function(e){return"audio"===e.getType()})),video:s.a.find(n,(function(e){return"video"===e.getType()}))}},N={block:{roomName:"block",jitsiRoomName:"block_demo_block",sideRooms:[]},toilet:{roomName:"toilet",jitsiRoomName:"block_demo_toiletsss",sideRooms:[{name:"second_room",maxSeats:5}]}},g=function(e){return window.localStorage.setItem("ROOM_NAME",e.roomName),{type:"SET_ROOM",payload:{room:e}}},O=function(e){return e.room},C=v({SET_ROOM:function(e,t){return t.payload.room}},{}),I=function(e){return{type:"ADD_USER",payload:{user:e}}},y=function(e,t){return{type:"UPDATE_USER",payload:{userId:e,update:t}}},S=function(e){return s.a.find(e.users,{isLocal:!0})},D=function(e){return function(t){return s.a.filter(t.users,(function(t){return t.activeRoom===e}))}},h=function(e,t,n){return Object(p.a)(Object(p.a)({},e),{},Object(E.a)({},t.id,Object(p.a)(Object(p.a)({},t),n)))},J=v({ADD_USER:function(e,t){var n=t.payload.user;return Object(p.a)(Object(p.a)({},e),{},Object(E.a)({},n.id,n))},REMOVE_USER:function(e,t){var n=t.payload.userId;return s.a.omit(e,n)},UPDATE_USER:function(e,t){var n=t.payload,i=n.userId,o=n.update,a=e[i]||{};return h(e,a,o)},ADD_REMOTE_USER_TRACK:function(e,t){var n,i=t.payload,o=i.userId,a=i.trackType,c=i.isMuted,r=e[o]||{},s=(n={},Object(E.a)(n,"has_".concat(a),!0),Object(E.a)(n,"muted_".concat(a),c),n);return h(e,r,s)},UPDATE_DOMINANT_SPEAKER:function(e,t){var n=t.payload.userId;return console.warn("UPDATE_DOMINANT_SPEAKER",t),s.a.forEach(e,(function(e){e.isDominantSpeaker=e.id===n})),e}},{}),A=n(40),j=function(e){return s.a.filter(e.messages,(function(e){return"public"===e.recipient}))},T=v({PUSH_MESSAGE:function(e,t){return[].concat(Object(A.a)(e),[t.payload.msg])},DELETE_ALL_MESSAGES:function(e,t){return[]},DELETE_MESSAGE:function(e,t){return s.a.filter(e,(function(e){return e.key!==t.payload.key}))}},[]),k=n(11),M=function(e){return e.devices},L=v({SET_INPUT_DEVICE:function(e,t){var n=Object(p.a)({},e);return"audio"===t.payload.type?n.audio_input_id=t.payload.id:n.video_input_id=t.payload.id,n},SET_AVAILABLE_INPUT_DEVICES:function(e,t){var n=t.payload.audio_inputs,i=t.payload.video_inputs;return Object(p.a)(Object(p.a)({},e),{},{audio_inputs:n,video_inputs:i})}},{audio_inputs:[],video_inputs:[],video_input_id:null,audio_input_id:null}),R=function(e){var t=e.dispatch,n=e.getState,i=window.JitsiMeetJS.events.connection,o=i.CONNECTION_ESTABLISHED,a=i.CONNECTION_FAILED,c=i.CONNECTION_DISCONNECTED;window.JitsiConnection=new window.JitsiMeetJS.JitsiConnection(null,null,k.a);var r=function(){console.warn("onConnectionSuccess");var e=O(n());U(t,e)},s=function(e){console.error("Connection Failed!",e)};window.JitsiConnection.addEventListener(o,r),window.JitsiConnection.addEventListener(a,s),window.JitsiConnection.addEventListener(c,(function e(){window.JitsiConnection.removeEventListener(o,r),window.JitsiConnection.removeEventListener(a,s),window.JitsiConnection.removeEventListener(c,e)})),window.JitsiConnection.connect(void 0)},U=function(e,t){if(window.JitsiConnection){console.warn("roomConfig="+JSON.stringify(t));var n=window.JitsiConnection.initJitsiConference(t.jitsiRoomName,k.a),i=window.JitsiMeetJS.events.conference,o=i.DISPLAY_NAME_CHANGED,a=i.MESSAGE_RECEIVED,c=(i.PRIVATE_MESSAGE_RECEIVED,i.CONFERENCE_JOINED),r=i.USER_JOINED,s=i.TRACK_ADDED,u=i.TRACK_REMOVED,l=i.USER_LEFT,d=i.DOMINANT_SPEAKER_CHANGED;n.on(o,(function(t,n){e(y(t,{displayName:n}))})),n.on(d,(function(t){e({type:"UPDATE_DOMINANT_SPEAKER",payload:{userId:t}})})),n.addCommandListener("SET_EMOJI",(function(t){var n=t.attributes.id,i=t.attributes.emoji;console.warn("SET_EMOJI",n,i),e(y(n,{emoji:i}))})),n.addCommandListener("SET_GLOBAL_UID",(function(t){var n=t.attributes.conference_id,i=t.attributes.globalUID;console.warn("SET_GLOBAL_UID",n,i,t.attributes),e(y(n,{globalUID:i}))})),n.on(a,(function(t,n,i){console.warn("MESSAGE_RECEIVED",t,n,i);var o=null;try{o=JSON.parse(n)}catch(r){return}var a,c=w("GLOBAL_UID");o.from_me=o.globalUID===c,o.to_me=o.recipient===c,(o.from_me||o.to_me||"public"===o.recipient)&&e((a=Object(p.a)(Object(p.a)({},o),{},{ts:i?new Date(Date.parse(i)):new Date}),function(e){"".concat(a.id,"-").concat((new Date).getTime()),e({type:"PUSH_MESSAGE",payload:{msg:a}})}))})),n.on(c,P(e)),n.on(r,x(e)),n.on(s,K(e)),n.on(u,G(e)),n.on(l,H(e)),n.addCommandListener("JOIN_MINI_CONFERENCE",B(e)),n.addCommandListener("LEAVE_MINI_CONFERENCE",F(e)),window.JitsiConference=n,e(g(t)),n.join()}},P=function(e){return function(){console.warn("onConferenceJoined");var t=window.JitsiConference.myUserId(),n=w("DISPLAY_NAME","anonymous"),i=w("EMOJI","\ud83d\ude37"),o=w("GLOBAL_UID",function(e){for(var t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n="",i=e;i>0;--i)n+=t[Math.floor(Math.random()*t.length)];return n}(16));e(I({id:t,globalUID:o,isLocal:!0,displayName:n,emoji:i,activeRoom:"MAIN"})),q(t,n),X(i),z(o);var a={devices:["video","audio"],cameraDeviceId:w("video_device_id",null),micDeviceId:w("audio_device_id",null),constraints:{height:180,width:180}};console.error("will run createLocalTracks"),window.JitsiMeetJS.createLocalTracks(a).then(V(e)).catch((function(e){throw e}))}},V=function(e){return function(t){console.error("onLocalTracks",t),window.JitsiMeetJS.mediaDevices.isDeviceListAvailable()&&window.JitsiMeetJS.mediaDevices.enumerateDevices((function(t){var n=s.a.filter(t,(function(e){return"audioinput"===e.kind})),i=s.a.filter(t,(function(e){return"videoinput"===e.kind}));e(function(e,t){return{type:"SET_AVAILABLE_INPUT_DEVICES",payload:{audio_inputs:e,video_inputs:t}}}(n,i))})),s.a.map(t,(function(t){var n,i;(window.localStorage.setItem("".concat(t.getType(),"_device_id"),t.getDeviceId()),e((n=t.getType(),i=t.getDeviceId(),{type:"SET_INPUT_DEVICE",payload:{type:n,id:i}})),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,Y(e)),window.JitsiConference.setSenderVideoConstraint(180),"video"===t.getType())?"true"===w("SHOW_VIDEO","false")?(console.warn("unmuting video"),t.unmute()):t.mute():t.mute().then((function(){console.warn("audio muted...")}));window.JitsiConference.addTrack(t).then((function(){var n;e(y(window.JitsiConference.myUserId(),(n={hasTracks:!0},Object(E.a)(n,"muted_".concat(t.getType()),t.isMuted()),Object(E.a)(n,"has_".concat(t.getType()),!0),n))),window.setTimeout((function(){window.JitsiConference.setSenderVideoConstraint(180)}),1e3)}))})),e(y(window.JitsiConference.myUserId(),{hasTracks:!0}))}},x=function(e){return function(t){var n=window.JitsiConference.getParticipantById(t);console.warn("onUserJoined",n),e(I({id:t,activeRoom:"MAIN",displayName:n.getDisplayName()}))}},K=function(e){return function(t){if(t.isLocal())window.JitsiConference.setSenderVideoConstraint(180);else{console.warn("Remote TRACK_ADDED",t.getParticipantId(),t.isMuted(),t),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,Y(e)),t.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,(function(){return console.warn("remote track stoped")})),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,(function(e){return console.warn("track audio output device was changed to ".concat(e))}));var n=t.getParticipantId();e(function(e,t,n){return{type:"ADD_REMOTE_USER_TRACK",payload:{userId:e,trackType:t,isMuted:n}}}(n,t.getType(),t.isMuted()))}}},G=function(e){return function(t){var n;console.warn("TRACK_REMOVED",t,t.containers);var i=t.getParticipantId();i||(i=window.JitsiConference.myUserId()),e(y(i,(n={},Object(E.a)(n,"has_".concat(t.getType()),!1),Object(E.a)(n,"muted_".concat(t.getType()),!0),n)))}},H=function(e){return function(t){e(function(e){return{type:"REMOVE_USER",payload:{userId:e}}}(t))}},B=function(e){return function(t){var n=t.attributes.from,i=t.attributes.to;if(console.warn("JOIN_MINI_CONFERENCE",n,i),n===window.JitsiConference.myUserId()){var o=b().audio;o&&o.unmute(),window.soundcloud&&window.soundcloud.setVolume(10)}e(y(n,{activeRoom:i}))}},F=function(e){return function(t){if(window.JitsiConference){var n=t.attributes.from;if(console.warn("LEAVE_MINI_CONFERENCE",n),n===window.JitsiConference.myUserId()){var i=b().audio;i&&i.mute(),window.soundcloud.setVolume(100)}e(y(n,{activeRoom:"MAIN"}))}}},W=function(){var e=b().video;e&&(e.isMuted()?(e.unmute(),window.localStorage.setItem("SHOW_VIDEO","true")):(e.mute(),window.localStorage.setItem("SHOW_VIDEO","false")))},Y=function(e){return function(t){if(console.warn("TRACK_MUTE_CHANGED",t),t){var n=t.ownerEndpointId?t.ownerEndpointId:window.JitsiConference.myUserId();e(y(n,Object(E.a)({},"muted_".concat(t.getType()),t.isMuted())))}}},q=function(e,t){window.JitsiConference&&(console.warn("setLocalDisplayName"),window.JitsiConference.setDisplayName(t),window.localStorage.setItem("DISPLAY_NAME",t),window.JitsiConference.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,e,t))},X=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_EMOJI",{attributes:{id:window.JitsiConference.myUserId(),emoji:e}}),window.localStorage.setItem("EMOJI",e))},z=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_GLOBAL_UID",{attributes:{globalUID:e,conference_id:window.JitsiConference.myUserId()}}),window.localStorage.setItem("GLOBAL_UID",e))},Q=function(e){Z("public","public",e)},Z=function(e,t,n){if(window.JitsiConference){console.error("sendPrivate",e,t,n);var i=w("DISPLAY_NAME","anonymous"),o=w("EMOJI","\ud83d\ude37"),a={globalUID:w("GLOBAL_UID"),displayName:i,targetDisplayName:t,emoji:o,recipient:e,text:n};window.JitsiConference.sendMessage(JSON.stringify(a))}},$=function(){window.JitsiConference&&(s.a.each(window.JitsiConference.getLocalTracks(),(function(e){return e.dispose()})),window.JitsiConference.leave(),window.connection.disconnect())},ee=n(5),te=(n(53),function(e,t){var n=function(n){e.current&&!e.current.contains(n.target)&&t(n)};Object(i.useEffect)((function(){return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}))}),ne=function(e){var t=e.children,n=e.className,a=e.onOutsideClick,c=Object(i.useRef)(null);return te(c,a),o.a.createElement("div",{className:l()("popup",n),ref:c},t)},ie=function(e){var t=e.children,n=e.refreshKey,o=e.ttl,a=void 0===o?-1:o,c=e.hidden,r=Object(i.useState)(null),s=Object(ee.a)(r,2),u=s[0],l=s[1],d=Object(i.useState)(!0),m=Object(ee.a)(d,2),f=m[0],E=m[1];return Object(i.useEffect)((function(){l(c)}),[]),Object(i.useEffect)((function(){if(a>-1){E(!0);var e=setTimeout((function(){E(!1)}),a);return function(){return clearTimeout(e)}}}),[n]),f&&!c&&!u&&t},oe=n(32),ae=(n(54),function(e){var t=e.onSelection,n=Object(d.c)(S),i=function(e){return function(i){i.stopPropagation(),e!==n.emoji&&(X(e),t&&t(e))}};return o.a.createElement("div",{className:"emoji-selection"},s.a.map(oe,(function(e,t){return o.a.createElement("div",{key:"emoji-".concat(t),onClick:i(e),className:l()("emoji-item",{selected:e===n.emoji})},e)})))}),ce=(n(55),function(e){var t=e.children,n=e.className;return o.a.createElement("div",{className:l()("bubble-wrapper",n),onClick:function(e){return e.stopPropagation()}},o.a.createElement("div",{className:"speech-bubble"},t))}),re=n(33),se=n.n(re),ue=(n(57),function(e){var t=e.className,n=e.submit,a=e.dismiss,c=Object(i.useRef)(),r=Object(i.useRef)("");Object(i.useEffect)((function(){c&&c.current.focus()}),[c]);return o.a.createElement(se.a,{innerRef:c,html:r.current,className:l()("text-input",t),onChange:function(e){return r.current=e.target.value},onKeyPress:function(e){var t;s.a.isEmpty(r.current)||13===e.charCode&&(e.preventDefault(),n&&n((t=r.current,(new DOMParser).parseFromString(t,"text/html").body.textContent||"")),a&&a())},onKeyDown:function(e){27===e.keyCode&&a&&a()}})}),le=(n(58),n(59),function(e){var t=e.displayName,n=e.targetDisplayName,i=e.from_me,a=e.to_me,c=e.text,r=e.emoji,s=e.ts,u=e.recipient,d="public"!==u,m=l()("text-message",{from_me:i,to_me:a});return d?o.a.createElement("div",{className:l()(m,"private")},o.a.createElement("span",{className:"text"},c)):o.a.createElement("div",{className:l()(m,"public")},o.a.createElement("span",{className:"emoji"},r),o.a.createElement("span",{className:"nick from"},function(e){return a&&"public"!==u?"Private from ".concat(e):e}(t)),o.a.createElement("span",{className:"nick to"},function(e){return i&&"public"!==u?"Private to ".concat(e):e}(n)),o.a.createElement("span",{className:"msg-date"},"(",function(e){var t=e.getHours().toString().padStart(2,0),n=e.getMinutes().toString().padStart(2,0);return"".concat(t,":").concat(n)}(s),") "),o.a.createElement("span",{className:"text"},c))}),de=n(34),me=n.n(de),fe=n(14),Ee=function(e){var t=e.messagesSelector,n=e.maxHeight,i=void 0===n?-1:n,a=Object(d.c)(t),c={"background-color":"rgba(0, 0, 0, 0.7)",height:"100vh"};return i>-1&&(c.height=0===s.a.size(a)?0:i),o.a.createElement(me.a,{className:Object(fe.css)(c)},o.a.createElement("div",{className:"chat-drawer"},s.a.map(s.a.orderBy(a,"ts","asc"),(function(e){return o.a.createElement(le,{key:e.ts.toISOString().concat(e.globalUID),ts:e.ts,text:e.text,displayName:e.displayName,targetDisplayName:e.targetDisplayName,from_me:e.from_me,to_me:e.to_me,emoji:e.emoji,recipient:e.recipient})}))))},pe=function(e){var t=e.recipient,n=e.maxDrawerHeight,a=Object(i.useState)(!1),c=Object(ee.a)(a,2),r=c[0],u=c[1],l=Object(d.c)(S);Object(i.useEffect)((function(){r&&u(!1)}),[r]);var m,f,E=t.globalUID,p=t.displayName;return o.a.createElement("div",{className:"chat"},o.a.createElement(Ee,{messagesSelector:(m=E,f=l.globalUID,function(e){return s.a.filter(e.messages,(function(e){return e.globalUID===m&&e.recipient===f||e.globalUID===f&&e.recipient===m}))}),maxHeight:n}),!r&&o.a.createElement(ue,{className:"chat-message",submit:function(e){Z(E,p,e),u(!0)}}))},ve=function(e){var t=e.message,n=Object(i.useState)(!1),a=Object(ee.a)(n,2),c=a[0],r=a[1];return!c&&o.a.createElement("div",{className:"chat message-preview",onClick:function(){return r(!0)}},o.a.createElement("div",{className:"chat-drawer"},o.a.createElement(le,t)))},we=function(e,t){return e&&t.current&&e.attach(t.current)},be=function(e,t){e&&t.current&&(e.detach(t.current),e.dispose())},_e=function(e){var t,n=e.user,a=e.isAudioActive,c=n.id,r=n.globalUID,u=n.isLocal,m=n.has_audio,f=n.has_video,p=n.muted_audio,v=n.muted_video,w=n.displayName,b=n.emoji,N=n.isDominantSpeaker,g=Object(i.useRef)(null),O=Object(i.useRef)(null),C=Object(i.useState)(null),I=Object(ee.a)(C,2),y=I[0],D=I[1],h=Object(i.useState)(null),J=Object(ee.a)(h,2),A=J[0],j=J[1],T=Object(i.useState)(null),k=Object(ee.a)(T,2),M=k[0],L=k[1],R=Object(i.useState)(!1),U=Object(ee.a)(R,2),P=U[0],V=U[1],x=Object(d.c)(S),K=Object(d.c)(function(e,t){return function(t){return s.a.last(s.a.filter(t.messages,(function(t){var n=Math.abs((new Date-t.ts)/1e3);return t.globalUID===e&&"public"===t.recipient&&n<10})))}}(r,x.globalUID)),G=Object(d.c)(function(e,t){return function(n){return s.a.last(s.a.filter(n.messages,(function(n){var i=Math.abs((new Date-n.ts)/1e3);return n.recipient===t&&n.globalUID===e&&i<10})))}}(r,x.globalUID));Object(i.useEffect)((function(){if(console.error("useEffect",f,g),f){var e=_(c,u).video;we(e,g),D(e)}return function(){f&&be(y,g)}}),[f,g]),Object(i.useEffect)((function(){if(m){var e=_(c,u).audio;we(e,O),j(e)}return function(){m&&be(A,O)}}),[m,O]);var H=function(e){var t=e.className,n=e.placeholder,i=e.submit,a=e.onHeightChange;return o.a.createElement(ce,{className:t},o.a.createElement(ue,{placeholder:n,submit:i,onHeightChange:a,dismiss:B}))},B=function(){L(null),V(!1)},F=l()("user-display video person",(t={video_self:u,remote_participant:!u,no_video:!f||v,no_audio:!m||p,muted:!a&&!u,dominant:N,local_muted:!a&&u},Object(E.a)(t,"id_".concat(c),!0),Object(E.a)(t,"globalUID_".concat(r),!0),t)),W=!s.a.isNil(M);return o.a.createElement("div",{className:F,onClick:function(e){e.stopPropagation(),u?L(H({placeholder:"Say something",submit:Q})):(V(!0),L(o.a.createElement(pe,{recipient:n,maxDrawerHeight:180})))}},o.a.createElement("div",{className:"emoji",onClick:function(e){e.stopPropagation(),console.error(e.key),e.shiftKey?console.warn("emoji shift+click"):u&&L(o.a.createElement(ae,{onSelection:B}))}},b),m&&!p&&o.a.createElement("div",{className:"emoji mic"},"\ud83c\udfa4"),o.a.createElement("div",{className:"id",onClick:function(e){e.stopPropagation(),u&&L(H({className:"centered no-pointer",placeholder:"Choose name",submit:function(e){return q(c,e)}}))}},w),K&&o.a.createElement(ie,{ttl:7e3,refreshKey:K.ts,hidden:W},o.a.createElement(ce,{className:l()({to_me:K.to_me})},K.text)),G&&o.a.createElement(ie,{ttl:3e3,refreshKey:G.ts,hidden:P},o.a.createElement(ve,{message:G})),o.a.createElement("div",{className:"in"}),f&&o.a.createElement("video",{autoPlay:"1",ref:g}),m&&o.a.createElement("audio",{muted:u||!a,autoPlay:"1",ref:O}),W&&o.a.createElement(ne,{onOutsideClick:B},M))},Ne=function(e){var t=e.users,n=e.isAudioActive,a=Object(i.useCallback)((function(e){return o.a.createElement(_e,{key:"user-display-".concat(e.id),user:e,isAudioActive:n})}),[t]);return o.a.createElement("div",{className:"users-display"},s.a.map(s.a.orderBy(t,"id"),a))},ge=(n(102),function(e){var t=e.name,n=e.maxSeats,a=Object(d.c)(D(t)),c=n-s.a.size(a),r=Object(d.c)(S).activeRoom===t,u=function(){!r&&function(e){var t=window.JitsiConference;if(t){var n=t.myUserId();t.sendCommand("JOIN_MINI_CONFERENCE",{attributes:{from:n,to:e}})}}(t)},m=Object(i.useCallback)((function(e){return o.a.createElement(_e,{key:"user-display-".concat(e.id),user:e,isAudioActive:r})}),[a]);return o.a.createElement("div",{className:"side-room",onClick:function(e){return e.stopPropagation()}},o.a.createElement("div",{className:"bg"}),s.a.map(s.a.orderBy(a,"id"),(function(e){return o.a.createElement("div",{className:"seat"},m(e))})),s.a.map(Array(c),(function(e,t){return o.a.createElement("div",{className:"seat"},o.a.createElement("div",{className:l()("user-display free-seat"),onClick:u},o.a.createElement("div",{className:"id"},"Speak up"),o.a.createElement("div",{className:"in"})))})))}),Oe=n(41),Ce=n(35),Ie=function(e){var t=e.volume,n=Object(Oe.a)(e,["volume"]),a=Object(i.useState)(null),c=Object(ee.a)(a,2),r=c[0],s=c[1];Object(i.useEffect)((function(){r&&r.setVolume(t)}),[t]);return o.a.createElement(Ce.a,Object.assign({},n,{onReady:function(e){s(e.target),n.onReady&&n.onReady(e)},onEnd:function(e){s(e.target),n.onEnd&&n.onEnd(e)}}))},ye=(n(115),function(e){var t=e.roomName,n=e.withVideoArt,i=Object(d.c)((function(e){return e.room})),a=Object(d.c)(D("MAIN")),c=Object(d.c)(S);if(s.a.isEmpty(c))return null;var r="MAIN"===c.activeRoom;return o.a.createElement("div",{className:l()("room",s.a.toLower(t))},o.a.createElement("div",{className:"bg"}),n&&o.a.createElement("div",{className:"video-art-top"},o.a.createElement("div",{className:"big-video-container"},o.a.createElement(Ie,f))),o.a.createElement("div",{className:"main-area",onClick:function(){!r&&function(e){var t=window.JitsiConference;t&&(t.removeCommand("JOIN_MINI_CONFERENCE"),t.sendCommandOnce("LEAVE_MINI_CONFERENCE",{attributes:{from:t.myUserId(),to:e}}))}(c.activeRoom)}},s.a.map(i.sideRooms,(function(e,t){return o.a.createElement(ge,Object.assign({key:"side-room-".concat(t)},e))})),o.a.createElement(Ne,{users:a,roomName:"MAIN"}),o.a.createElement("div",{className:"right-sidebar"},o.a.createElement(Ee,{messagesSelector:j}))))}),Se=(n(116),n(117),function(e){var t=e.input,n=e.type,i=e.local_input_id,a=Object(d.b)(),c=l()("input",{is_active:i===t.deviceId});return o.a.createElement("div",{onClick:function(e,t){return function(){return a(function(e,t){return function(n){if(window.JitsiMeetJS.mediaDevices.isDeviceChangeAvailable(e)){var i=null;i="audio"===e?window.JitsiConference.getLocalAudioTrack():window.JitsiConference.getLocalVideoTrack(),console.error("switchInput",i),window.JitsiConference.removeTrack(i).then((function(){i&&i.dispose();var o={devices:[e]};"audio"===e?o.micDeviceId=t:(o.cameraDeviceId=t,o.constraints={height:180,width:180}),window.JitsiMeetJS.createLocalTracks(o).then(V(n)).catch((function(e){throw e}))}))}else console.error("no isDeviceChangeAvailable()")}}(e,t))}}(n,t.deviceId),className:c},t.label)}),De=function(){var e=Object(d.c)(M),t=e.audio_inputs,n=e.video_inputs,i=e.video_input_id,a=e.audio_input_id;return o.a.createElement("div",{className:"options-selector",style:{background:"#fff"}},o.a.createElement("div",{className:"header"},"Audio inputs"),s.a.map(t,(function(e){return o.a.createElement(Se,{input:e,type:"audio",local_input_id:a})})),o.a.createElement("div",{className:"header"},"Video inputs"),s.a.map(n,(function(e){return o.a.createElement(Se,{input:e,type:"video",local_input_id:i})})))},he=function(e){var t=e.roomName,n=Object(d.b)(),a=Object(i.useState)(null),c=Object(ee.a)(a,2),r=(c[0],c[1]),s=function(e){return function(){return n(function(e){return function(t){window.JitsiConference&&window.JitsiConference.leave().then((function(){window.soundcloud&&window.soundcloud.setVolume(100),t({type:"DELETE_ALL_MESSAGES"}),U(t,e)}))}}(e))}};return o.a.createElement("div",{className:"bottom-nav"},"block"!==t&&o.a.createElement("div",{className:"button button-to-block",onClick:s(N.block)}),"toilet"!==t&&o.a.createElement("div",{className:"button button-to-toilet",onClick:s(N.toilet)}),o.a.createElement("div",{className:"button mute-toggle",onClick:W}),o.a.createElement("div",{className:"button fullscreen-toggle",onClick:function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}}),o.a.createElement("div",{className:"button button-options",onClick:function(e){e.stopPropagation(),r(o.a.createElement(De,null))}}),o.a.createElement(De,null))};var Je=function(){var e=Object(d.c)(O).roomName,t=Object(d.c)(S),n=t&&"MAIN"===t.activeRoom?100:40;return o.a.createElement("div",{className:"app"},o.a.createElement(ye,{roomName:e,withVideoArt:"block"===e}),o.a.createElement(he,{roomName:e}),k.b&&o.a.createElement(Ie,Object.assign({},m,{volume:n})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ae,je=n(10),Te=n(38),ke=n.n(Te),Me=n(39),Le=Object(je.c)({users:J,room:C,messages:T,devices:L}),Re=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||je.d,Ue=Object(je.e)(Le,Re(Object(je.a)(ke.a,Me.a)));window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR),Ue.dispatch(function(){var e=new URLSearchParams(window.location.search).get("room");return e||(e=w("ROOM_NAME")),e||(e="block"),g(N[e])}()),Ae=Ue,console.warn("initJitsi"),window.JitsiMeetJS.init(k.a),R(Ae),setInterval((function(){if(window.JitsiConference){var e=window.JitsiConference.getParticipants();s.a.forEach(e,(function(e){"interrupted"===e._connectionStatus&&(console.warn("Kicking participant because of interrupted connection",e._id),window.JitsiConference.kickParticipant(e._id))}))}}),5e3),window.addEventListener("beforeunload",$),window.addEventListener("unload",$),c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(d.a,{store:Ue},o.a.createElement(Je,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},32:function(e){e.exports=JSON.parse('["\ud83d\ude01","\ud83e\udd2f","\ud83e\udd23","\ud83e\udd29","\ud83d\ude37","\ud83d\udc4f","\ud83d\ude4f","\ud83e\udd18","\ud83d\udc43","\ud83d\udc45","\ud83d\udc40","\ud83d\udd14","\ud83d\udc7d","\ud83d\udc7b","\ud83d\udc79"]')},42:function(e,t,n){e.exports=n(118)},47:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){}},[[42,1,2]]]);
//# sourceMappingURL=main.34af803c.chunk.js.map