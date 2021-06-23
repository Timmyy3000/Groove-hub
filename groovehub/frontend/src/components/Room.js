import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Collapse, Grid, IconButton, Typography} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import history from "./history";
import CloseIcon from '@material-ui/icons/Close';
import MusicPlayer from './MusicPlayer'

const useInterval=  (callback , delay ) => {
    const savedCallBack = useRef();

    useEffect(() => {
      savedCallBack.current = callback
    }, [callback]);

    useEffect(() => {
      function tick () {
        savedCallBack.current()
      }
      if (delay !== null) {
        const id = setInterval(tick,delay);
        return () => {
          clearInterval(id);
        }
      }
    }, [callback, delay])
}

const Room = (props) => {

  const [votesToSkip, setVotesToSkip] = useState('');
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [song, setSong] = useState({})
  const roomCode = props.match.params.roomCode;    

  let message = null;
  let settingsButton = "";

  const location = useLocation();

  let renderedMessage = ''



  function authenticateSpotify () {

    fetch('/spotify/is-authenticated/').then ((response) => response.json()).then ((data) =>{
      console.log(data.status)
      if (!data.status){
        
        fetch('/spotify/get-auth-url').then((response) => response.json()).then ((data) => {
          window.location.replace(data.url)
        })
      }

    })
  }

  

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

const getRoomDetails = () => {
  fetch("/api/get-room/" + "?code=" + roomCode)
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

const getCurrentSong = ()  =>{
  fetch("/spotify/current-song")
    .then((response) => {
      if (!response.ok) {
        return {};
      } else {
        return response.json();
      }
    })
    .then((data) => {
      setSong(data);
      console.log(data);
    });
}

const leaveButtonPressed = () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  fetch("/api/leave-room/", requestOptions).then((response) => {
    console.log(response)
    history.push("/");
  });
};



  if (location.state != null) {
    message = location.state;

    if (message.successMsg != "") {
        
        renderMessage(true, message.successMsg)

    } else if (message.errorMsg != ""){
        renderMessage(false, message.errorMsg)
    }
  }



  
  
  
  


  getRoomDetails()

  useInterval(getCurrentSong, 1000)

  useEffect(() => {
    const roomCode = props.roomCode;    

    
  });

  

  

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
        <MusicPlayer song = {song}/>
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
