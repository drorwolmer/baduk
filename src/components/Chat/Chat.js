import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPrivateMessages } from '../../store/messages'
import ChatDrawer from '../ChatDrawer'
import TextInput from '../TextInput'
import { sendPrivateMessage } from '../../modules/meeting'
import { getLocalUser } from '../../store/users'

const Chat = ({ recipient, maxDrawerHeight }) => {

    const [isSending, setIsSending] = useState(false)

    const localUser = useSelector(getLocalUser)

    useEffect(() => {
        if (isSending) {
            setIsSending(false)
        }

    }, [isSending])

    const { globalUID, displayName } = recipient

    const sendMessage = msg => {
        sendPrivateMessage(globalUID, displayName, msg)
        setIsSending(true)
    }

    return (
        <div className="chat">
            <ChatDrawer messagesSelector={getPrivateMessages(globalUID, localUser.globalUID)} maxHeight={maxDrawerHeight}/>
            {!isSending && (<TextInput className="chat-message" submit={sendMessage}/>)}
        </div>
    )
}

export default Chat
