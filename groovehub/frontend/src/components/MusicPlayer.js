import { Card, Grid, IconButton, Typography } from "@material-ui/core";
import { PlayArrowIcon, SkipNextIcon, PauseIcon } from "@material-ui/icons";
import React from "react";

const MusicPlayer = (props) => {
  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={props.song.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.song.title}
          </Typography>
          <Typography color="textSecondary" component="h5" variant="h5">
            {props.song.artists}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MusicPlayer;
