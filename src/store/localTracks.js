import { makeReducer } from '../utils'

export const setLocalTracks = localTracks => ({
  type: 'SET_LOCAL_TRACKS',
  payload: { localTracks },
})

const localTracksReducer = makeReducer({
  SET_LOCAL_TRACKS: (state, action) => action.payload.localTracks
}, {})

export default localTracksReducer