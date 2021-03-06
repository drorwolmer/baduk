import React from 'react'
import ReactDOM from 'react-dom'
import './css/main.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {initJitsi, kickInterruptedConnections, unload} from './modules/meeting'
import store from './store'
import {setInitialRoom} from './store/room'




// init Jitsi
window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR)

store.dispatch(setInitialRoom())

initJitsi(store)

setInterval(kickInterruptedConnections, 5000);

// TODO (ASAF) - check if both needed
window.addEventListener("beforeunload", unload)
window.addEventListener("unload", unload)

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
