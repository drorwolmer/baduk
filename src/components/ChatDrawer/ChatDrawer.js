import _ from 'lodash'
import React from 'react'
import './ChatDrawer.scss'
import {useSelector} from "react-redux";
import {getAllMessages} from "../../store/messages";
import ChatMessage from "../ChatMessage";
import {getLocalUser} from "../../store/users";

const ChatDrawer = ({}) => {

    const all_messages = useSelector(getAllMessages)


    return (
        <div className="right-sidebar">
            {_.map(_.orderBy(all_messages, 'ts', 'desc'), (msg) => {
                return (
                    <ChatMessage key={msg.ts} ts={msg.ts} text={msg.text} displayName={msg.displayName}
                                 targetDisplayName={msg.targetDisplayName} from_me={msg.from_me} to_me={msg.to_me}
                                 emoji={msg.emoji} recipient={msg.recipient}/>
                )
            })}
        </div>
    )
}

export default ChatDrawer
