import React from 'react'
import { useSelector } from 'react-redux'
import {getInputDevices} from "../../store/devices";

const Options = () => {

    const {audio_inputs, video_inputs} = useSelector(getInputDevices)

    return (
        <div className="options-selector">
            <div className={"header"}>Audio inputs</div>

        </div>
    )
}

export default Options
