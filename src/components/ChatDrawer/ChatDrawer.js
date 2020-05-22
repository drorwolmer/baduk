import _ from 'lodash'
import React from 'react'
import './ChatDrawer.scss'
import { useSelector } from 'react-redux'
import ChatMessage from '../ChatMessage'
import ScrollToBottom from 'react-scroll-to-bottom'
import { css } from 'glamor'

const MESSAGE_HEIGHT = 39
const ADDITIONAL_HEIGHT = 8 // padding

const ChatDrawer = ({ messagesSelector, maxHeight = -1 }) => {

    const messages = useSelector(messagesSelector)

    const styles = {}
    if (maxHeight > -1) {
        const messagesHeight = _.size(messages) * MESSAGE_HEIGHT + ADDITIONAL_HEIGHT
        styles.height = messagesHeight < maxHeight ? messagesHeight : maxHeight
    }

    return (
        <ScrollToBottom className={css(styles)}>
            <div className="chat-drawer">
                {_.map(_.orderBy(messages, 'ts', 'asc'), (msg) => {
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
