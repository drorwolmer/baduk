import React, { useEffect, useState } from 'react'

const AutoHide = ({ children, refreshKey, ttl = -1, hidden }) => {

    const [startedHidden, setStartedHidden] = useState(null)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        setStartedHidden(hidden)
    }, [])

    useEffect(() => {
        if (ttl > -1) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, ttl)
            return () => clearTimeout(timer)
        }
    }, [refreshKey])

    return isVisible && !hidden && !startedHidden && children
}

export default AutoHide
