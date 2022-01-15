/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import DataList from '../../components/PagesComponents/Managment/Content/Modules/DataList';


const Yourmodules = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll haveRightToolbar>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        width: '100%',
                        zIndex: 1,
                        p: 2,
                    }}
                >
                    <DataList />
                </Grid>
            </NavigationAll>
        </>
    )
}));

export default Yourmodules;