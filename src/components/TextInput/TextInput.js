import React, { useState } from 'react'
import _ from 'lodash'
import './TextInput.scss'

const TextInput = ({ placeholder, submit, dismiss }) => {

    const [text, setText] = useState('')

    const onKeyPress = e => {
        if (_.isEmpty(text)) return

        // submit on "enter"
        if (e.charCode === 13) {
            submit(text)
        }
    }

    const onKeyDown = e => {
        // dismiss on "esc"
        if (e.keyCode === 27) {
            dismiss()
        }
    }

    return (
        <div className="text-input">
            <input type="text" value={text} autoFocus placeholder={placeholder}
                   onChange={e => setText(e.target.value)} onKeyPress={onKeyPress} onKeyDown={onKeyDown}/>
        </div>
    )
}

export default TextInput
