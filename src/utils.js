import _ from 'lodash'

export const makeReducer = (actionHandlers, initialState) => {
  return (state = initialState, action) => {
    if (actionHandlers[action.type]) {
      return actionHandlers[action.type](state, action)
    }
    return state
  }
}

export const getFromLocalStorage = (key, defaultValue) => {
  let value = window.localStorage.getItem(key)
  return !value || value === 'null' ? defaultValue : value
}

export const getLocalTracks = () => {
  if (!window.room) return {}

  return {
    audio: window.room.getLocalAudioTrack(),
    video: window.room.getLocalVideoTrack()
  }
}

export const getTracks = (userId, isLocal) => {
  if (isLocal) return getLocalTracks()

  const participant = window.room.getParticipantById(userId)
  const tracks = participant.getTracks()
  // const types = _.map(tracks, t => t.getType())
  // console.warn('remote tracks = ' + JSON.stringify(types))
  return {
    audio: _.find(tracks, t => t.getType() === 'audio'),
    video: _.find(tracks, t => t.getType() === 'video'),
  }
}
