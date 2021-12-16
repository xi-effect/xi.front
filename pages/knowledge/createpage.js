/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';

import StepOne from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepOne';
import StepTwo from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepTwo';
import StepThree from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepThree';


const Createpage = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();


    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll haveRightMenuMore>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        width: '100%',
                        zIndex: 1,
                    }}
                >
                    {uiStore.knowledge.activeStep == 0 && <StepOne />}
                    {uiStore.knowledge.activeStep == 1 && <StepTwo />}
                    {uiStore.knowledge.activeStep == 2 && <StepThree />}
                </Grid>
            </NavigationAll>
        </>
    )
}));

export default Createpage;