(this.webpackJsonpbaduk=this.webpackJsonpbaduk||[]).push([[0],{102:function(e,t,n){},11:function(e){e.exports=JSON.parse('{"a":{"hosts":{"domain":"meet.jit.si","focus":"focus.meet.jit.si","muc":"conference.meet.jit.si"},"bosh":"//meet.jit.si/http-bind?room=ELHAMIN_BLOCKUS","clientNode":"http://jitsi.org/jitsimeet","desktopSharingChromeDisabled":true,"openBridgeChannel":"datachannel","enableTalkWhileMuted":true,"enableNoAudioDetection":true,"enableNoisyMicDetection":true,"enableLipSync":false,"disableAudioLevels":false,"disableSimulcast":true,"p2p":{"enabled":false},"e2eping":{"pingInterval":-1},"useIPv6":false},"b":false}')},115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},118:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(16),c=n.n(a),r=(n(47),n(1)),s=n.n(r),u=n(2),l=n.n(u),d=n(3),m=n(6),f=n(7),E=function(e,t){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,i=arguments.length>1?arguments[1]:void 0;return e[i.type]?e[i.type](n,i):n}},p=function(e,t){var n=window.localStorage.getItem(e);return n&&"null"!==n?n:t},v=function(){return window.JitsiConference?{audio:window.JitsiConference.getLocalAudioTrack(),video:window.JitsiConference.getLocalVideoTrack()}:{}},w=function(e,t){if(t)return v();var n=window.JitsiConference.getParticipantById(e).getTracks();return{audio:s.a.find(n,(function(e){return"audio"===e.getType()})),video:s.a.find(n,(function(e){return"video"===e.getType()}))}},b={block:{roomName:"block",jitsiRoomName:"block_demo_block",sideRooms:[]},toilet:{roomName:"toilet",jitsiRoomName:"block_demo_toiletsss",sideRooms:[{name:"second_room",maxSeats:5}]}},_=function(e){return window.localStorage.setItem("ROOM_NAME",e.roomName),{type:"SET_ROOM",payload:{room:e}}},y=function(e){return e.room},N=E({SET_ROOM:function(e,t){return t.payload.room}},{}),O=function(e){return{type:"ADD_USER",payload:{user:e}}},g=function(e,t){return{type:"UPDATE_USER",payload:{userId:e,update:t}}},I=function(e){return s.a.find(e.users,{isLocal:!0})},C=function(e){return function(t){return s.a.filter(t.users,(function(t){return t.activeRoom===e}))}},S=function(e,t,n){return Object(f.a)(Object(f.a)({},e),{},Object(m.a)({},t.id,Object(f.a)(Object(f.a)({},t),n)))},h=E({ADD_USER:function(e,t){var n=t.payload.user;return Object(f.a)(Object(f.a)({},e),{},Object(m.a)({},n.id,n))},REMOVE_USER:function(e,t){var n=t.payload.userId;return s.a.omit(e,n)},UPDATE_USER:function(e,t){var n=t.payload,i=n.userId,o=n.update,a=e[i]||{};return S(e,a,o)},ADD_REMOTE_USER_TRACK:function(e,t){var n,i=t.payload,o=i.userId,a=i.trackType,c=i.isMuted,r=e[o]||{},s=(n={},Object(m.a)(n,"has_".concat(a),!0),Object(m.a)(n,"muted_".concat(a),c),n);return S(e,r,s)},UPDATE_DOMINANT_SPEAKER:function(e,t){var n=t.payload.userId;return console.warn("UPDATE_DOMINANT_SPEAKER",t),s.a.forEach(e,(function(e){e.isDominantSpeaker=e.id===n})),e}},{}),D=n(41),j=function(e){return s.a.filter(e.messages,(function(e){return"public"===e.recipient}))},A=E({PUSH_MESSAGE:function(e,t){return[].concat(Object(D.a)(e),[t.payload.msg])},DELETE_ALL_MESSAGES:function(e,t){return[]},DELETE_MESSAGE:function(e,t){return s.a.filter(e,(function(e){return e.key!==t.payload.key}))}},[]),J=n(11),k=function(e){return e.devices},M=E({SET_INPUT_DEVICE:function(e,t){var n=Object(f.a)({},e);return"audio"===t.payload.type?n.audio_input_id=t.payload.id:n.video_input_id=t.payload.id,n},SET_AVAILABLE_INPUT_DEVICES:function(e,t){var n=t.payload.audio_inputs,i=t.payload.video_inputs;return Object(f.a)(Object(f.a)({},e),{},{audio_inputs:n,video_inputs:i})}},{audio_inputs:[],video_inputs:[],video_input_id:null,audio_input_id:null}),T=function(e){var t=e.dispatch,n=e.getState,i=window.JitsiMeetJS.events.connection,o=i.CONNECTION_ESTABLISHED,a=i.CONNECTION_FAILED,c=i.CONNECTION_DISCONNECTED;window.JitsiConnection=new window.JitsiMeetJS.JitsiConnection(null,null,J.a);var r=function(){console.warn("onConnectionSuccess");var e=y(n());L(t,e)},s=function(e){console.error("Connection Failed!",e)};window.JitsiConnection.addEventListener(o,r),window.JitsiConnection.addEventListener(a,s),window.JitsiConnection.addEventListener(c,(function e(){window.JitsiConnection.removeEventListener(o,r),window.JitsiConnection.removeEventListener(a,s),window.JitsiConnection.removeEventListener(c,e)})),window.JitsiConnection.connect(void 0)},L=function(e,t){if(window.JitsiConnection){console.warn("roomConfig="+JSON.stringify(t));var n=window.JitsiConnection.initJitsiConference(t.jitsiRoomName,J.a),i=window.JitsiMeetJS.events.conference,o=i.DISPLAY_NAME_CHANGED,a=i.MESSAGE_RECEIVED,c=(i.PRIVATE_MESSAGE_RECEIVED,i.CONFERENCE_JOINED),r=i.USER_JOINED,s=i.TRACK_ADDED,u=i.TRACK_REMOVED,l=i.USER_LEFT,d=i.DOMINANT_SPEAKER_CHANGED;n.on(o,(function(t,n){e(g(t,{displayName:n}))})),n.on(d,(function(t){e({type:"UPDATE_DOMINANT_SPEAKER",payload:{userId:t}})})),n.addCommandListener("SET_EMOJI",(function(t){var n=t.attributes.id,i=t.attributes.emoji;console.warn("SET_EMOJI",n,i),e(g(n,{emoji:i}))})),n.addCommandListener("SET_GLOBAL_UID",(function(t){var n=t.attributes.conference_id,i=t.attributes.globalUID;console.warn("SET_GLOBAL_UID",n,i,t.attributes),e(g(n,{globalUID:i}))})),n.on(a,(function(t,n,i){console.warn("MESSAGE_RECEIVED",t,n,i);var o=null;try{o=JSON.parse(n)}catch(r){return}var a,c=p("GLOBAL_UID");o.from_me=o.globalUID===c,o.to_me=o.recipient===c,(o.from_me||o.to_me||"public"===o.recipient)&&e((a=Object(f.a)(Object(f.a)({},o),{},{ts:i?new Date(Date.parse(i)):new Date}),function(e){"".concat(a.id,"-").concat((new Date).getTime()),e({type:"PUSH_MESSAGE",payload:{msg:a}})}))})),n.on(c,R(e)),n.on(r,P(e)),n.on(s,V(e)),n.on(u,x(e)),n.on(l,H(e)),n.addCommandListener("JOIN_MINI_CONFERENCE",K(e)),n.addCommandListener("LEAVE_MINI_CONFERENCE",G(e)),window.JitsiConference=n,e(_(t)),n.join()}},R=function(e){return function(){console.warn("onConferenceJoined");var t=window.JitsiConference.myUserId(),n=p("DISPLAY_NAME","anonymous"),i=p("EMOJI","\ud83d\ude37"),o=p("GLOBAL_UID",function(e){for(var t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n="",i=e;i>0;--i)n+=t[Math.floor(Math.random()*t.length)];return n}(16));e(O({id:t,globalUID:o,isLocal:!0,displayName:n,emoji:i,activeRoom:"MAIN"})),q(t,n),W(i),Y(o);var a={devices:["video","audio"],cameraDeviceId:p("video_device_id",null),micDeviceId:p("audio_device_id",null),constraints:{height:180,width:180}};console.error("will run createLocalTracks"),window.JitsiMeetJS.createLocalTracks(a).then(U(e)).catch((function(e){throw e}))}},U=function(e){return function(t){console.error("onLocalTracks",t),window.JitsiMeetJS.mediaDevices.isDeviceListAvailable()&&window.JitsiMeetJS.mediaDevices.enumerateDevices((function(t){var n=s.a.filter(t,(function(e){return"audioinput"===e.kind})),i=s.a.filter(t,(function(e){return"videoinput"===e.kind}));e(function(e,t){return{type:"SET_AVAILABLE_INPUT_DEVICES",payload:{audio_inputs:e,video_inputs:t}}}(n,i))})),s.a.map(t,(function(t){var n,i;(window.localStorage.setItem("".concat(t.getType(),"_device_id"),t.getDeviceId()),e((n=t.getType(),i=t.getDeviceId(),{type:"SET_INPUT_DEVICE",payload:{type:n,id:i}})),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,F(e)),window.JitsiConference.setSenderVideoConstraint(180),"video"===t.getType())?"true"===p("SHOW_VIDEO","false")?(console.warn("unmuting video"),t.unmute()):t.mute():t.mute().then((function(){console.warn("audio muted...")}));window.JitsiConference.addTrack(t).then((function(){var n;e(g(window.JitsiConference.myUserId(),(n={hasTracks:!0},Object(m.a)(n,"muted_".concat(t.getType()),t.isMuted()),Object(m.a)(n,"has_".concat(t.getType()),!0),n))),window.setTimeout((function(){window.JitsiConference.setSenderVideoConstraint(180)}),1e3)}))})),e(g(window.JitsiConference.myUserId(),{hasTracks:!0}))}},P=function(e){return function(t){var n=window.JitsiConference.getParticipantById(t);console.warn("onUserJoined",n),e(O({id:t,activeRoom:"MAIN",displayName:n.getDisplayName()}))}},V=function(e){return function(t){if(t.isLocal())window.JitsiConference.setSenderVideoConstraint(180);else{console.warn("Remote TRACK_ADDED",t.getParticipantId(),t.isMuted(),t),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,F(e)),t.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,(function(){return console.warn("remote track stoped")})),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,(function(e){return console.warn("track audio output device was changed to ".concat(e))}));var n=t.getParticipantId();e(function(e,t,n){return{type:"ADD_REMOTE_USER_TRACK",payload:{userId:e,trackType:t,isMuted:n}}}(n,t.getType(),t.isMuted()))}}},x=function(e){return function(t){var n;console.warn("TRACK_REMOVED",t,t.containers);var i=t.getParticipantId();i||(i=window.JitsiConference.myUserId()),e(g(i,(n={},Object(m.a)(n,"has_".concat(t.getType()),!1),Object(m.a)(n,"muted_".concat(t.getType()),!0),n)))}},H=function(e){return function(t){e(function(e){return{type:"REMOVE_USER",payload:{userId:e}}}(t))}},K=function(e){return function(t){var n=t.attributes.from,i=t.attributes.to;if(console.warn("JOIN_MINI_CONFERENCE",n,i),n===window.JitsiConference.myUserId()){var o=v().audio;o&&o.unmute(),window.soundcloud&&window.soundcloud.setVolume(10)}e(g(n,{activeRoom:i}))}},G=function(e){return function(t){if(window.JitsiConference){var n=t.attributes.from;if(console.warn("LEAVE_MINI_CONFERENCE",n),n===window.JitsiConference.myUserId()){var i=v().audio;i&&i.mute(),window.soundcloud.setVolume(100)}e(g(n,{activeRoom:"MAIN"}))}}},B=function(){var e=v().video;e&&(e.isMuted()?(e.unmute(),window.localStorage.setItem("SHOW_VIDEO","true")):(e.mute(),window.localStorage.setItem("SHOW_VIDEO","false")))},F=function(e){return function(t){if(console.warn("TRACK_MUTE_CHANGED",t),t){var n=t.ownerEndpointId?t.ownerEndpointId:window.JitsiConference.myUserId();e(g(n,Object(m.a)({},"muted_".concat(t.getType()),t.isMuted())))}}},q=function(e,t){window.JitsiConference&&(console.warn("setLocalDisplayName"),window.JitsiConference.setDisplayName(t),window.localStorage.setItem("DISPLAY_NAME",t),window.JitsiConference.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,e,t))},W=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_EMOJI",{attributes:{id:window.JitsiConference.myUserId(),emoji:e}}),window.localStorage.setItem("EMOJI",e))},Y=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_GLOBAL_UID",{attributes:{globalUID:e,conference_id:window.JitsiConference.myUserId()}}),window.localStorage.setItem("GLOBAL_UID",e))},X=function(e){z("public","public",e)},z=function(e,t,n){if(window.JitsiConference){console.error("sendPrivate",e,t,n);var i=p("DISPLAY_NAME","anonymous"),o=p("EMOJI","\ud83d\ude37"),a={globalUID:p("GLOBAL_UID"),displayName:i,targetDisplayName:t,emoji:o,recipient:e,text:n};window.JitsiConference.sendMessage(JSON.stringify(a))}},Q=function(){window.JitsiConference&&(s.a.each(window.JitsiConference.getLocalTracks(),(function(e){return e.dispose()})),window.JitsiConference.leave(),window.connection.disconnect())},Z={id:"player-soundtrack",containerClassName:"player-soundtrack",videoId:"T92xtvU4WRc",options:{videoId:"T92xtvU4WRc",playlist:"QtXx3Qubmys",width:1,height:1,playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:1,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,start:100}},onReady:function(e){e.target.setVolume(100),e.target.playVideo()}},$=[{run_time:64,player:{id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"3V9bPvna3nM",options:{videoId:"3V9bPvna3nM",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"m6cy9PqMgIk"}}}},{run_time:63,player:{id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"YlUgvW4tUW4",options:{videoId:"YlUgvW4tUW4",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"m6cy9PqMgIk"}}}},{run_time:67,player:{id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"m6cy9PqMgIk",options:{videoId:"m6cy9PqMgIk",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"m6cy9PqMgIk"}}}},{run_time:106,player:{id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"qlqglpBq7Ho",options:{videoId:"qlqglpBq7Ho",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"m6cy9PqMgIk"}}}}],ee=function(){for(var e=0,t=0;t<$.length;t++)e+=$[t].run_time;return e}(),te=function(){for(var e=Math.round((new Date).getTime()/1e3)-1590157170,t=0,n=e-Math.floor(e/ee)*ee,i=0;i<$.length;i++){if(n<$[i].run_time){t=i;break}n-=$[i].run_time}return{index:t,seek:n}},ne=n(5),ie=(n(53),function(e,t){var n=function(n){e.current&&!e.current.contains(n.target)&&t(n)};Object(i.useEffect)((function(){return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}))}),oe=function(e){var t=e.children,n=e.className,a=e.onOutsideClick,c=Object(i.useRef)(null);return ie(c,a),o.a.createElement("div",{className:l()("popup",n),ref:c},t)},ae=function(e){var t=e.children,n=e.refreshKey,o=e.ttl,a=void 0===o?-1:o,c=e.hidden,r=Object(i.useState)(null),s=Object(ne.a)(r,2),u=s[0],l=s[1],d=Object(i.useState)(!0),m=Object(ne.a)(d,2),f=m[0],E=m[1];return Object(i.useEffect)((function(){l(c)}),[]),Object(i.useEffect)((function(){if(a>-1){E(!0);var e=setTimeout((function(){E(!1)}),a);return function(){return clearTimeout(e)}}}),[n]),f&&!c&&!u&&t},ce=n(34),re=(n(54),function(e){var t=e.onSelection,n=Object(d.c)(I),i=function(e){return function(i){i.stopPropagation(),e!==n.emoji&&(W(e),t&&t(e))}};return o.a.createElement("div",{className:"emoji-selection"},s.a.map(ce,(function(e,t){return o.a.createElement("div",{key:"emoji-".concat(t),onClick:i(e),className:l()("emoji-item",{selected:e===n.emoji})},e)})))}),se=(n(55),function(e){var t=e.children,n=e.className;return o.a.createElement("div",{className:l()("bubble-wrapper",n),onClick:function(e){return e.stopPropagation()}},o.a.createElement("div",{className:"speech-bubble"},t))}),ue=n(35),le=n.n(ue),de=(n(57),function(e){var t=e.className,n=e.submit,a=e.dismiss,c=Object(i.useRef)(),r=Object(i.useRef)("");Object(i.useEffect)((function(){c&&c.current.focus()}),[c]);return o.a.createElement(le.a,{innerRef:c,html:r.current,className:l()("text-input",t),onChange:function(e){return r.current=e.target.value},onKeyPress:function(e){var t;s.a.isEmpty(r.current)||13===e.charCode&&(e.preventDefault(),n&&n((t=r.current,(new DOMParser).parseFromString(t,"text/html").body.textContent||"")),a&&a())},onKeyDown:function(e){27===e.keyCode&&a&&a()}})}),me=(n(58),n(59),function(e){var t=e.displayName,n=e.targetDisplayName,i=e.from_me,a=e.to_me,c=e.text,r=e.emoji,s=e.ts,u=e.recipient,d="public"!==u,m=l()("text-message",{from_me:i,to_me:a});return d?o.a.createElement("div",{className:l()(m,"private")},o.a.createElement("span",{className:"text"},c)):o.a.createElement("div",{className:l()(m,"public")},o.a.createElement("span",{className:"emoji"},r),o.a.createElement("span",{className:"nick from"},function(e){return a&&"public"!==u?"Private from ".concat(e):e}(t)),o.a.createElement("span",{className:"nick to"},function(e){return i&&"public"!==u?"Private to ".concat(e):e}(n)),o.a.createElement("span",{className:"msg-date"},"(",function(e){var t=e.getHours().toString().padStart(2,0),n=e.getMinutes().toString().padStart(2,0);return"".concat(t,":").concat(n)}(s),") "),o.a.createElement("span",{className:"text"},c))}),fe=n(36),Ee=n.n(fe),pe=n(14),ve=function(e){var t=e.messagesSelector,n=e.maxHeight,i=void 0===n?-1:n,a=Object(d.c)(t),c={"background-color":"rgba(0, 0, 0, 0.7)",height:"100vh"};return i>-1&&(c.height=0===s.a.size(a)?0:i),o.a.createElement(Ee.a,{className:Object(pe.css)(c)},o.a.createElement("div",{className:"chat-drawer"},s.a.map(s.a.orderBy(a,"ts","asc"),(function(e){return o.a.createElement(me,{key:e.ts.toISOString().concat(e.globalUID),ts:e.ts,text:e.text,displayName:e.displayName,targetDisplayName:e.targetDisplayName,from_me:e.from_me,to_me:e.to_me,emoji:e.emoji,recipient:e.recipient})}))))},we=function(e){var t=e.recipient,n=e.maxDrawerHeight,a=Object(i.useState)(!1),c=Object(ne.a)(a,2),r=c[0],u=c[1],l=Object(d.c)(I);Object(i.useEffect)((function(){r&&u(!1)}),[r]);var m,f,E=t.globalUID,p=t.displayName;return o.a.createElement("div",{className:"chat"},o.a.createElement(ve,{messagesSelector:(m=E,f=l.globalUID,function(e){return s.a.filter(e.messages,(function(e){return e.globalUID===m&&e.recipient===f||e.globalUID===f&&e.recipient===m}))}),maxHeight:n}),!r&&o.a.createElement(de,{className:"chat-message",submit:function(e){z(E,p,e),u(!0)}}))},be=function(e){var t=e.message,n=Object(i.useState)(!1),a=Object(ne.a)(n,2),c=a[0],r=a[1];return!c&&o.a.createElement("div",{className:"chat message-preview",onClick:function(){return r(!0)}},o.a.createElement("div",{className:"chat-drawer"},o.a.createElement(me,t)))},_e=function(e,t){return e&&t.current&&e.attach(t.current)},ye=function(e,t){e&&t.current&&(e.detach(t.current),e.dispose())},Ne=function(e){var t,n=e.user,a=e.isAudioActive,c=n.id,r=n.globalUID,u=n.isLocal,f=n.has_audio,E=n.has_video,p=n.muted_audio,v=n.muted_video,b=n.displayName,_=n.emoji,y=n.isDominantSpeaker,N=Object(i.useRef)(null),O=Object(i.useRef)(null),g=Object(i.useState)(null),C=Object(ne.a)(g,2),S=C[0],h=C[1],D=Object(i.useState)(null),j=Object(ne.a)(D,2),A=j[0],J=j[1],k=Object(i.useState)(null),M=Object(ne.a)(k,2),T=M[0],L=M[1],R=Object(i.useState)(!1),U=Object(ne.a)(R,2),P=U[0],V=U[1],x=Object(d.c)(I),H=Object(d.c)(function(e,t){return function(t){return s.a.last(s.a.filter(t.messages,(function(t){var n=Math.abs((new Date-t.ts)/1e3);return t.globalUID===e&&"public"===t.recipient&&n<10})))}}(r,x.globalUID)),K=Object(d.c)(function(e,t){return function(n){return s.a.last(s.a.filter(n.messages,(function(n){var i=Math.abs((new Date-n.ts)/1e3);return n.recipient===t&&n.globalUID===e&&i<10})))}}(r,x.globalUID));Object(i.useEffect)((function(){if(console.warn("useEffect",E,N),E){var e=w(c,u).video;_e(e,N),h(e)}return function(){E&&ye(S,N)}}),[E,N]),Object(i.useEffect)((function(){if(f){var e=w(c,u).audio;_e(e,O),J(e)}return function(){f&&ye(A,O)}}),[f,O]);var G=function(e){var t=e.className,n=e.placeholder,i=e.submit,a=e.onHeightChange;return o.a.createElement(se,{className:t},o.a.createElement(de,{placeholder:n,submit:i,onHeightChange:a,dismiss:B}))},B=function(){L(null),V(!1)},F=l()("user-display video person",(t={video_self:u,remote_participant:!u,no_video:!E||v,no_audio:!f||p,muted:!a&&!u,dominant:y,local_muted:!a&&u},Object(m.a)(t,"id_".concat(c),!0),Object(m.a)(t,"globalUID_".concat(r),!0),t)),W=!s.a.isNil(T);return o.a.createElement("div",{className:F,onClick:function(e){e.stopPropagation(),u?L(G({placeholder:"Say something",submit:X})):(V(!0),L(o.a.createElement(we,{recipient:n,maxDrawerHeight:180})))}},o.a.createElement("div",{className:"emoji",onClick:function(e){e.stopPropagation(),console.error(e.key),e.shiftKey?console.warn("emoji shift+click"):u&&L(o.a.createElement(re,{onSelection:B}))}},_),f&&!p&&o.a.createElement("div",{className:"emoji mic"},"\ud83c\udfa4"),o.a.createElement("div",{className:"id",onClick:function(e){e.stopPropagation(),u&&L(G({className:"centered no-pointer",placeholder:"Choose name",submit:function(e){return q(c,e)}}))}},b),H&&o.a.createElement(ae,{ttl:7e3,refreshKey:H.ts,hidden:W},o.a.createElement(se,{className:l()({to_me:H.to_me})},H.text)),K&&o.a.createElement(ae,{ttl:3e3,refreshKey:K.ts,hidden:P},o.a.createElement(be,{message:K})),o.a.createElement("div",{className:"in"}),E&&o.a.createElement("video",{autoPlay:"1",ref:N}),f&&o.a.createElement("audio",{muted:u||!a,autoPlay:"1",ref:O}),W&&o.a.createElement(oe,{onOutsideClick:B},T))},Oe=function(e){var t=e.users,n=e.isAudioActive,a=Object(i.useCallback)((function(e){return o.a.createElement(Ne,{key:"user-display-".concat(e.id),user:e,isAudioActive:n})}),[t]);return o.a.createElement("div",{className:"users-display"},s.a.map(s.a.orderBy(t,"id"),a))},ge=(n(102),function(e){var t=e.name,n=e.maxSeats,a=e.userInside,c=Object(d.c)(C(t)),r=n-s.a.size(c),u=Object(d.c)(I).activeRoom===t,m=function(){!u&&function(e){var t=window.JitsiConference;if(t){var n=t.myUserId();t.sendCommand("JOIN_MINI_CONFERENCE",{attributes:{from:n,to:e}})}}(t)},f=Object(i.useCallback)((function(e){return o.a.createElement(Ne,{key:"user-display-".concat(e.id),user:e,isAudioActive:u})}),[c]),E=l()("side-room",{inside:a});return o.a.createElement("div",{className:E,onClick:function(e){return e.stopPropagation()}},o.a.createElement("div",null,a?"he":"no"),o.a.createElement("div",{className:"bg"}),s.a.map(s.a.orderBy(c,"id"),(function(e){return o.a.createElement("div",{className:"seat"},f(e))})),s.a.map(Array(r),(function(e,t){return o.a.createElement("div",{key:"empty-seat-".concat(t),className:"seat"},o.a.createElement("div",{className:l()("user-display free-seat"),onClick:m},o.a.createElement("div",{className:"id"},"Speak up"),o.a.createElement("div",{className:"in"})))})))}),Ie=n(19),Ce=n(18),Se=function(e){var t=e.volume,n=Object(Ie.a)(e,["volume"]),a=Object(i.useState)(null),c=Object(ne.a)(a,2),r=c[0],s=c[1];Object(i.useEffect)((function(){r&&r.setVolume(t)}),[t]);return o.a.createElement(Ce.a,Object.assign({},n,{onReady:function(e){s(e.target),n.onReady&&n.onReady(e)},onEnd:function(e){s(e.target),n.onEnd&&n.onEnd(e)}}))},he=function(e){var t=e.volume,n=Object(Ie.a)(e,["volume"]),a=Object(i.useState)(null),c=Object(ne.a)(a,2),r=c[0],s=c[1],u=Object(i.useState)(te().index),l=Object(ne.a)(u,2),d=l[0],m=l[1];Object(i.useEffect)((function(){r&&r.setVolume(t)}),[t]),Object(i.useEffect)((function(){r&&r.playVideo()}),[d]);return o.a.createElement(Ce.a,Object.assign({},n[d].player,{onReady:function(e){var t=0,n=0;if(!r){console.error("NO PLAYER");var i=te();t=i.seek,n=i.index,s(e.target)}m(n),e.target.seekTo(t),e.target.playVideo()},onEnd:function(e){console.error("videoArtIndex before ",d),console.error("videoArtIndex",d),n[d].player.onEnd&&n[d].player.onEnd(e),m(d+1===$.length?0:d+1)}}))},De=(n(115),function(e){var t=e.roomName,n=e.withVideoArt,i=Object(d.c)((function(e){return e.room})),a=Object(d.c)(C("MAIN")),c=Object(d.c)(I);if(s.a.isEmpty(c))return null;var r="MAIN"===c.activeRoom;return o.a.createElement("div",{className:l()("room",s.a.toLower(t))},o.a.createElement("div",{className:"bg"}),n&&o.a.createElement("div",{className:"video-art-top"},o.a.createElement("div",{className:"big-video-container"},o.a.createElement(he,$))),o.a.createElement("div",{className:"main-area",onClick:function(){!r&&function(e){var t=window.JitsiConference;t&&(t.removeCommand("JOIN_MINI_CONFERENCE"),t.sendCommandOnce("LEAVE_MINI_CONFERENCE",{attributes:{from:t.myUserId(),to:e}}))}(c.activeRoom)}},s.a.map(i.sideRooms,(function(e,t){return o.a.createElement(ge,Object.assign({userInside:!r,key:"side-room-".concat(t)},e))})),o.a.createElement(Oe,{users:a,roomName:"MAIN"}),o.a.createElement("div",{className:"right-sidebar"},o.a.createElement(ve,{messagesSelector:j}))))}),je=(n(116),n(117),function(e){var t=e.input,n=e.type,i=e.local_input_id,a=Object(d.b)(),c=l()("input",{is_active:i===t.deviceId});return o.a.createElement("div",{onClick:function(e,t){return function(){return a(function(e,t){return function(n){if(window.JitsiMeetJS.mediaDevices.isDeviceChangeAvailable(e)){var i=null;i="audio"===e?window.JitsiConference.getLocalAudioTrack():window.JitsiConference.getLocalVideoTrack(),console.error("switchInput",i),window.JitsiConference.removeTrack(i).then((function(){i&&i.dispose();var o={devices:[e]};"audio"===e?o.micDeviceId=t:(o.cameraDeviceId=t,o.constraints={height:180,width:180}),window.JitsiMeetJS.createLocalTracks(o).then(U(n)).catch((function(e){throw e}))}))}else console.error("no isDeviceChangeAvailable()")}}(e,t))}}(n,t.deviceId),className:c},t.label)}),Ae=function(){var e=Object(d.c)(k),t=e.audio_inputs,n=e.video_inputs,i=e.video_input_id,a=e.audio_input_id;return o.a.createElement("div",{className:"options-selector"},o.a.createElement("div",{className:"header"},"Audio inputs"),s.a.map(t,(function(e){return o.a.createElement(je,{input:e,type:"audio",local_input_id:a})})),o.a.createElement("div",{className:"header"},"Video inputs"),s.a.map(n,(function(e){return o.a.createElement(je,{input:e,type:"video",local_input_id:i})})))},Je=function(e){var t=e.roomName,n=Object(d.b)(),a=Object(i.useState)(!1),c=Object(ne.a)(a,2),r=c[0],s=c[1],u=function(e){return function(){n(function(e){return function(t){window.JitsiConference&&window.JitsiConference.leave().then((function(){window.soundcloud&&window.soundcloud.setVolume(100),t({type:"DELETE_ALL_MESSAGES"}),L(t,e)}))}}(e))}},m=function(e){return o.a.createElement("div",{className:l()("button button-to-".concat(e)),onClick:u(b[e])})};return o.a.createElement("div",{className:"bottom-nav"},"block"!==t&&m("block"),"toilet"!==t&&m("toilet"),o.a.createElement("div",{className:"button mute-toggle",onClick:B}),o.a.createElement("div",{className:"button fullscreen-toggle",onClick:function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}}),o.a.createElement("div",{className:"button button-options",onClick:function(e){e.stopPropagation(),s(!0)}}),r&&o.a.createElement(oe,{onOutsideClick:function(){return s(!1)}},o.a.createElement(Ae,null)))};var ke=function(){var e=Object(d.c)(y).roomName,t=Object(d.c)(I),n=t&&"MAIN"===t.activeRoom?100:40;return o.a.createElement("div",{className:"app"},o.a.createElement(De,{roomName:e,withVideoArt:"block"===e}),o.a.createElement(Je,{roomName:e}),J.b&&o.a.createElement(Se,Object.assign({},Z,{volume:n})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Me,Te=n(10),Le=n(39),Re=n.n(Le),Ue=n(40),Pe=Object(Te.c)({users:h,room:N,messages:A,devices:M}),Ve=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Te.d,xe=Object(Te.e)(Pe,Ve(Object(Te.a)(Re.a,Ue.a)));window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR),xe.dispatch(function(){var e=new URLSearchParams(window.location.search).get("room");return e||(e=p("ROOM_NAME")),e||(e="block"),_(b[e])}()),Me=xe,console.warn("initJitsi"),window.JitsiMeetJS.init(J.a),T(Me),setInterval((function(){if(window.JitsiConference){var e=window.JitsiConference.getParticipants();s.a.forEach(e,(function(e){"interrupted"===e._connectionStatus&&(console.warn("Kicking participant because of interrupted connection",e._id),window.JitsiConference.kickParticipant(e._id))}))}}),5e3),window.addEventListener("beforeunload",Q),window.addEventListener("unload",Q),c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(d.a,{store:xe},o.a.createElement(ke,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},34:function(e){e.exports=JSON.parse('["\ud83d\ude01","\ud83e\udd2f","\ud83e\udd23","\ud83e\udd29","\ud83d\ude37","\ud83d\udc4f","\ud83d\ude4f","\ud83e\udd18","\ud83d\udc43","\ud83d\udc45","\ud83d\udc40","\ud83d\udd14","\ud83d\udc7d","\ud83d\udc7b","\ud83d\udc79"]')},42:function(e,t,n){e.exports=n(118)},47:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){}},[[42,1,2]]]);
//# sourceMappingURL=main.3d3dee40.chunk.js.map