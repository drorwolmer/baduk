import React, { useEffect, useState } from 'react'
import './SpeechBubble.scss'

const SpeechBubble = ({ text, ttl = 5000 }) => {

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, ttl)
        return () => clearTimeout(timer)
    }, [text])

    return isVisible && (
        <div className="bubble-wrapper">
            <div className="speech-bubble">{text}</div>
        </div>
    )
}

export default SpeechBubble
