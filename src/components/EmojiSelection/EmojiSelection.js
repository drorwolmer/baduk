import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getLocalUser } from '../../store/users'
import { setLocalEmoji } from '../../modules/meeting'
import EMOJIES from '../../config/config.emoji'
import './EmojiSelection.scss'

const EmojiSelection = ({ onSelection }) => {

    const localUser = useSelector(getLocalUser)

    const onEmojiClick = emoji => e => {
        e.stopPropagation()

        if (emoji === localUser.emoji) return

        setLocalEmoji(emoji)
        onSelection && onSelection(emoji)
    }

    return (
        <div className="emoji-selection">
            {_.map(EMOJIES, (emoji, i) => (
                <div key={`emoji-${i}`} onClick={onEmojiClick(emoji)}
                     className={classNames('emoji-item', { selected: emoji === localUser.emoji })}>{emoji}</div>
            ))}
        </div>
    )
}

export default EmojiSelection
