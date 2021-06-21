import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const HomePage = (props) => {

  const history = useHistory()

  const [roomCode, setRoomCode] = useState(null)
    
    useEffect(async () => {

        fetch("/api/user-in-room/")
        .then((response) => response.json())
        .then((data) => {
            setRoomCode(data.code)
            console.log(roomCode)
            

        });

    })

    if (roomCode == null) {

      return (

        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              Groove Hub
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join-room/" component={Link}>
                Join A Room
              </Button>
              <Button color="secondary" to="/create-room/" component={Link}>
                Create A Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
     )
    }
    
    else {
      return <Redirect to ={`/room/${roomCode}/`}/>
    }

    

};

export default HomePage ;
