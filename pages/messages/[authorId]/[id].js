/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, Stack, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';
import ChatBar from '../../../components/PagesComponents/Messages/ChatBar';

const Chat = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {
    const theme = useTheme();


    return (
        <>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            <NavigationAll>
                <Grid
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    container
                >
                    <Stack
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={0}
                        sx={{
                            width: '100%',
                            maxWidth: "800px",
                        }}
                    >
                        <ChatBar />
                    </Stack>
                </Grid>
            </NavigationAll>
        </>
    );
}))


export default Chat