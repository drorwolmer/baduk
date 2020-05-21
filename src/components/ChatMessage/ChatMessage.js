import React from 'react'
import './ChatMessage.scss'
import classNames from "classnames";

const nice_date = (date) => {
    const hours_str = date.getHours().toString().padStart(2, 0)
    const minutes_str = date.getMinutes().toString().padStart(2, 0)
    return `${hours_str}:${minutes_str}`
}

const ChatMessage = ({displayName, targetDisplayName, from_me, to_me, text, emoji, ts, recipient}) => {

    const getFromText = (displayName) =>
    {
        if (to_me && (recipient !== "public"))
        {
            return `Private from ${displayName}`
        }
        return displayName
    }

    const getToText = (displayName) =>
    {
        if (from_me && (recipient !== "public"))
        {
            return `Private to ${displayName}`
        }
        return displayName
    }

    const messageClassNames = classNames('text-message', {
        'private': recipient !== "public",
        'public': recipient === "public",
        'from_me': from_me,
        'to_me': to_me
    })

    return (
        <div className={messageClassNames}>
            <span className="emoji">{emoji}</span>
            <span className="nick from">{getFromText(displayName)}</span>
            <span className="nick to">{getToText(targetDisplayName)}</span>
            <span className="msg-date">({nice_date(ts)}) </span>
            <span className="text">{text}</span>
        </div>
    )
}

export default ChatMessage
