import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
    Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const JoinRoomPage = (props) => {

    const [roomCode, setRoomCode] = useState("")
    const [error, setError] = useState("")

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value)
    }

    const RoomButtonPressed = () => {

    }

    return (
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs = {12} align="center">
                <Typography variant='h4' component="h4" >
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs = {12} align="center">
                <TextField 
                    error = {error}
                    label ="Room Code"
                    placeholder = "Enter a Room Code"
                    vlaue = {roomCode}
                    helperText = {error}
                    variant="outlined"
                    onChange = {handleTextFieldChange}

                    />
            </Grid>
            <Grid item xs = {12} align="center">
                <Button variant="contained" color="default" onClick = {RoomButtonPressed}>Enter Room</Button>
            </Grid>
            <Grid item xs = {12} align="center">
            <Button variant="contained" color="secondary" to='/' component={Link} >Back</Button>
            </Grid>
        </Grid>
    )
}

export default JoinRoomPage;
