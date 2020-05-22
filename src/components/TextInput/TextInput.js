import React, { useRef, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import ContentEditable from 'react-contenteditable'

import './TextInput.scss'

const stripHtml = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
}

const TextInput = ({ className, submit, dismiss }) => {

    const ref = useRef()
    const text = useRef('')

    useEffect(() => {
        ref && ref.current.focus()
    }, [ref])

    const onKeyPress = e => {
        if (_.isEmpty(text.current)) return

        // submit on "enter"
        if (e.charCode === 13) {
            e.preventDefault()
            submit && submit(stripHtml(text.current))
            dismiss && dismiss()
        }
    }

    const onKeyDown = e => {
        // dismiss on "esc"
        if (e.keyCode === 27) {
            dismiss && dismiss()
        }
    }

    const onChange = e => text.current = e.target.value

    return (
        <ContentEditable
            innerRef={ref}
            html={text.current}
            className={classNames('text-input', className)}
            onChange={onChange}
            onKeyPress={onKeyPress} onKeyDown={onKeyDown}
        />
    )
}

export default TextInput
