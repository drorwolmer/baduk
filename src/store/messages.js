import _ from 'lodash'
import {makeReducer} from '../utils'

export const pushMessage = (msg) => dispatch => {
    const key = `${msg.id}-${(new Date()).getTime()}`

    dispatch({
        type: 'PUSH_MESSAGE',
        payload: {msg},
    })

    // setTimeout(() => dispatch(deleteMessage(key)), 7000)
}

export const deleteMessage = key => ({
    type: 'DELETE_MESSAGE',
    payload: {key},
})

export const deleteAllMessages = () => ({
    type: 'DELETE_ALL_MESSAGES'
})

export const getUserMessages = userId => state => _.filter(state.messages, m => m.id === userId)

// Get the last public message from this user, sent in the last 10 secs
export const getUserLastPublicMessage = globalUID => state => _.last(_.filter(state.messages, (m) => {
    let ts_diff_secs = Math.abs(((new Date()) - m.ts) / 1000)
    return (m.globalUID === globalUID) && (m.recipient === 'public') && (ts_diff_secs<10)
}))


export const getAllMessages = state => state.messages

const roomReducer = makeReducer({
    PUSH_MESSAGE: (state, action) => {
        return [...state, action.payload.msg]
    },
    DELETE_ALL_MESSAGES: (state, action) => {
        return []
    },
    DELETE_MESSAGE: (state, action) => {
        return _.filter(state, m => m.key !== action.payload.key)
    },
}, [])

export default roomReducer
