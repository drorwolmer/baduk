import { makeReducer } from '../utils'

export const addUser = user => ({
  type: 'ADD_USER',
  payload: { user },
})

export const updateUser = (userId, update) => ({
  type: 'UPDATE_USER',
  payload: { userId, update },
})

const usersReducer = makeReducer({
  ADD_USER: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      [user.id]: user
    }
  },
  UPDATE_USER: (state, action) => {
    const { userId, update } = action.payload
    const user = state[userId] || {}
    return {
      ...state,
      [userId]: {
        ...user,
        ...update,
      },
    }
  },
}, {})

export default usersReducer