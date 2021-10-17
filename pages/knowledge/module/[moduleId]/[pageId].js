/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Box, Grid, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../../components/OtherComponents/Navigation/NavigationAll';
// import PageCompList from './../../../components/PagesComponents/Knowledge/Page/PageCompList';
// import Toolbar from '../../../components/PagesComponents/Knowledge/Page/Toolbar';
import ModuleInfo from './../../../../components/PagesComponents/Knowledge/Module/ModuleInfo';
import PageCompList from './../../../../components/PagesComponents/Knowledge/Page/PageCompList';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        zIndex: 1,
        //backgroundColor: 'red',
    },
}));

const ModuleId = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    React.useEffect(() => {
        // LoadComponents()
        knowledgeStore.loadModule()
    }, []);



    return (
        <>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid
                    className={classes.main}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    container
                >
                    <ModuleInfo>
                        <Box sx={{ height: 50, }}>
                        </Box>
                        <PageCompList />
                    </ModuleInfo>
                </Grid>
            </NavigationAll>

        </>
    )
}))


export default ModuleId