import React, { useEffect, useState } from 'react'

const AutoHide = ({ children, refreshKey, ttl = -1 }) => {

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (ttl > -1) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, ttl)
            return () => clearTimeout(timer)
        }
    }, [refreshKey])

    return isVisible && children
}

export default AutoHide
