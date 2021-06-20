import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const HomePage = () => {

    const componentDidMoount = async () => {
        
    }

    const renderHomePage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs = {12} align="center">
                <Typography variant = "h3" compact = "h3">
                    Groove Hub
                </Typography>
            </Grid>
            <Grid item xs = {12} align="center">
                <ButtonGroup disableElevation variant="contained" color = "primary">
                    <Button color='primary' to="/join-room/" component={Link}>
                        Join A Room
                    </Button>
                    <Button color='secondary' to="/create-room/" component={Link}>
                        Create A Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )

    };

    return renderHomePage();

};

export default HomePage;
