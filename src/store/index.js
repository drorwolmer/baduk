import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// reducers
import roomReducer from './room'
import usersReducer from './users'
import messagesReducer from './messages'
import devicesReducer from "./devices";

const rootReducer = combineReducers({
  users: usersReducer,
  room: roomReducer,
  messages: messagesReducer,
  devices: devicesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
)

export default store
