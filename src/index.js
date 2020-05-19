import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/main.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import jitsiConfig from './config/config.dev'
import { initJitsi, kickInterruptedConnections } from './modules/meeting'
import store from './store'


// init Jitsi
window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR)

initJitsi(jitsiConfig, store.dispatch)

setInterval(kickInterruptedConnections, 5000);

// init React
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
