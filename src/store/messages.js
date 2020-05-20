import _ from 'lodash'
import { makeReducer } from '../utils'

export const pushMessage = (msg) => dispatch => {
  const key = `${msg.id}-${(new Date()).getTime()}`

  dispatch({
    type: 'PUSH_MESSAGE',
    payload: { msg },
  })

  // setTimeout(() => dispatch(deleteMessage(key)), 7000)
}

export const deleteMessage = key => ({
  type: 'DELETE_MESSAGE',
  payload: { key },
})

export const getUserMessages = userId => state => _.filter(state.messages, m => m.id === userId)
export const getAllMessages = state => state.messages

const roomReducer = makeReducer({
  PUSH_MESSAGE: (state, action) => {
    return [...state, action.payload.msg]
  },
  DELETE_MESSAGE: (state, action) => {
    return _.filter(state, m => m.key !== action.payload.key)
  },
}, [])

export default roomReducer
