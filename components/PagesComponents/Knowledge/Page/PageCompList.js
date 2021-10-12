import React from 'react';

import { CircularProgress, Skeleton, Grid, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'
import Text from './Components/Text';
import AlertComp from './Components/AlertComp';
import Header from './Components/Header';
import DividerComp from './Components/DividerComp';
import ImageComp from './Components/ImageComp';
import Quiz from './Components/Quiz';


const useStyles = makeStyles((theme) => ({
    wrapperRoot: {
        marginTop: 16,
        maxWidth: 800,
    },
    wrapper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        width: "calc(100% - 4px)",
        margin: 1,
        padding: 1,
    },
}));


const PageCompList = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const componentsSelect = (value, index) => {
        if (value.type === "h") return (
            <>
                <Header value={value} index={index} />
            </>
        )
        if (value.type === "text") return (
            <>
                <Text value={value} index={index} />
            </>
        )
        if (value.type === "divider") return (
            <>
                <DividerComp value={value} index={index} />
            </>
        )
        if (value.type === "alert") return (
            <>
                <AlertComp value={value} index={index} />
            </>
        )
        if (value.type === "quiz") return (
            <>
                <Quiz value={value} index={index} />
            </>
        )
        if (value.type === "img") return (
            <>
                <ImageComp value={value} index={index} />
            </>
        )
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.wrapperRoot}
        >
            {knowledgeStore.page.components.map((value, index) => (
                <Grid className={classes.wrapper} key={index}>
                    {knowledgeStore.page.loading ? <Skeleton variant="rect" animation="wave" height={64} /> :
                        componentsSelect(value, index)}
                </Grid>
            ))}
        </Grid>
    )
}));


export default PageCompList;