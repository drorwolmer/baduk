import _ from 'lodash'
import {makeReducer} from '../utils'

export const setDevices = (audio_inputs, video_inputs) => ({
    type: 'SET_DEVICES',
    payload: {audio_inputs, video_inputs},
})

export const getInputDevices = state => (state)

const devicesReducer = makeReducer({
    SET_DEVICES: (state, action) => {
        const audio_inputs = action.payload.audio_inputs
        const video_inputs = action.payload.video_inputs
        return {audio_inputs, video_inputs}
        // return [...state, action.payload.msg]
    },

}, [])

export default devicesReducer
