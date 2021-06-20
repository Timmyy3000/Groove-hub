import React, { useState } from 'react'
import { useRouteMatch } from 'react-router'

const Room = (props) => {

    const [votesToSkip, setvotesToSkip] = useState('2')
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const roomCode = props.match.params.roomCode

    getRoomDetails = () => {
        fetch('api/get-room' + '?code=' + roomCode).then((response) => {
            return response.json()
        }).then ((data) => {

        });
    }

    return (
        <div>
            <h3>{roomCode}</h3>
            <p> Votes : {votesToSkip}</p>
            <p> Guest Can Pause : {guestCanPause}</p>
            <p>Host : {isHost}</p>
        </div>
    )
}

export default Room
