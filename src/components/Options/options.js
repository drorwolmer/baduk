import _ from 'lodash'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getInputDevices} from "../../store/devices";
import classNames from "classnames";
import './options.scss'
import {switchInput} from "../../modules/meeting";


const MediaOption = ({input, type, local_input_id}) => {

    const dispatch = useDispatch()

    const onClick = (type, deviceId) => () => dispatch(switchInput(type, deviceId))

    const inputClassNames = classNames('input', {
        'is_active': local_input_id === input.deviceId
    })

    return (
        <div onClick={onClick(type, input.deviceId)} className={inputClassNames}>{input.label}</div>
    )
}

const Options = () => {

    const {audio_inputs, video_inputs, video_input_id, audio_input_id} = useSelector(getInputDevices)

    return (
        <div className="options-selector">
            <div className={"header"}>Audio inputs</div>
            {_.map(audio_inputs, (audio_input) => {
                return (<MediaOption input={audio_input} type="audio" local_input_id={audio_input_id}/>)
            })}
            <div className={"header"}>Video inputs</div>
            {_.map(video_inputs, (video_input) => {
                return (<MediaOption input={video_input} type="video" local_input_id={video_input_id}/>)
            })}
        </div>
    )
}

export default Options
