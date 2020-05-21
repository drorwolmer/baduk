import React from 'react'
import classNames from 'classnames'
import './SpeechBubble.scss'

const SpeechBubble = ({ children, className }) => {
    return (
        <div className={classNames("bubble-wrapper", className)} onClick={e => e.stopPropagation()}>
            <div className="speech-bubble">{children}</div>
        </div>
    )
}

export default SpeechBubble
