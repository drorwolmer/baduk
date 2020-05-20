import React, { useRef } from 'react'
import classNames from 'classnames'
import useOutsideClick from '../../hooks/useOutsideClick'

const Popup = ({ children, className, onOutsideClick }) => {

    const ref = useRef(null)

    useOutsideClick(ref, onOutsideClick)

    return (
        <div className={classNames('popup', className)} ref={ref}>
            {children}
        </div>
    )
}

export default Popup
