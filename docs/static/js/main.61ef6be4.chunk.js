(this.webpackJsonpbaduk=this.webpackJsonpbaduk||[]).push([[0],{19:function(e){e.exports=JSON.parse('["\ud83d\ude01","\ud83e\udd2f","\ud83e\udd23","\ud83e\udd29","\ud83d\ude37","\ud83d\udc4f","\ud83d\ude4f","\ud83e\udd18","\ud83d\udc43","\ud83d\udc45","\ud83d\udc40","\ud83d\udd14","\ud83d\udc7d","\ud83d\udc7b","\ud83d\udc79"]')},29:function(e,t,n){e.exports=n(62)},34:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),a=n(11),r=n.n(a),c=(n(34),n(1)),s=n.n(c),u=n(4),l=n.n(u),d=n(2),m={id:"player-soundtrack",containerClassName:"player-soundtrack",videoId:"T92xtvU4WRc",options:{videoId:"T92xtvU4WRc",playlist:"QtXx3Qubmys",width:1,height:1,playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:1,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,start:100}},onReady:function(e){e.target.setVolume(100),e.target.playVideo()}},f={id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"3V9bPvna3nM",options:{videoId:"3V9bPvna3nM",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"3V9bPvna3nM"}},onReady:function(e){e.target.playVideo()},onEnd:function(e){console.error("onEnd"),e.target.seekTo(0)}},E=n(5),w=n(6),v=function(e,t){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,o=arguments.length>1?arguments[1]:void 0;return e[o.type]?e[o.type](n,o):n}},p=function(e,t){var n=window.localStorage.getItem(e);return n&&"null"!==n?n:t},b=function(){return window.JitsiConference?{audio:window.JitsiConference.getLocalAudioTrack(),video:window.JitsiConference.getLocalVideoTrack()}:{}},N=function(e,t){if(t)return b();var n=window.JitsiConference.getParticipantById(e).getTracks();return{audio:s.a.find(n,(function(e){return"audio"===e.getType()})),video:s.a.find(n,(function(e){return"video"===e.getType()}))}},_={block:{roomName:"block",jitsiRoomName:"block_demo_block",sideRooms:[]},toilet:{roomName:"toilet",jitsiRoomName:"block_demo_toiletsss",sideRooms:[{name:"second_room",maxSeats:5}]}},O=function(e){return window.localStorage.setItem("ROOM_NAME",e.roomName),{type:"SET_ROOM",payload:{room:e}}},C=function(e){return e.room},g=v({SET_ROOM:function(e,t){return t.payload.room}},{}),y=function(e){return{type:"ADD_USER",payload:{user:e}}},I=function(e,t){return{type:"UPDATE_USER",payload:{userId:e,update:t}}},S=function(e){return s.a.find(e.users,{isLocal:!0})},D=function(e){return function(t){return s.a.filter(t.users,(function(t){return t.activeRoom===e}))}},A=function(e,t,n){return Object(w.a)(Object(w.a)({},e),{},Object(E.a)({},t.id,Object(w.a)(Object(w.a)({},t),n)))},J=v({ADD_USER:function(e,t){var n=t.payload.user;return Object(w.a)(Object(w.a)({},e),{},Object(E.a)({},n.id,n))},REMOVE_USER:function(e,t){var n=t.payload.userId;return s.a.omit(e,n)},UPDATE_USER:function(e,t){var n=t.payload,o=n.userId,i=n.update,a=e[o]||{};return A(e,a,i)},ADD_REMOTE_USER_TRACK:function(e,t){var n,o=t.payload,i=o.userId,a=o.trackType,r=o.isMuted,c=e[i]||{},s=(n={},Object(E.a)(n,"has_".concat(a),!0),Object(E.a)(n,"muted_".concat(a),r),n);return A(e,c,s)},UPDATE_DOMINANT_SPEAKER:function(e,t){var n=t.payload.userId;return console.warn("UPDATE_DOMINANT_SPEAKER",t),s.a.forEach(e,(function(e){e.isDominantSpeaker=e.id===n})),e}},{}),h=n(27),j=function(e){return e.messages},M=v({PUSH_MESSAGE:function(e,t){return[].concat(Object(h.a)(e),[t.payload.msg])},DELETE_ALL_MESSAGES:function(e,t){return[]},DELETE_MESSAGE:function(e,t){return s.a.filter(e,(function(e){return e.key!==t.payload.key}))}},[]),R=n(9),k=function(e){var t=e.dispatch,n=e.getState,o=window.JitsiMeetJS.events.connection,i=o.CONNECTION_ESTABLISHED,a=o.CONNECTION_FAILED,r=o.CONNECTION_DISCONNECTED;window.JitsiConnection=new window.JitsiMeetJS.JitsiConnection(null,null,R.a);var c=function(){console.warn("onConnectionSuccess");var e=C(n());T(t,e)},s=function(e){console.error("Connection Failed!",e)};window.JitsiConnection.addEventListener(i,c),window.JitsiConnection.addEventListener(a,s),window.JitsiConnection.addEventListener(r,(function e(){window.JitsiConnection.removeEventListener(i,c),window.JitsiConnection.removeEventListener(a,s),window.JitsiConnection.removeEventListener(r,e)})),window.JitsiConnection.connect(void 0)},T=function(e,t){if(window.JitsiConnection){console.warn("roomConfig="+JSON.stringify(t));var n=window.JitsiConnection.initJitsiConference(t.jitsiRoomName,R.a),o=window.JitsiMeetJS.events.conference,i=o.DISPLAY_NAME_CHANGED,a=o.MESSAGE_RECEIVED,r=(o.PRIVATE_MESSAGE_RECEIVED,o.CONFERENCE_JOINED),c=o.USER_JOINED,s=o.TRACK_ADDED,u=o.TRACK_REMOVED,l=o.USER_LEFT,d=o.DOMINANT_SPEAKER_CHANGED;n.on(i,(function(t,n){e(I(t,{displayName:n}))})),n.on(d,(function(t){e({type:"UPDATE_DOMINANT_SPEAKER",payload:{userId:t}})})),n.addCommandListener("SET_EMOJI",(function(t){var n=t.attributes.id,o=t.attributes.emoji;console.warn("SET_EMOJI",n,o),e(I(n,{emoji:o}))})),n.addCommandListener("SET_GLOBAL_UID",(function(t){var n=t.attributes.conference_id,o=t.attributes.globalUID;console.warn("SET_GLOBAL_UID",n,o,t.attributes),e(I(n,{globalUID:o}))})),n.on(a,(function(t,n,o){console.warn("MESSAGE_RECEIVED",t,n,o);var i=null;try{i=JSON.parse(n)}catch(c){return}var a,r=p("GLOBAL_UID");i.from_me=i.globalUID===r,i.to_me=i.recipient===r,(i.from_me||i.to_me||"public"===i.recipient)&&e((a=Object(w.a)(Object(w.a)({},i),{},{ts:o?new Date(Date.parse(o)):new Date}),function(e){"".concat(a.id,"-").concat((new Date).getTime()),e({type:"PUSH_MESSAGE",payload:{msg:a}})}))})),n.on(r,L(e)),n.on(c,P(e)),n.on(s,V(e)),n.on(u,K(e)),n.on(l,G(e)),n.addCommandListener("JOIN_MINI_CONFERENCE",x(e)),n.addCommandListener("LEAVE_MINI_CONFERENCE",B(e)),window.JitsiConference=n,e(O(t)),n.join()}},L=function(e){return function(){console.warn("onConferenceJoined");var t=window.JitsiConference.myUserId(),n=p("DISPLAY_NAME","anonymous"),o=p("EMOJI","\ud83d\ude37"),i=p("GLOBAL_UID",function(e){for(var t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n="",o=e;o>0;--o)n+=t[Math.floor(Math.random()*t.length)];return n}(16));e(y({id:t,globalUID:i,isLocal:!0,displayName:n,emoji:o,activeRoom:"MAIN"})),W(t,n),Y(o),X(i);var a={devices:["video","audio"],cameraDeviceId:p("video_device_id",null),micDeviceId:p("audio_device_id",null),constraints:{height:180,width:180}};console.error("will run createLocalTracks"),window.JitsiMeetJS.createLocalTracks(a).then(U(e)).catch((function(e){throw e}))}},U=function(e){return function(t){console.error("onLocalTracks",t),s.a.map(t,(function(t){(window.localStorage.setItem("".concat(t.getType(),"_device_id"),t.getDeviceId()),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,F(e)),window.JitsiConference.setSenderVideoConstraint(180),"video"===t.getType())?"true"===p("SHOW_VIDEO","false")?(console.warn("unmuting video"),t.unmute()):t.mute():t.mute().then((function(){console.warn("audio muted...")}));window.JitsiConference.addTrack(t).then((function(){var n;console.warn("FOO",t),e(I(window.JitsiConference.myUserId(),(n={hasTracks:!0},Object(E.a)(n,"muted_".concat(t.getType()),t.isMuted()),Object(E.a)(n,"has_".concat(t.getType()),!0),n))),window.setTimeout((function(){window.JitsiConference.setSenderVideoConstraint(180)}),1e3)}))})),e(I(window.JitsiConference.myUserId(),{hasTracks:!0}))}},P=function(e){return function(t){var n=window.JitsiConference.getParticipantById(t);console.warn("onUserJoined",n),e(y({id:t,activeRoom:"MAIN",displayName:n.getDisplayName()}))}},V=function(e){return function(t){if(t.isLocal())window.JitsiConference.setSenderVideoConstraint(180);else{console.warn("Remote TRACK_ADDED",t.getParticipantId(),t.isMuted(),t),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,F(e)),t.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,(function(){return console.warn("remote track stoped")})),t.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,(function(e){return console.warn("track audio output device was changed to ".concat(e))}));var n=t.getParticipantId();e(function(e,t,n){return{type:"ADD_REMOTE_USER_TRACK",payload:{userId:e,trackType:t,isMuted:n}}}(n,t.getType(),t.isMuted()))}}},K=function(e){return function(e){e.isLocal()||console.warn("Remote TRACK_REMOVED",e,e.containers)}},G=function(e){return function(t){e(function(e){return{type:"REMOVE_USER",payload:{userId:e}}}(t))}},x=function(e){return function(t){var n=t.attributes.from,o=t.attributes.to;if(console.warn("JOIN_MINI_CONFERENCE",n,o),n===window.JitsiConference.myUserId()){var i=b().audio;i&&i.unmute()}e(I(n,{activeRoom:o}))}},B=function(e){return function(t){if(window.JitsiConference){var n=t.attributes.from;if(console.warn("LEAVE_MINI_CONFERENCE",n),n===window.JitsiConference.myUserId()){var o=b().audio;o&&o.mute()}e(I(n,{activeRoom:"MAIN"}))}}},H=function(){var e=b().video;e&&(e.isMuted()?(e.unmute(),window.localStorage.setItem("SHOW_VIDEO","true")):(e.mute(),window.localStorage.setItem("SHOW_VIDEO","false")))},F=function(e){return function(t){if(console.warn("TRACK_MUTE_CHANGED",t),t){var n=t.ownerEndpointId?t.ownerEndpointId:window.JitsiConference.myUserId();e(I(n,Object(E.a)({},"muted_".concat(t.getType()),t.isMuted())))}}},W=function(e,t){window.JitsiConference&&(console.warn("setLocalDisplayName"),window.JitsiConference.setDisplayName(t),window.localStorage.setItem("DISPLAY_NAME",t),window.JitsiConference.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,e,t))},Y=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_EMOJI",{attributes:{id:window.JitsiConference.myUserId(),emoji:e}}),window.localStorage.setItem("EMOJI",e))},X=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_GLOBAL_UID",{attributes:{globalUID:e,conference_id:window.JitsiConference.myUserId()}}),window.localStorage.setItem("GLOBAL_UID",e))},Q=function(e){q("public","public",e)},q=function(e,t,n){if(window.JitsiConference){console.error("sendPrivate",e,t,n);var o=p("DISPLAY_NAME","anonymous"),i=p("EMOJI","\ud83d\ude37"),a={globalUID:p("GLOBAL_UID"),displayName:o,targetDisplayName:t,emoji:i,recipient:e,text:n};window.JitsiConference.sendMessage(JSON.stringify(a))}},z=function(){window.JitsiConference&&(s.a.each(window.JitsiConference.getLocalTracks(),(function(e){return e.dispose()})),window.JitsiConference.leave(),window.connection.disconnect())},Z=n(7),$=(n(40),function(e,t){var n=function(n){e.current&&!e.current.contains(n.target)&&t(n)};Object(o.useEffect)((function(){return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}))}),ee=function(e){var t=e.children,n=e.className,a=e.onOutsideClick,r=Object(o.useRef)(null);return $(r,a),i.a.createElement("div",{className:l()("popup",n),ref:r},t)},te=function(e){var t=e.children,n=e.refreshKey,i=e.ttl,a=void 0===i?-1:i,r=e.hidden,c=Object(o.useState)(!0),s=Object(Z.a)(c,2),u=s[0],l=s[1];return Object(o.useEffect)((function(){if(a>-1){l(!0);var e=setTimeout((function(){l(!1)}),a);return function(){return clearTimeout(e)}}}),[n]),u&&!r&&t},ne=n(19),oe=(n(41),function(e){var t=e.onSelection,n=Object(d.c)(S),o=function(e){return function(o){o.stopPropagation(),e!==n.emoji&&(Y(e),t&&t(e))}};return i.a.createElement("div",{className:"emoji-selection"},s.a.map(ne,(function(e,t){return i.a.createElement("div",{key:"emoji-".concat(t),onClick:o(e),className:l()("emoji-item",{selected:e===n.emoji})},e)})))}),ie=(n(42),function(e){var t=e.children,n=e.className;return i.a.createElement("div",{className:l()("bubble-wrapper",n),onClick:function(e){return e.stopPropagation()}},i.a.createElement("div",{className:"speech-bubble"},t))}),ae=n(20),re=n.n(ae),ce=(n(44),function(e){var t=e.submit,n=e.dismiss,a=Object(o.useRef)(),r=Object(o.useRef)("");Object(o.useEffect)((function(){a&&a.current.focus()}),[a]);return i.a.createElement(re.a,{innerRef:a,html:r.current,className:"text-input",onChange:function(e){return r.current=e.target.value},onKeyPress:function(e){s.a.isEmpty(r.current)||13===e.charCode&&(t&&t(r.current),n&&n())},onKeyDown:function(e){27===e.keyCode&&n&&n()}})}),se=function(e,t){return e&&t.current&&e.attach(t.current)},ue=function(e,t){e&&t.current&&(e.detach(t.current),e.dispose())},le=function(e){var t,n=e.id,a=e.globalUID,r=e.isLocal,c=e.has_audio,u=e.has_video,m=e.muted_audio,f=e.muted_video,w=e.displayName,v=e.emoji,p=e.isAudioActive,b=e.isDominantSpeaker,_=Object(o.useRef)(null),O=Object(o.useRef)(null),C=Object(o.useState)(null),g=Object(Z.a)(C,2),y=g[0],I=g[1],D=Object(o.useState)(null),A=Object(Z.a)(D,2),J=A[0],h=A[1],j=Object(o.useState)(null),M=Object(Z.a)(j,2),R=M[0],k=M[1],T=Object(d.c)(S),L=Object(d.c)(function(e,t){return function(n){return s.a.last(s.a.filter(n.messages,(function(n){var o=Math.abs((new Date-n.ts)/1e3);return n.globalUID===e&&("public"===n.recipient||n.recipient===t)&&o<10})))}}(a,T.globalUID)),U=Object(d.c)(function(e,t){return function(n){return s.a.last(s.a.filter(n.messages,(function(n){var o=Math.abs((new Date-n.ts)/1e3);return n.recipient===e&&n.globalUID===t&&o<10})))}}(a,T.globalUID));Object(o.useEffect)((function(){if(u){var e=N(n,r).video;se(e,_),I(e)}return function(){(c||u)&&ue(y,_)}}),[u,_]),Object(o.useEffect)((function(){if(c){var e=N(n,r).audio;se(e,O),h(e)}return function(){c&&ue(J,O)}}),[c,O]);var P=function(e){var t=e.className,n=e.placeholder,o=e.submit,a=e.onHeightChange;return i.a.createElement(ie,{className:t},i.a.createElement(ce,{placeholder:n,submit:o,onHeightChange:a,dismiss:V}))},V=function(){return k(null)},K=l()("user-display video person",(t={video_self:r,remote_participant:!r,no_video:!u||f,no_audio:!c||m,muted:!p&&!r,dominant:b,local_muted:!p&&r},Object(E.a)(t,"id_".concat(n),!0),Object(E.a)(t,"globalUID_".concat(a),!0),t)),G=!s.a.isNil(R);return i.a.createElement("div",{className:K,onClick:function(e){e.stopPropagation(),k(P(r?{placeholder:"Say something",submit:Q}:{className:"centered no-pointer",placeholder:"Say something to ".concat(w,":"),submit:function(e){return q(a,w,e)}}))}},i.a.createElement("div",{className:"emoji",onClick:function(e){e.stopPropagation(),console.error(e.key),e.shiftKey?console.warn("emoji shift+click"):r&&k(i.a.createElement(oe,{onSelection:V}))}},v),c&&!m&&i.a.createElement("div",{className:"emoji mic"},"\ud83c\udfa4"),i.a.createElement("div",{className:"id",onClick:function(e){e.stopPropagation(),r&&k(P({className:"centered no-pointer",placeholder:"Choose name",submit:function(e){return W(n,e)}}))}},w),L&&i.a.createElement(te,{ttl:7e3,refreshKey:L.ts,hidden:G},i.a.createElement(ie,{className:l()({to_me:L.to_me})},L.text)),U&&i.a.createElement(te,{ttl:7e3,refreshKey:U.ts,hidden:G},i.a.createElement(ie,{className:"centered no-pointer from_me"},U.text)),i.a.createElement("div",{className:"in"}),u&&i.a.createElement("video",{autoPlay:"1",ref:_}),c&&i.a.createElement("audio",{muted:r||!p,autoPlay:"1",ref:O}),G&&i.a.createElement(ee,{onOutsideClick:V},R))},de=function(e){var t=e.users,n=e.isAudioActive,a=Object(o.useCallback)((function(e){return i.a.createElement(le,Object.assign({key:"user-display-".concat(e.id)},e,{isAudioActive:n}))}),[t]);return i.a.createElement("div",{className:"users-display"},s.a.map(s.a.orderBy(t,"id"),a))},me=(n(45),function(e){var t=e.name,n=e.maxSeats,a=Object(d.c)(D(t)),r=n-s.a.size(a),c=Object(d.c)(S).activeRoom===t,u=function(){!c&&function(e){var t=window.JitsiConference;if(t){var n=t.myUserId();t.sendCommand("JOIN_MINI_CONFERENCE",{attributes:{from:n,to:e}})}}(t)},m=Object(o.useCallback)((function(e){return i.a.createElement(le,Object.assign({key:"user-display-".concat(e.id)},e,{isAudioActive:c}))}),[a]);return i.a.createElement("div",{className:"side-room",onClick:function(e){return e.stopPropagation()}},i.a.createElement("div",{className:"bg"}),s.a.map(s.a.orderBy(a,"id"),(function(e){return i.a.createElement("div",{className:"seat"},m(e))})),s.a.map(Array(r),(function(e,t){return i.a.createElement("div",{className:"seat"},i.a.createElement("div",{className:l()("user-display free-seat"),onClick:u},i.a.createElement("div",{className:"id"},"Speak up"),i.a.createElement("div",{className:"in"})))})))}),fe=n(28),Ee=n(21),we=function(e){var t=e.volume,n=Object(fe.a)(e,["volume"]),a=Object(o.useState)(null),r=Object(Z.a)(a,2),c=r[0],s=r[1];Object(o.useEffect)((function(){c&&c.setVolume(t)}),[t]);return i.a.createElement(Ee.a,Object.assign({},n,{onReady:function(e){s(e.target),n.onReady&&n.onReady(e)},onEnd:function(e){s(e.target),n.onEnd&&n.onEnd(e)}}))},ve=(n(58),n(24)),pe=(n(59),n(60),function(e){var t=e.displayName,n=e.targetDisplayName,o=e.from_me,a=e.to_me,r=e.text,c=e.emoji,s=e.ts,u=e.recipient,d=l()("text-message",{private:"public"!==u,public:"public"===u,from_me:o,to_me:a});return i.a.createElement("div",{className:d},i.a.createElement("span",{className:"emoji"},c),i.a.createElement("span",{className:"nick from"},function(e){return a&&"public"!==u?"Private from ".concat(e):e}(t)),i.a.createElement("span",{className:"nick to"},function(e){return o&&"public"!==u?"Private to ".concat(e):e}(n)),i.a.createElement("span",{className:"msg-date"},"(",function(e){var t=e.getHours().toString().padStart(2,0),n=e.getMinutes().toString().padStart(2,0);return"".concat(t,":").concat(n)}(s),") "),i.a.createElement("span",{className:"text"},r))}),be=function(e){Object(ve.a)(e);var t=Object(d.c)(j);return i.a.createElement("div",{className:"right-sidebar"},s.a.map(s.a.orderBy(t,"ts","desc"),(function(e){return i.a.createElement(pe,{key:e.ts,ts:e.ts,text:e.text,displayName:e.displayName,targetDisplayName:e.targetDisplayName,from_me:e.from_me,to_me:e.to_me,emoji:e.emoji,recipient:e.recipient})})))},Ne=function(e){var t=e.roomName,n=e.withVideoArt,o=Object(d.c)((function(e){return e.room})),a=Object(d.c)(D("MAIN")),r=Object(d.c)(S);if(s.a.isEmpty(r))return null;var c="MAIN"===r.activeRoom;return i.a.createElement("div",{className:l()("room",s.a.toLower(t))},i.a.createElement("div",{className:"bg"}),n&&i.a.createElement("div",{className:"video-art-top"},i.a.createElement("div",{className:"big-video-container"},i.a.createElement(we,f))),i.a.createElement("div",{className:"main-area",onClick:function(){!c&&function(e){var t=window.JitsiConference;t&&(t.removeCommand("JOIN_MINI_CONFERENCE"),t.sendCommandOnce("LEAVE_MINI_CONFERENCE",{attributes:{from:t.myUserId(),to:e}}))}(r.activeRoom)}},s.a.map(o.sideRooms,(function(e,t){return i.a.createElement(me,Object.assign({key:"side-room-".concat(t)},e))})),i.a.createElement(de,{users:a,roomName:"MAIN"}),i.a.createElement(be,null)))},_e=(n(61),function(e){var t=e.roomName,n=Object(d.b)(),o=function(e){return function(){return n(function(e){return function(t){window.JitsiConference&&window.JitsiConference.leave().then((function(){t({type:"DELETE_ALL_MESSAGES"}),T(t,e)}))}}(e))}};return i.a.createElement("div",{className:"bottom-nav"},"block"!==t&&i.a.createElement("div",{className:"button button-to-block",onClick:o(_.block)}),"toilet"!==t&&i.a.createElement("div",{className:"button button-to-toilet",onClick:o(_.toilet)}),i.a.createElement("div",{className:"button mute-toggle",onClick:H}),i.a.createElement("div",{className:"button fullscreen-toggle",onClick:function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}}))});var Oe=function(){var e=Object(d.c)(C).roomName,t=Object(d.c)(S),n=t&&"MAIN"===t.activeRoom?100:40;return i.a.createElement("div",{className:"app"},i.a.createElement(Ne,{roomName:e,withVideoArt:"block"===e}),i.a.createElement(_e,{roomName:e}),R.b&&i.a.createElement(we,Object.assign({},m,{volume:n})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ce,ge=n(8),ye=n(25),Ie=n.n(ye),Se=n(26),De=Object(ge.c)({users:J,room:g,messages:M}),Ae=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ge.d,Je=Object(ge.e)(De,Ae(Object(ge.a)(Ie.a,Se.a)));window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR),Je.dispatch(function(){var e=new URLSearchParams(window.location.search).get("room");return e||(e=p("ROOM_NAME")),e||(e="block"),O(_[e])}()),Ce=Je,console.warn("initJitsi"),window.JitsiMeetJS.init(R.a),k(Ce),setInterval((function(){if(window.JitsiConference){var e=window.JitsiConference.getParticipants();s.a.forEach(e,(function(e){"interrupted"===e._connectionStatus&&(console.warn("Kicking participant because of interrupted connection",e._id),window.JitsiConference.kickParticipant(e._id))}))}}),5e3),window.addEventListener("beforeunload",z),window.addEventListener("unload",z),r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(d.a,{store:Je},i.a.createElement(Oe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e){e.exports=JSON.parse('{"a":{"hosts":{"domain":"dror-testing.tlvengnetapp.com","focus":"focus.dror-testing.tlvengnetapp.com","muc":"conference.dror-testing.tlvengnetapp.com"},"bosh":"//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS","clientNode":"http://jitsi.org/jitsimeet","desktopSharingChromeDisabled":true,"openBridgeChannel":"datachannel","enableTalkWhileMuted":true,"enableNoAudioDetection":true,"enableNoisyMicDetection":true,"enableLipSync":false,"disableAudioLevels":false,"disableSimulcast":true,"p2p":{"enabled":false},"e2eping":{"pingInterval":-1},"useIPv6":false},"b":false}')}},[[29,1,2]]]);
//# sourceMappingURL=main.61ef6be4.chunk.js.map