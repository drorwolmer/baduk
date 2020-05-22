import _ from 'lodash'
import React from 'react'
import './ChatDrawer.scss'
import { useSelector } from 'react-redux'
import ChatMessage from '../ChatMessage'
import ScrollToBottom from 'react-scroll-to-bottom'

const ChatDrawer = ({ messagesSelector }) => {

    const all_messages = useSelector(messagesSelector)

    return (
        <ScrollToBottom className="chat-scroll">
            <div className="chat-drawer">
                {_.map(_.orderBy(all_messages, 'ts', 'asc'), (msg) => {
                    return (
                        <ChatMessage key={msg.ts.toISOString().concat(msg.globalUID)} ts={msg.ts} text={msg.text}
                                     displayName={msg.displayName}
                                     targetDisplayName={msg.targetDisplayName} from_me={msg.from_me} to_me={msg.to_me}
                                     emoji={msg.emoji} recipient={msg.recipient}/>
                    )
                })}
            </div>
        </ScrollToBottom>
    )
}

export default ChatDrawer
