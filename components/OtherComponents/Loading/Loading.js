import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image'
import Loader from './Loader';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        width: "100vw",
        height: "100vh",
        zIndex: 1100,
        backgroundColor: theme => theme.palette.blueGrey["5"]
    },
    label: {
        color: "#fff"
    }
}));

const Loading = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div id="content" className={classes.gridRoot}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.gridRoot}
            >
                <Typography className={classes.label} variant='h3' noWrap> Effect </Typography>
                <Loader />
            </Grid>
        </div>

    )
};

export default Loading;
