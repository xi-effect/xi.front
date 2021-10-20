import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Skeleton, Grid, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'
import Text from './Components/Text';
import AlertComp from './Components/AlertComp';
import Header from './Components/Header';
import DividerComp from './Components/DividerComp';
import ImageComp from './Components/ImageComp';
import Quiz from './Components/Quiz';


const PageCompList = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();


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
            sx={{
                marginTop: 2,
                maxWidth: "800px",
                zIndex: 1,
            }}
        >
            {knowledgeStore.page.components.map((value, index) => (
                <Grid sx={{
                    border: 0,
                    width: "calc(100% - 4px)",
                    margin: "1px",
                    padding: "1px",
                }} key={index}>
                    {knowledgeStore.page.loading ? <Skeleton variant="rectangular" animation="wave" height={64} /> :
                        componentsSelect(value, index)}
                </Grid>
            ))}
        </Grid>
    );
}));


export default PageCompList;