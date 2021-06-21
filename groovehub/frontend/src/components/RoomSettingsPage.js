import React, { useEffect, useState } from "react";
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
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const RoomSettingsPage = (props) => {
  
  const [roomCode, setRoomCode] = useState(props.match.params.roomCode);
  const [votesToSkip, setVotesToSkip] = useState();
  const [guestCanPause, setGuestCanPause] = useState();
  


    console.log(roomCode)

  fetch("/api/get-room" + "?code=" + roomCode)
  .then((response) => {
    return response.json();
  })
  .then((data) => {

   
  });

  console.log(votesToSkip)




  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Update Room Settings
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center"> Guest Control </div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              defaultValue={guestCanPause.toString()}
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              defaultValue={guestCanPause ? "false" : "true"}
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes required to skip song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary">
          Update Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          to={`/room/${roomCode}`}
          component={Link}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomSettingsPage;
