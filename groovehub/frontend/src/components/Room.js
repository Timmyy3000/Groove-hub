import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Collapse, Grid, Typography} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import history from "./history";
const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState("");
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  let message = null;
  const [successMsg, setSuccessMsg] = useState("");
  const roomCode = props.match.params.roomCode;

  const location = useLocation();

  let renderedMessage = ''

  function renderMessage (success, text) {
    if (success == true) {
        console.log('success')
        renderedMessage  = (<Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      {text}
  </Alert>)
    } else {
        renderedMessage =  (<Alert severity="error">
      <AlertTitle>Oops</AlertTitle>
      {text}
  </Alert>)
    }
}

  if (location.state != null) {
    message = location.state;

    if (message.successMsg != "") {
        
        renderMessage(true, message.successMsg)

    } else if (message.errorMsg != ""){
        renderMessage(false, message.errorMsg)
    }
  }

  
  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.history.push("/");
        }

        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };

  getRoomDetails();

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/leave-room/", requestOptions).then((response) => {
      props.history.push("/");
    });
  };


  useEffect(() => {
    const roomCode = props.match.params.roomCode;
    history.replace();
  });

  let settingsButton = "";

  if (isHost == true) {
    settingsButton = (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          to={{
            pathname: `/room/${roomCode}/settings/`,
            state: { guestCanPause: guestCanPause, votesToSkip: votesToSkip },
          }}
          component={Link}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  const renderSettingButoon = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          to={`/room/${roomCode}/settings/`}
          component={Link}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code : {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Collapse in={(message != null) }>
            {renderedMessage}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes To Skip : {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host : {isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause : {guestCanPause.toString()}
        </Typography>
      </Grid>

      {settingsButton}

      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
