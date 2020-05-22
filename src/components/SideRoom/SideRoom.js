import React, { useCallback } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getLocalUser, getUsersByActiveRoom } from '../../store/users'
import { joinSideRoom } from '../../modules/meeting'
import './SideRoom.scss'
import UserDisplay from '../UserDisplay'

export default ({ name, maxSeats, userInside }) => {

    const users = useSelector(getUsersByActiveRoom(name))

    const userCount = _.size(users)
    const emptySeatCount = maxSeats - userCount

    const localUser = useSelector(getLocalUser)

    const localUserInRoom = localUser.activeRoom === name

    const onFreeSeatClick = () => {
        !localUserInRoom && joinSideRoom(name)
    }

    const renderUser = useCallback(user => (
        <UserDisplay key={`user-display-${user.id}`} user={user} isAudioActive={localUserInRoom}/>
    ), [users])

    const ClassNames = classNames('side-room', {
        "inside": userInside
    })

    return (
        <div className={ClassNames} onClick={e => e.stopPropagation()}>
            <div>{userInside? "he": "no"}</div>
            <div className="bg"/>
            {_.map(_.orderBy(users, 'id'), user => (
                <div className="seat">{renderUser(user)}</div>
            ))}
            {_.map(Array(emptySeatCount), (o, i) => {
                return (
                    <div key={`empty-seat-${i}`} className="seat">
                        <div className={classNames('user-display free-seat')} onClick={onFreeSeatClick}>
                            <div className="id">Speak up</div>
                            <div className="in"/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
