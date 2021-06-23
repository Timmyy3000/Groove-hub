import { Card, Grid, IconButton, LinearProgress, Typography } from "@material-ui/core";

import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PauseIcon from '@material-ui/icons/Pause'
import React from "react";

const MusicPlayer = (props) => {

    const songProgress = (props.song.time / props.song.duration) * 100

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
          <Typography color="textSecondary" variant="subtitle1">
            {props.song.artists}
          </Typography>
          <div>
              <IconButton >
                  {props.song.is_playing ?<PauseIcon/> : <PlayArrowIcon/>}
              </IconButton>
              <IconButton >
                  <SkipNextIcon />
                </ IconButton>
          </div>

        </Grid>
      </Grid>
        < LinearProgress variant = "determinate" value = {songProgress} />
    </Card>
  );
};

export default MusicPlayer;
