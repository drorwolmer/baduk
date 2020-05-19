import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import { initJitsi } from '../modules/meeting'
import remoteUsersReducer from './remoteUsers'
import currentUserReducer from './currentUser'
import localTracksReducer from './localTracks'
import roomReducer from './room'
import usersReducer from './users'

const rootReducer = combineReducers({
  users: usersReducer,
  room: roomReducer,
  currentUser: currentUserReducer,
  remoteUsers: remoteUsersReducer,
  localTracks: localTracksReducer,
})

const store = createStore(
  rootReducer,
  // applyMiddleware(logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// const options = {
//   hosts: {
//     domain: 'dror-testing.tlvengnetapp.com',
//     focus: 'focus.dror-testing.tlvengnetapp.com',
//     muc: 'conference.dror-testing.tlvengnetapp.com'
//     // bridge: 'jitsi-videobridge.dror-testing.tlvengnetapp.com',
//
//   },
//   bosh: '//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS', // FIXME: use xep-0156 for that
//   // websocket: 'wss://dror-testing.tlvengnetapp.com/xmpp-websocket', // FIXME: use xep-0156 for that
//   clientNode: 'http://jitsi.org/jitsimeet',
//   desktopSharingChromeDisabled: true,
//   openBridgeChannel: 'websocket',
//   enableTalkWhileMuted: true,
//   enableNoAudioDetection: true,
//   enableNoisyMicDetection: true,
//   enableLipSync: false,
//   disableAudioLevels: false,
//   disableSimulcast: true,
//   enableP2P: false,
//   // useStunTurn: true,
//   useIPv6: false
//
// }

const options = {
  hosts: {
    domain: 'beta.meet.jit.si',
    muc: 'conference.beta.meet.jit.si',
  },
  bosh: '//beta.meet.jit.si/http-bind?room=ELHAMIN_BLOCKUS', // FIXME: use xep-0156 for that
  websocket: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
  clientNode: 'http://jitsi.org/jitsimeet',
  desktopSharingChromeDisabled: true,
  openBridgeChannel: 'websocket',
  enableTalkWhileMuted: true,
  enableNoAudioDetection: true,
  enableNoisyMicDetection: true,
  enableLipSync: true,
  disableAudioLevels: false

}

initJitsi(options, store.dispatch)

export default store