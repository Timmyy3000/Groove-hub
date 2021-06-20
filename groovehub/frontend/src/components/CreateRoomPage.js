import React from "react";
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
import { spacing } from '@material-ui/system';
const CreateRoomPage = () => {
  const defaultVotes = 2;

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
            <RadioGroup row defaultValue="true">
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
            <Button color = 'primary' variant ="contained">Create Room</Button>
            </Box>
            <Button color = 'secondary' variant ="contained" to = "/" component = {Link}>Back</Button>
        </Grid>
        
      </Grid>
    </>
  );
};

export default CreateRoomPage;
