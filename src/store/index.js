import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  ),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const options = {
  hosts: {
    domain: 'dror-testing.tlvengnetapp.com',
    focus: 'focus.dror-testing.tlvengnetapp.com',
    muc: 'conference.dror-testing.tlvengnetapp.com'
    // bridge: 'jitsi-videobridge.dror-testing.tlvengnetapp.com',

  },
  bosh: '//dror-testing.tlvengnetapp.com/http-bind?room=ELHAMIN_BLOCKUS', // FIXME: use xep-0156 for that
  // websocket: 'wss://dror-testing.tlvengnetapp.com/xmpp-websocket', // FIXME: use xep-0156 for that
  clientNode: 'http://jitsi.org/jitsimeet',
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
  e2eping: {
    pingInterval: -1
  },
  // useStunTurn: true,
  useIPv6: false

}

// const options = {
//   hosts: {
//     domain: 'beta.meet.jit.si',
//     muc: 'conference.beta.meet.jit.si',
//   },
//   bosh: '//beta.meet.jit.si/http-bind?room=ELHAMIN_BLOCKUS', // FIXME: use xep-0156 for that
//   websocket: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
//   clientNode: 'http://jitsi.org/jitsimeet',
//   desktopSharingChromeDisabled: true,
//   openBridgeChannel: 'websocket',
//   enableTalkWhileMuted: true,
//   enableNoAudioDetection: true,
//   enableNoisyMicDetection: true,
//   enableLipSync: true,
//   disableAudioLevels: false
//
// }

window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR)
initJitsi(options, store.dispatch)

export default store