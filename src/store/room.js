import { makeReducer } from '../utils'
import { ROOMS } from '../consts'

export const setRoom = room => ({
  type: 'SET_ROOM',
  payload: { room },
})

export const getRoom = state => state.room

const roomReducer = makeReducer({
  SET_ROOM: (state, action) => action.payload.room,
}, ROOMS.block)

export default roomReducer