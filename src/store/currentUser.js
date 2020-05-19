import { makeReducer } from '../utils'

export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: { user },
})

export const updateCurrentUser = update => ({
  type: 'UPDATE_CURRENT_USER',
  payload: { update },
})

const currentUserReducer = makeReducer({
  SET_CURRENT_USER: (state, action) => action.payload.user,
  UPDATE_CURRENT_USER: (state, action) => ({
    ...state,
    ...action.payload.update,
  }),
}, false)

export default currentUserReducer