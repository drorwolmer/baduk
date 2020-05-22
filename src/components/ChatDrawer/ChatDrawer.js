import _ from 'lodash'
import React from 'react'
import './ChatDrawer.scss'
import { useSelector } from 'react-redux'
import ChatMessage from '../ChatMessage'
import ScrollToBottom from 'react-scroll-to-bottom'
import { css } from 'glamor'

const ChatDrawer = ({ messagesSelector, maxHeight = -1 }) => {

    const messages = useSelector(messagesSelector)

    const styles = {
        'background-color': 'rgba(0, 0, 0, 0.7)',
        height: '100vh',
    }
    if (maxHeight > -1) {
        styles.height = _.size(messages) === 0 ? 0 : maxHeight
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
