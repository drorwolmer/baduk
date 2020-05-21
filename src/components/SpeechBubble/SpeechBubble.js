import React from 'react'
import './SpeechBubble.scss'

const SpeechBubble = ({ children }) => {
    return (
        <div className="bubble-wrapper">
            <div className="speech-bubble">{children}</div>
        </div>
    )
}

export default SpeechBubble
