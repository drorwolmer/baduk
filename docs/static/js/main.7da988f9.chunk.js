(this.webpackJsonpbaduk=this.webpackJsonpbaduk||[]).push([[0],{19:function(e){e.exports=JSON.parse('["\ud83d\ude01","\ud83e\udd2f","\ud83e\udd23","\ud83e\udd29","\ud83d\ude37","\ud83d\udc4f","\ud83d\ude4f","\ud83e\udd18","\ud83d\udc43","\ud83d\udc45","\ud83d\udc40","\ud83d\udd14","\ud83d\udc7d","\ud83d\udc7b","\ud83d\udc79"]')},28:function(e,n,t){e.exports=t(59)},33:function(e,n,t){},39:function(e,n,t){},40:function(e,n,t){},41:function(e,n,t){},42:function(e,n,t){},55:function(e,n,t){},56:function(e,n,t){},57:function(e,n,t){},58:function(e,n,t){},59:function(e,n,t){"use strict";t.r(n);var o=t(0),i=t.n(o),a=t(11),c=t.n(a),r=(t(33),t(1)),s=t.n(r),u=t(4),d=t.n(u),l=t(2),m={id:"player-soundtrack",containerClassName:"player-soundtrack",videoId:"T92xtvU4WRc",options:{videoId:"T92xtvU4WRc",playlist:"QtXx3Qubmys",width:1,height:1,playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:1,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,start:100}},onReady:function(e){e.target.setVolume(100),e.target.playVideo()}},f={id:"muteYouTubeVideoPlayer",containerClassName:"video-art-player",videoId:"3V9bPvna3nM",options:{videoId:"3V9bPvna3nM",playerVars:{autoplay:1,controls:0,showinfo:0,modestbranding:1,loop:1,fs:0,cc_load_policy:1,iv_load_policy:3,autohide:1,disablekb:1,playlist:"3V9bPvna3nM",origin:"https://foosa-a977b5f6.localhost.run"}},onReady:function(e){e.target.playVideo()}},E=t(5),w=function(e,n){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,o=arguments.length>1?arguments[1]:void 0;return e[o.type]?e[o.type](t,o):t}},v=function(e,n){var t=window.localStorage.getItem(e);return t&&"null"!==t?t:n},p=function(){return window.JitsiConference?{audio:window.JitsiConference.getLocalAudioTrack(),video:window.JitsiConference.getLocalVideoTrack()}:{}},C=function(e,n){if(n)return p();var t=window.JitsiConference.getParticipantById(e).getTracks();return{audio:s.a.find(t,(function(e){return"audio"===e.getType()})),video:s.a.find(t,(function(e){return"video"===e.getType()}))}},N={block:{roomName:"block",jitsiRoomName:"block_demo_block",sideRooms:[]},toilet:{roomName:"toilet",jitsiRoomName:"block_demo_toiletsss",sideRooms:[{name:"second_room",maxSeats:5}]}},b=window.location.href.indexOf("toilet")>-1?N.toilet:N.block,O=function(e){return e.room},_=w({SET_ROOM:function(e,n){return n.payload.room}},b),y=t(8),S=function(e){return{type:"ADD_USER",payload:{user:e}}},g=function(e,n){return{type:"UPDATE_USER",payload:{userId:e,update:n}}},I=function(e){return s.a.find(e.users,{isLocal:!0})},J=function(e){return function(n){return s.a.filter(n.users,(function(n){return n.activeRoom===e}))}},A=function(e,n,t){return Object(y.a)(Object(y.a)({},e),{},Object(E.a)({},n.id,Object(y.a)(Object(y.a)({},n),t)))},R=w({ADD_USER:function(e,n){var t=n.payload.user;return Object(y.a)(Object(y.a)({},e),{},Object(E.a)({},t.id,t))},REMOVE_USER:function(e,n){var t=n.payload.userId;return s.a.omit(e,t)},UPDATE_USER:function(e,n){var t=n.payload,o=t.userId,i=t.update,a=e[o]||{};return A(e,a,i)},ADD_REMOTE_USER_TRACK:function(e,n){var t,o=n.payload,i=o.userId,a=o.trackType,c=o.isMuted,r=e[i]||{},s=(t={},Object(E.a)(t,"has_".concat(a),!0),Object(E.a)(t,"muted_".concat(a),c),t);return A(e,r,s)},UPDATE_DOMINANT_SPEAKER:function(e,n){var t=n.payload.userId;return console.warn("UPDATE_DOMINANT_SPEAKER",n),s.a.forEach(e,(function(e){e.isDominantSpeaker=e.id===t})),e}},{}),M=t(26),T=function(e){return function(n){"".concat(e.id,"-").concat((new Date).getTime());n({type:"PUSH_MESSAGE",payload:{msg:e}})}},j=function(e){return e.messages},D=w({PUSH_MESSAGE:function(e,n){return[].concat(Object(M.a)(e),[n.payload.msg])},DELETE_MESSAGE:function(e,n){return s.a.filter(e,(function(e){return e.key!==n.payload.key}))}},[]),k=t(9),h=function(e){var n=e.dispatch,t=e.getState,o=window.JitsiMeetJS.events.connection,i=o.CONNECTION_ESTABLISHED,a=o.CONNECTION_FAILED,c=o.CONNECTION_DISCONNECTED;window.JitsiConnection=new window.JitsiMeetJS.JitsiConnection(null,null,k.a);var r=function(){console.warn("onConnectionSuccess");var e=O(t());L(n,e)},s=function(e){console.error("Connection Failed!",e)};window.JitsiConnection.addEventListener(i,r),window.JitsiConnection.addEventListener(a,s),window.JitsiConnection.addEventListener(c,(function e(){window.JitsiConnection.removeEventListener(i,r),window.JitsiConnection.removeEventListener(a,s),window.JitsiConnection.removeEventListener(c,e)})),window.JitsiConnection.connect(void 0)},L=function(e,n){if(window.JitsiConnection){console.warn("roomConfig="+JSON.stringify(n));var t=window.JitsiConnection.initJitsiConference(n.jitsiRoomName,k.a),o=window.JitsiMeetJS.events.conference,i=o.DISPLAY_NAME_CHANGED,a=o.MESSAGE_RECEIVED,c=o.PRIVATE_MESSAGE_RECEIVED,r=o.CONFERENCE_JOINED,s=o.USER_JOINED,u=o.TRACK_ADDED,d=o.TRACK_REMOVED,l=o.USER_LEFT,m=o.DOMINANT_SPEAKER_CHANGED;t.on(i,(function(n,t){e(g(n,{displayName:t}))})),t.on(m,(function(n){e({type:"UPDATE_DOMINANT_SPEAKER",payload:{userId:n}})})),t.addCommandListener("SET_EMOJI",(function(n){var t=n.attributes.id,o=n.attributes.emoji;console.warn("SET_EMOJI",t,o),e(g(t,{emoji:o}))})),t.on(a,(function(n,t,o){console.warn("MESSAGE_RECEIVED",n,t,o),e(T({id:n,text:t,ts:o?new Date(Date.parse(o)):new Date,recipient:"public"}))})),t.on(c,(function(n,t,o){console.warn("PRIVATE_MESSAGE_RECEIVED",n,t,o),e(T({id:n,text:t,ts:new Date,recipient:"me"}))})),t.on(r,P(e)),t.on(s,V(e)),t.on(u,x(e)),t.on(d,K(e)),t.on(l,F(e)),t.addCommandListener("JOIN_MINI_CONFERENCE",H(e)),t.addCommandListener("LEAVE_MINI_CONFERENCE",G(e)),window.JitsiConference=t,e({type:"SET_ROOM",payload:{room:n}}),t.join()}},P=function(e){return function(){console.warn("onConferenceJoined");var n=window.JitsiConference.myUserId(),t=v("DISPLAY_NAME","anonymous"),o=v("EMOJI","\ud83d\ude37");e(S({id:n,isLocal:!0,displayName:t,emoji:o,activeRoom:"MAIN"})),Y(n,t),X(o),window.JitsiMeetJS.createLocalTracks({devices:["audio","video"]}).then(U(e)).catch((function(e){throw e}))}},U=function(e){return function(n){s.a.map(n,(function(n){(n.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,W(e)),window.JitsiConference.setSenderVideoConstraint(180),"video"===n.getType())?"true"===v("SHOW_VIDEO","false")?(console.warn("unmuting video"),n.unmute()):n.mute():n.mute().then((function(){console.warn("audio muted...")}));window.JitsiConference.addTrack(n).then((function(){var t;console.warn("FOO",n),e(g(window.JitsiConference.myUserId(),(t={hasTracks:!0},Object(E.a)(t,"muted_".concat(n.getType()),n.isMuted()),Object(E.a)(t,"has_".concat(n.getType()),!0),t))),window.setTimeout((function(){window.JitsiConference.setSenderVideoConstraint(180)}),1e3)}))})),e(g(window.JitsiConference.myUserId(),{hasTracks:!0}))}},V=function(e){return function(n){var t=window.JitsiConference.getParticipantById(n);console.warn("onUserJoined",t),e(S({id:n,activeRoom:"MAIN",displayName:t.getDisplayName()}))}},x=function(e){return function(n){if(n.isLocal())window.JitsiConference.setSenderVideoConstraint(180);else{console.warn("Remote TRACK_ADDED",n.getParticipantId(),n.isMuted(),n),n.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,W),n.addEventListener(window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,(function(){return console.warn("remote track stoped")})),n.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,(function(e){return console.warn("track audio output device was changed to ".concat(e))}));var t=n.getParticipantId();e(function(e,n,t){return{type:"ADD_REMOTE_USER_TRACK",payload:{userId:e,trackType:n,isMuted:t}}}(t,n.getType(),n.isMuted()))}}},K=function(e){return function(e){e.isLocal()||console.warn("Remote TRACK_REMOVED",e,e.containers)}},F=function(e){return function(n){e(function(e){return{type:"REMOVE_USER",payload:{userId:e}}}(n))}},H=function(e){return function(n){var t=n.attributes.from,o=n.attributes.to;if(console.warn("JOIN_MINI_CONFERENCE",t,o),t===window.JitsiConference.myUserId()){var i=p().audio;i&&i.unmute()}e(g(t,{activeRoom:o}))}},G=function(e){return function(n){if(window.JitsiConference){var t=n.attributes.from;if(console.warn("LEAVE_MINI_CONFERENCE",t),t===window.JitsiConference.myUserId()){var o=p().audio;o&&o.mute()}e(g(t,{activeRoom:"MAIN"}))}}},B=function(){var e=p().video;e&&(e.isMuted()?(e.unmute(),window.localStorage.setItem("SHOW_VIDEO","true")):(e.mute(),window.localStorage.setItem("SHOW_VIDEO","false")))},W=function(e){return function(n){if(console.warn("TRACK_MUTE_CHANGED",n),n){var t=n.ownerEndpointId?n.ownerEndpointId:window.JitsiConference.myUserId();e(g(t,Object(E.a)({},"muted_".concat(n.getType()),n.isMuted())))}}},Y=function(e,n){window.JitsiConference&&(console.warn("setLocalDisplayName"),window.JitsiConference.setDisplayName(n),window.localStorage.setItem("DISPLAY_NAME",n),window.JitsiConference.eventEmitter.emit(window.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,e,n))},X=function(e){window.JitsiConference&&(window.JitsiConference.sendCommand("SET_EMOJI",{attributes:{id:window.JitsiConference.myUserId(),emoji:e}}),window.localStorage.setItem("EMOJI",e))},Q=function(){window.JitsiConference&&(s.a.each(window.JitsiConference.getLocalTracks(),(function(e){return e.dispose()})),window.JitsiConference.leave(),window.connection.disconnect())},q=t(6),z=(t(39),function(e,n){var t=function(t){e.current&&!e.current.contains(t.target)&&n(t)};Object(o.useEffect)((function(){return document.addEventListener("click",t),function(){document.removeEventListener("click",t)}}))}),$=function(e){var n=e.children,t=e.className,a=e.onOutsideClick,c=Object(o.useRef)(null);return z(c,a),i.a.createElement("div",{className:d()("popup",t),ref:c},n)},Z=function(e){var n=e.children,t=e.refreshKey,i=e.ttl,a=void 0===i?-1:i,c=Object(o.useState)(!0),r=Object(q.a)(c,2),s=r[0],u=r[1];return Object(o.useEffect)((function(){if(a>-1){u(!0);var e=setTimeout((function(){u(!1)}),a);return function(){return clearTimeout(e)}}}),[t]),s&&n},ee=t(19),ne=(t(40),function(e){var n=e.onSelection,t=Object(l.c)(I),o=function(e){return function(o){o.stopPropagation(),e!==t.emoji&&(X(e),n&&n(e))}};return i.a.createElement("div",{className:"emoji-selection"},s.a.map(ee,(function(e,n){return i.a.createElement("div",{key:"emoji-".concat(n),onClick:o(e),className:d()("emoji-item",{selected:e===t.emoji})},e)})))}),te=(t(41),function(e){var n=e.children;return i.a.createElement("div",{className:"bubble-wrapper"},i.a.createElement("div",{className:"speech-bubble"},n))}),oe=function(e,n){return e&&n.current&&e.attach(n.current)},ie=function(e,n){e&&n.current&&(e.detach(n.current),e.dispose())},ae=function(e){var n=e.id,t=e.isLocal,a=e.has_audio,c=e.has_video,r=e.muted_audio,u=e.muted_video,m=e.displayName,f=e.emoji,E=e.isAudioActive,w=e.isDominantSpeaker,v=Object(o.useRef)(null),p=Object(o.useRef)(null),N=Object(o.useState)(null),b=Object(q.a)(N,2),O=b[0],_=b[1],y=Object(o.useState)(null),S=Object(q.a)(y,2),g=S[0],I=S[1],J=Object(o.useState)(null),A=Object(q.a)(J,2),R=A[0],M=A[1],T=Object(l.c)(function(e){return function(n){return s.a.last(s.a.filter(n.messages,(function(n){return n.id===e&&"public"===n.recipient})))}}(n));Object(o.useEffect)((function(){if(c){var e=C(n,t).video;oe(e,v),_(e)}return function(){(a||c)&&ie(O,v)}}),[c,v]),Object(o.useEffect)((function(){if(a){var e=C(n,t).audio;oe(e,p),I(e)}return function(){a&&ie(g,p)}}),[a,p]);var j=function(){return M(null)},D=d()("user-display video person",{video_self:t,remote_participant:!t,no_video:!c||u,no_audio:!a||r,muted:!E&&!t,dominant:w,local_muted:!E&&t});return i.a.createElement("div",{className:D,onClick:function(e){if(e.stopPropagation(),t){var o=window.prompt("Say something:");o&&function(e){window.JitsiConference&&window.JitsiConference.sendMessage(e)}(o)}else{var i=window.prompt("Say something to ".concat(m,":"));i&&function(e,n){window.JitsiConference&&(console.warn("sendPrivateTextMessage to "+e),window.JitsiConference.sendPrivateTextMessage(e,n))}(n,i)}}},i.a.createElement("div",{className:"emoji",onClick:function(e){e.stopPropagation(),t&&M(i.a.createElement(ne,{onSelection:j}))}},f),i.a.createElement("div",{className:"id",onClick:function(e){if(e.stopPropagation(),t){var o=window.prompt("Display Name???");o&&Y(n,o)}}},m," ",n),T&&i.a.createElement(Z,{ttl:7e3,refreshKey:T.ts},i.a.createElement(te,null,T.text)),i.a.createElement("div",{className:"in"}),c&&i.a.createElement("video",{autoPlay:"1",ref:v}),a&&i.a.createElement("audio",{muted:t||!E,autoPlay:"1",ref:p}),!s.a.isNil(R)&&i.a.createElement($,{onOutsideClick:j},R))},ce=function(e){var n=e.users,t=e.isAudioActive,a=Object(o.useCallback)((function(e){return i.a.createElement(ae,Object.assign({key:"user-display-".concat(e.id)},e,{isAudioActive:t}))}),[n]);return s.a.map(s.a.orderBy(n,"id"),a)},re=(t(42),function(e){var n=e.name,t=e.maxSeats,o=Object(l.c)(J(n)),a=t-s.a.size(o),c=Object(l.c)(I).activeRoom===n,r=function(){!c&&function(e){var n=window.JitsiConference;if(n){var t=n.myUserId();n.sendCommand("JOIN_MINI_CONFERENCE",{attributes:{from:t,to:e}})}}(n)};return i.a.createElement("div",{className:"side-room",onClick:function(e){return e.stopPropagation()}},i.a.createElement("div",{className:"bg"}),i.a.createElement(ce,{users:o,roomName:n,isAudioActive:c}),s.a.map(Array(a),(function(e,n){return i.a.createElement("div",{className:d()("user-display free-seat"),onClick:r},i.a.createElement("div",{className:"id"},"Speak up"),i.a.createElement("div",{className:"in"}))})))}),se=t(27),ue=t(20),de=function(e){var n=e.volume,t=Object(se.a)(e,["volume"]),a=Object(o.useState)(null),c=Object(q.a)(a,2),r=c[0],s=c[1];Object(o.useEffect)((function(){r&&r.setVolume(n)}),[n]);return i.a.createElement(ue.a,Object.assign({},t,{onReady:function(e){s(e.target),t.onReady&&t.onReady(e)}}))},le=(t(55),t(23)),me=(t(56),t(57),function(e){var n=e.id,t=e.text,o=e.ts,a=e.recipient,c=d()("text-message",{private:"public"!==a,public:"public"===a});return i.a.createElement("div",{className:c},i.a.createElement("span",{class:"nick"},function(e){var n=window.JitsiConference.getParticipantById(e);return n?n.getDisplayName():"Anonymous"}(n)," (",function(e){var n=e.getHours().toString().padStart(2,0),t=e.getMinutes().toString().padStart(2,0);return"".concat(n,":").concat(t)}(o),")"),i.a.createElement("span",{class:"text"},t))}),fe=function(e){Object(le.a)(e);var n=Object(l.c)(j);return i.a.createElement("div",{className:"right-sidebar"},s.a.map(s.a.orderBy(n,"ts","desc"),(function(e){return i.a.createElement(me,{key:e.ts,ts:e.ts,text:e.text,id:e.id,recipient:e.recipient})})))},Ee=function(e){var n=e.roomName,t=e.withVideoArt,o=Object(l.c)((function(e){return e.room})),a=Object(l.c)(J("MAIN")),c=Object(l.c)(I);if(s.a.isEmpty(c))return null;var r="MAIN"===c.activeRoom;return i.a.createElement("div",{className:d()("room",s.a.toLower(n))},i.a.createElement("div",{className:"bg"}),t&&i.a.createElement("div",{className:"video-art-top"},i.a.createElement("div",{className:"big-video-container"},i.a.createElement(de,f))),i.a.createElement("div",{className:"main-area",onClick:function(){!r&&function(e){var n=window.JitsiConference;n&&(n.removeCommand("JOIN_MINI_CONFERENCE"),n.sendCommandOnce("LEAVE_MINI_CONFERENCE",{attributes:{from:n.myUserId(),to:e}}))}(c.activeRoom)}},i.a.createElement(ce,{users:a,roomName:"MAIN"}),s.a.map(o.sideRooms,(function(e,n){return i.a.createElement(re,Object.assign({key:"side-room-".concat(n)},e))})),i.a.createElement(fe,null)))},we=(t(58),function(e){var n=e.roomName,t=Object(l.b)(),o=function(e){return function(){return t(function(e){return function(n){window.JitsiConference&&window.JitsiConference.leave().then((function(){L(n,e)}))}}(e))}};return i.a.createElement("div",{className:"bottom-nav"},"block"!==n&&i.a.createElement("div",{className:"button button-to-block",onClick:o(N.block)}),"toilet"!==n&&i.a.createElement("div",{className:"button button-to-toilet",onClick:o(N.toilet)}),i.a.createElement("div",{className:"button mute-toggle",onClick:B}),i.a.createElement("div",{className:"button fullscreen-toggle",onClick:function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}}))});var ve=function(){var e=Object(l.c)(O).roomName,n=Object(l.c)(I),t=n&&"MAIN"===n.activeRoom?100:40;return i.a.createElement("div",{className:"app"},i.a.createElement(Ee,{roomName:e,withVideoArt:"block"===e}),i.a.createElement(we,{roomName:e}),k.b&&i.a.createElement(de,Object.assign({},m,{volume:t})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var pe,Ce=t(7),Ne=t(24),be=t.n(Ne),Oe=t(25),_e=Object(Ce.c)({users:R,room:_,messages:D}),ye=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ce.d,Se=Object(Ce.e)(_e,ye(Object(Ce.a)(be.a,Oe.a)));window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR),pe=Se,console.warn("initJitsi"),window.JitsiMeetJS.init(k.a),h(pe),setInterval((function(){if(window.JitsiConference){var e=window.JitsiConference.getParticipants();s.a.forEach(e,(function(e){"interrupted"===e._connectionStatus&&(console.warn("Kicking participant because of interrupted connection",e._id),window.JitsiConference.kickParticipant(e._id))}))}}),5e3),window.addEventListener("beforeunload",Q),window.addEventListener("unload",Q),c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(l.a,{store:Se},i.a.createElement(ve,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e){e.exports=JSON.parse('{"a":{"hosts":{"domain":"dror-testing.tlvengnetapp.com","focus":"focus.dror-testing.tlvengnetapp.com","muc":"conference.dror-testing.tlvengnetapp.com"},"bosh":"//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS","clientNode":"http://jitsi.org/jitsimeet","desktopSharingChromeDisabled":true,"openBridgeChannel":"datachannel","enableTalkWhileMuted":true,"enableNoAudioDetection":true,"enableNoisyMicDetection":true,"enableLipSync":false,"disableAudioLevels":false,"disableSimulcast":true,"p2p":{"enabled":false},"e2eping":{"pingInterval":-1},"useIPv6":false},"b":false}')}},[[28,1,2]]]);
//# sourceMappingURL=main.7da988f9.chunk.js.map