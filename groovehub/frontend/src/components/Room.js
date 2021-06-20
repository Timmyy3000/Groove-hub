import React, { useState } from 'react'
import { useRouteMatch } from 'react-router'
import {Button, Grid, Typography} from '@material-ui/core'
const Room = (props) => {

    const [votesToSkip, setVotesToSkip] = useState('')
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const roomCode = props.match.params.roomCode

    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode).then((response) => {
            return response.json()
        }).then ((data) => {
            setVotesToSkip(data.votes_to_skip)
            setGuestCanPause(data.guest_can_pause)
            setIsHost(data.is_host)
            console.log(data)
        });
    }

    getRoomDetails()

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography variant="h4" component="h4" >
                    Code : {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <Typography variant="h4" component="h4" >
                    Code : {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <Typography variant="h4" component="h4" >
                    Code : {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <Typography variant="h4" component="h4" >
                    Code : {roomCode}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Room
