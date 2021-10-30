import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image'
import Loader from './Loader';


const PREFIX = 'Loading';

const classes = {
    gridRoot: `${PREFIX}-gridRoot`,
    label: `${PREFIX}-label`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.gridRoot}`]: {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 1100,
        overflow: "hidden",
        backgroundColor: theme.palette.blueGrey["5"]
    },

    [`& .${classes.label}`]: {
        color: "#fff"
    }
}));

const Loading = () => {
    const theme = useTheme();


    return (
        <Root id="content" className={classes.gridRoot}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                // className={classes.gridRoot}
                sx={{ height: "100%" }}
            >
                <Typography className={classes.label} variant='h3' noWrap>Ξffect</Typography>
                <Loader />
            </Grid>
        </Root>
    );
};

export default Loading;
