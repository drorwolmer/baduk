import _ from 'lodash'
import { makeReducer } from '../utils'

export const addUser = user => ({
  type: 'ADD_USER',
  payload: { user },
})

export const removeUser = userId => ({
  type: 'REMOVE_USER',
  payload: { userId },
})

export const updateUser = (userId, update) => ({
  type: 'UPDATE_USER',
  payload: { userId, update },
})

export const addRemoteUserTrack = userId => ({
  type: 'ADD_REMOTE_USER_TRACK',
  payload: { userId },
})

export const getUser = userId => state => _.get(state.users, userId)

export const getLocalUser = state => _.find(state.users, { isLocal: true })

export const getRemoteUsers = state => _.pickBy(state.users, u => !u.isLocal)

export const getUsersByActiveRoom = roomName => state => _.filter(state.users, u => u.activeRoom === roomName)

const reduceUpdateUser = (state, user, update) => {
  return {
    ...state,
    [user.id]: {
      ...user,
      ...update,
    },
  }
}

const usersReducer = makeReducer({
  ADD_USER: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      [user.id]: user
    }
  },
  REMOVE_USER: (state, action) => {
    const { userId } = action.payload
    return _.omit(state, userId)
  },
  UPDATE_USER: (state, action) => {
    const { userId, update } = action.payload
    const user = state[userId] || {}
    return reduceUpdateUser(state, user, update)
  },
  ADD_REMOTE_USER_TRACK: (state, action) => {
    const { userId } = action.payload
    const user = state[userId] || {}

    const update = user.remoteTracks === 1 ? { remoteTracks: 2, hasTracks: true } : { remoteTracks: 1 }

    return reduceUpdateUser(state, user, update)
  },
}, {})

export default usersReducer