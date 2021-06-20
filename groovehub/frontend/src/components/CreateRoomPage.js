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


const CreateRoomPage = (props) => {
    const defaultVotes = '2';

    const [guestCanPause, setGuestCanPause ] = useState(true);

    const [votesToSkip, setVotesToSkip ] = useState(defaultVotes);

    

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value)
    }

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === 'true' ? true : false)
    }

    const state = { guestCanPause, votesToSkip}

    const handleCreateRoomButtonPressed = () =>{
        const requestOptions = {
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify ({
                votes_to_skip : votesToSkip,
                guest_can_pause : guestCanPause,
            }),
        };
        fetch('/api/create-room/', requestOptions).then((response) =>
            response.json()
        ).then((data) => 
            props.history.push('/room/' + data.code)
        );
    }

    return (
    <>
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
            Create A Room
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl component="fieldset">
            <FormHelperText>
                <div align="center"> Guest Control </div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange = {handleGuestCanPauseChange}>
                <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label = "Play/Pause"
                labelPlacement = 'bottom'
                />
                <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label = "No Control"
                labelPlacement = 'bottom'
                />
            </RadioGroup>
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl>
                <TextField 
                    required = {true} 
                    type = "number" 
                    defaultValue = {defaultVotes} 
                    onChange = {handleVotesChange}
                    inputProps={{
                        min:1,
                        style:{textAlign : "center"}
                    }} 
                    />
                    <FormHelperText>
                        <div  align = "center">
                            Votes required to skip song
                        </div>
                    </FormHelperText>
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <Box  m='6px'>
            <Button color = 'primary' variant ="contained" onClick = {handleCreateRoomButtonPressed}>Create Room</Button>
            </Box>
            <Button color = 'secondary' variant ="contained" to = "/" component = {Link}>Back</Button>
        </Grid>
        
        </Grid>
    </>
    );
};

export default CreateRoomPage;
