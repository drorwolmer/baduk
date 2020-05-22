import _ from 'lodash'
import {makeReducer} from '../utils'

export const setAvailableInputDevices = (audio_inputs, video_inputs) => ({
    type: 'SET_AVAILABLE_INPUT_DEVICES',
    payload: {audio_inputs, video_inputs},
})

export const setInputDevice = (type, id) => ({
    type: 'SET_INPUT_DEVICE',
    payload: {type, id},
})

export const getInputDevices = state => {
    // TODO(ASAF): what did I do wrong here?
    // console.error("getInputDevices", state)
    return state.devices
}

const devicesReducer = makeReducer({
    SET_INPUT_DEVICE: (state, action) => {
        const new_state = {...state}
        if (action.payload.type==="audio") {
            new_state.audio_input_id = action.payload.id
        }
        else {
            new_state.video_input_id = action.payload.id
        }
        return new_state
    },
    SET_AVAILABLE_INPUT_DEVICES: (state, action) => {
        const audio_inputs = action.payload.audio_inputs
        const video_inputs = action.payload.video_inputs
        return {
            ...state,
            audio_inputs: audio_inputs,
            video_inputs: video_inputs
        }
        // return [...state, action.payload.msg]
    },

}, {
    audio_inputs: [],
    video_inputs: [],
    video_input_id:null,
    audio_input_id:null
})

export default devicesReducer
