import React, { useState } from 'react'
import ChatMessage from '../ChatMessage'

const ChatMessagePreview = ({ message }) => {
    const [keepHidden, setKeepHidden] = useState(false)
    return !keepHidden && (
        <div className="chat message-preview" onClick={() => setKeepHidden(true)}>
            <div className="chat-drawer">
                <ChatMessage {...message} />
            </div>
        </div>
    )
}

export default ChatMessagePreview
