import React from 'react'
import './ChatMessage.scss'
import classNames from "classnames";

const nice_date = (date) => {
    const hours_str = date.getHours().toString().padStart(2, 0)
    const minutes_str = date.getMinutes().toString().padStart(2, 0)
    return `${hours_str}:${minutes_str}`
}

const getNick = (userId) => {
    const participant = window.JitsiConference.getParticipantById(userId)
    if (!participant) {
        return "Anonymous"
    }
    return participant.getDisplayName()
}

const ChatMessage = ({id: userId, text, ts, recipient}) => {

    const messageClassNames = classNames('text-message', {
        'private': recipient !== "public",
        'public': recipient === "public",
    })

    return (
        <div className={messageClassNames}>
            <span class="nick">{getNick(userId)} ({nice_date(ts)})</span><span class="text">{text}</span>
        </div>
    )
}

export default ChatMessage
