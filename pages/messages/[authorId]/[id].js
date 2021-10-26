/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Box, Grid, Stack, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';
import ChatBar from '../../../components/PagesComponents/Messages/ChatBar';
import ChatList from '../../../components/PagesComponents/Messages/ChatList';

const Chat = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {
    const theme = useTheme();


    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll>
                <Box
                    sx={{
                        // display: 'block',
                        // position: 'absolute',
                        width: 'calc(100% - 48px)',
                        // height: '100vh',
                        // overflow: 'hidden',
                        transform: "scaleY(-1)",
                    }} >
                    <ChatList />
                </Box>

                <Stack
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        height: '100vh',
                        // maxWidth: 800,
                        zIndex: 10000,
                    }}
                >
                    <Box sx={{ maxWidth: 800, zIndex: 10000,}}>
                        <ChatBar />
                    </Box>

                </Stack>
            </NavigationAll>
        </>
    );
}))


export default Chat