/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Dialog, Stack, DialogContent, DialogActions, Typography, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import { motion } from "framer-motion"

import StepOne from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepOne';
import StepTwo from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepTwo';
import StepThree from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepThree';
import { useUnmount } from 'react-use';
import { useSnackbar } from 'notistack';

const Createpage = inject('knowledgeStore', 'managmentStore', 'uiStore')(observer(({ knowledgeStore, managmentStore, uiStore }) => {
    const theme = useTheme();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useUnmount(() => {
        if (managmentStore.pageCreation.id) {
            managmentStore.savePage(true)
            enqueueSnackbar('Страница сохранена', {
                variant: 'success',
            })
        }
    });

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll>
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