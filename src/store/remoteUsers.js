import _ from 'lodash'
import { makeReducer } from '../utils'

export const addRemoteUser = user => ({
  type: 'ADD_REMOTE_USER',
  payload: { user },
})

export const addRemoteTrack = (userId, track) => ({
  type: 'ADD_REMOTE_TRACK',
  payload: { userId, track },
})

export const removeRemoteUser = userId => ({
  type: 'REMOVE_REMOTE_USER',
  payload: { userId },
})

export const removeRemoteTrack = (participantId, track) => ({
  type: 'REMOVE_REMOTE_TRACK',
  payload: { type: track.getType() },
})

export const clearRemoteUsers = () => ({
  type: 'CLEAR_REMOTE_USERS',
})

export default makeReducer({
  ADD_REMOTE_USER: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      [user.id]: {},
    }
  },
  ADD_REMOTE_TRACK: (state, action) => {
    const { userId, track } = action.payload
    return {
      ...state,
      [userId]: {
        ...(state[userId] || {}),
        [track.getType()]: track,
      },
    }
  },
  REMOVE_REMOTE_USER: (state, action) => {
    return _.omit(state, action.payload.userId)
  },
  REMOVE_REMOTE_TRACK: (state, action) => {
    const { type } = action.payload
    return {
      ...state,
      [action.payload.participantId]: _.omit(state[action.payload.participantId], type)
    }
  },
  CLEAR_REMOTE_USERS: (state, action) => ({}),
}, {})

// export default function remoteUsers (state = {}, action) {
//   switch (action.type) {
//     case 'ADD_REMOTE_USER':
//       const { user } = action.payload
//       return {
//         ...state,
//         [user.id]: {},
//       }
//     case 'ADD_REMOTE_TRACK':
//       const { userId, track } = action.payload
//       return {
//         ...state,
//         [userId]: {
//           ...(state[userId] || {}),
//           [track.getType()]: track,
//         },
//       }
//     case 'REMOVE_REMOTE_USER':
//       return _.omit(state, action.payload.userId)
//     case 'REMOVE_REMOTE_TRACK':
//       const { type } = action.payload
//       return {
//         ...state,
//         [action.payload.participantId]: _.omit(state[action.payload.participantId], type)
//       }
//     case 'CLEAR_REMOTE_USERS':
//       return {}
//     default:
//       return state
//   }
// }

// export default remoteUsers