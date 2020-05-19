import _ from 'lodash'
import { makeReducer } from '../utils'

export const pushMessage = (userId, msg) => dispatch => {
  const key = `${userId}-${(new Date()).getTime()}`

  dispatch({
    type: 'PUSH_MESSAGE',
    payload: { userId, msg, key },
  })

  setTimeout(() => dispatch(deleteMessage(key)), 7000)
}

export const deleteMessage = key => ({
  type: 'DELETE_MESSAGE',
  payload: { key },
})

export const getUserMessages = userId => state => _.filter(state.messages, m => m.userId === userId)

const roomReducer = makeReducer({
  PUSH_MESSAGE: (state, action) => {
    return [...state, action.payload]
  },
  DELETE_MESSAGE: (state, action) => {
    return _.filter(state, m => m.key !== action.payload.key)
  },
}, [])

export default roomReducer