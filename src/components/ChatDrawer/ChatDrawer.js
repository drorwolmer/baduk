import _ from 'lodash'
import React from 'react'
import './ChatDrawer.scss'
import {useSelector} from "react-redux";
import {getAllMessages} from "../../store/messages";
import ChatMessage from "../ChatMessage";

const ChatDrawer = ({}) => {

    const messages = useSelector(getAllMessages)

    return (
        <div className="right-sidebar">
            {_.map(_.orderBy(messages, 'ts'), (msg) => {
                return (
                    <ChatMessage key={msg.ts} ts={msg.ts} text={msg.text} id={msg.id} recipient={msg.recipient}/>
                )
            })}
        </div>
    )
}

export default ChatDrawer
