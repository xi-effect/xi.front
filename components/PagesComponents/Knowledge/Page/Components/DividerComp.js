import React, { useState } from 'react';
import { useTheme, Input, Grid, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'


const useStyles = makeStyles((theme) => ({
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "100%",
    },
    dividerBlock: {
        width: "100%",
        height: 2,
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: theme => theme.palette.primary.contrastText,
    },
}));


const DividerComp = inject('rootStore')(observer(({ rootStore, value }) => {
    // Simulated props for the purpose of the example
    // Pass the props as the first argument of useStyles()
    //console.log( "props", props )
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <Grid className={classes.gridTextWrapper}>
                <Divider flexItem className={classes.dividerBlock} />
            </Grid>
        </>
    );
}));

export default DividerComp