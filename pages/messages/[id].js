/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Box, useMediaQuery, Grid, Stack, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import ChatBar from '../../components/PagesComponents/Messages/ChatBar';
import ChatList from '../../components/PagesComponents/Messages/ChatList';

const Chat = inject('rootStore', 'messageStore')(observer(({ rootStore, messageStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme => theme.breakpoints.up('md'));

    const router = useRouter()
    const { id } = router.query

    React.useEffect(() => {
        messageStore.loadMetaForChat(id)
    }, [])
    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll>
                <ChatList />
                <Stack
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        height: '72px',
                        // maxWidth: 800,
                        zIndex: 10000,
                    }}
                >
                    {mobile && <Box sx={{ maxWidth: 1200, zIndex: 10000, }}>
                        <ChatBar />
                    </Box>}

                </Stack>
            </NavigationAll>
        </>
    );
}))


export default Chat