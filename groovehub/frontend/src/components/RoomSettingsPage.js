import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, Redirect, useLocation } from "react-router-dom";

const RoomSettingsPage = (props) => {

  const location = useLocation();

  const [guestCanPause, setGuestCanPause] = useState(
    location.state.guestCanPause
  );

  const [votesToSkip, setVotesToSkip] = useState(location.state.votesToSkip);

  const roomCode = props.match.params.roomCode;

  const [successMsg, setSuccessMsg] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [redirect, setRedirect] = useState(false);

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleUpdateRoomButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch("/api/update-room/", requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMsg("Room Settings Updated Successfully");
        } else {
          setErrorMsg("Error Updating Room!");
        }
      })
      .then((data) => {

        setRedirect(true) 
    
      });
  };


  function renderPage() {
    

    if (redirect ) {
        return (
        <Redirect to = {{
            pathname : `/room/${roomCode}/`,
            state : {
                successMsg : successMsg,
                errorMsg : errorMsg
            }
        }}/>
        )

    } else {

        return (
      <>
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
                  value="true"
                  control={<Radio color="primary" />}
                  label="Play/Pause"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="false"
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
                defaultValue={votesToSkip}
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
            <Box m="6px">
              <Button
                color="primary"
                variant="contained"
                onClick={handleUpdateRoomButtonPressed}
              >
                Update Room
              </Button>
            </Box>
            <Button
              color="secondary"
              variant="contained"
              to={`/room/${roomCode}/`}
              component={Link}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </>
    );
            }
  }

  return renderPage();
};

export default RoomSettingsPage;
