import { makeReducer } from '../utils'
import { ROOMS } from '../consts'

const initialRoom = window.location.href.indexOf('toilet') > -1 ? ROOMS.toilet : ROOMS.block

export const setRoom = room => ({
  type: 'SET_ROOM',
  payload: { room },
})

export const getRoom = state => state.room

const roomReducer = makeReducer({
  SET_ROOM: (state, action) => action.payload.room,
}, initialRoom)

export default roomReducer