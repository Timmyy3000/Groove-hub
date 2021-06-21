import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Collapse, Grid, IconButton, Typography} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import history from "./history";
import CloseIcon from '@material-ui/icons/Close';

const Room = (props) => {

  const [votesToSkip, setVotesToSkip] = useState("");
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
  let message = null;
  
  const roomCode = props.match.params.roomCode;

  const location = useLocation();

  function authenticateSpotify () {

    fetch('/spotify/is-authenticated/').then ((response) => response.json()).then ((data) =>{
      setSpotifyAuthenticated(data.status)

      console.log(data.status)

      if (!data.status){
        fetch('/spotify/get-auth-url').then((response) => response.json()).then ((data) => {
          window.location.replace(data.url)
        })
      }

    })
  }

  let renderedMessage = ''

  function renderMessage (success, text) {
    if (success == true) {
        console.log('success')
        renderedMessage  = (<Alert severity="success" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
      <AlertTitle>Success</AlertTitle>
      {text}
  </Alert>)
    } else {
        renderedMessage =  (<Alert severity="error"  action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
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
       
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });

      if (isHost){
        authenticateSpotify()
      }
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
    history.replace(`/room/${roomCode}/`, null);
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


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code : {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Collapse in={(message != null && isOpen == true) }>
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
