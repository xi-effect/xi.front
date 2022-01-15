/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';
import PageCompList from './../../../components/PagesComponents/Knowledge/Page/PageCompList';

const Page = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {
    const theme = useTheme();


    React.useEffect(() => {
        // LoadComponents()
        console.log("knowledgeStore.loadPage()")
        knowledgeStore.loadPage()
    }, []);



    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                <Grid
                    sx={{
                        margin: "4px",
                        width: 'calc(100% - 16px)',
                        zIndex: 1,
                    }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    container
                >
                    <PageCompList />
                </Grid>
            </NavigationAll>
        </>
    );
}))


export default Page