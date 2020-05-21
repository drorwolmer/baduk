import { makeReducer, getFromLocalStorage } from '../utils'
import { ROOMS } from '../consts'

export const setInitialRoom = () => {
    // try url param
    const urlParams = new URLSearchParams(window.location.search)
    let roomName = urlParams.get('room')
    if (!roomName) {
        // try local storage
        roomName = getFromLocalStorage('ROOM_NAME')
    }
    if (!roomName) {
      // set default
        roomName = 'block'
    }

    return setRoom(ROOMS[roomName])
}

export const setRoom = room => {
    window.localStorage.setItem('ROOM_NAME', room.roomName)
    return {
        type: 'SET_ROOM',
        payload: { room },
    }
}

export const getRoom = state => state.room

const roomReducer = makeReducer({
    SET_ROOM: (state, action) => action.payload.room,
}, {})

export default roomReducer