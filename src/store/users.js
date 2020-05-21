import _ from 'lodash'
import {makeReducer} from '../utils'

export const addUser = user => ({
    type: 'ADD_USER',
    payload: {user},
})

export const removeUser = userId => ({
    type: 'REMOVE_USER',
    payload: {userId},
})

export const updateUser = (userId, update) => ({
    type: 'UPDATE_USER',
    payload: {userId, update},
})

export const addRemoteUserTrack = (userId, trackType, isMuted) => ({
    type: 'ADD_REMOTE_USER_TRACK',
    payload: {userId, trackType, isMuted},
})

export const updateDominantSpeaker = userId => ({
    type: 'UPDATE_DOMINANT_SPEAKER',
    payload: {userId},
})

export const getUser = userId => state => _.get(state.users, userId)

export const getUserByGlobalUID = globalUID => state => _.find(state.users, {globalUID: globalUID})

export const getLocalUser = state => _.find(state.users, {isLocal: true})

export const getRemoteUsers = state => _.pickBy(state.users, u => !u.isLocal)

export const getUsersByActiveRoom = roomName => state => _.filter(state.users, u => u.activeRoom === roomName)

const reduceUpdateUser = (state, user, update) => {
    return {
        ...state,
        [user.id]: {
            ...user,
            ...update,
        },
    }
}

const usersReducer = makeReducer({
    ADD_USER: (state, action) => {
        const {user} = action.payload
        return {
            ...state,
            [user.id]: user
        }
    },
    REMOVE_USER: (state, action) => {
        const {userId} = action.payload
        return _.omit(state, userId)
    },
    UPDATE_USER: (state, action) => {
        const {userId, update} = action.payload
        const user = state[userId] || {}

        return reduceUpdateUser(state, user, update)
    },
    ADD_REMOTE_USER_TRACK: (state, action) => {
        const {userId, trackType, isMuted} = action.payload
        const user = state[userId] || {}

        const update = {
            [`has_${trackType}`]: true,
            [`muted_${trackType}`]: isMuted
        }

        return reduceUpdateUser(state, user, update)
    },
    UPDATE_DOMINANT_SPEAKER: (state, action) => {
        const dominantUserId = action.payload.userId


        console.warn("UPDATE_DOMINANT_SPEAKER", action)

        _.forEach(state, (user) => {
            user.isDominantSpeaker = (user.id === dominantUserId)
        })

        return state
    }
}, {})

export default usersReducer
