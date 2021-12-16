/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Box, Grid, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'

import { inject, observer } from 'mobx-react'

import NavigationAll from '../../../../components/OtherComponents/Navigation/NavigationAll';
import Results from '../../../../components/PagesComponents/Knowledge/Module/Results';


const ModuleId = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {
    const theme = useTheme();


    // React.useEffect(() => {
    //     knowledgeStore.clearModule()
    //     knowledgeStore.loadModule()
    // }, []);



    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll haveRightMenu>
                <Grid
                    sx={{
                        width: '100%',
                        zIndex: 1,
                    }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    container
                >
                    <Results />
                </Grid>
            </NavigationAll>
        </>
    );
}))


export default ModuleId