import { makeReducer } from '../utils'

export const setRoom = room => ({
  type: 'SET_ROOM',
  payload: { room },
})

const roomReducer = makeReducer({
  SET_ROOM: (state, action) => action.payload.room,
}, {})

export default roomReducer