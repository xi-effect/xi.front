/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Box, useMediaQuery, Grid, Stack, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import ChatBar from '../../components/PagesComponents/Messages/ChatBar';
import ChatItem from '../../components/PagesComponents/Messages/ChatItem';

const Chat = inject('rootStore', 'messageStore')(observer(({ rootStore, messageStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme => theme.breakpoints.up('md'));
    const router = useRouter()
    const { id } = router.query
    const messagesEndRef = React.useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    React.useEffect(() => {
        scrollToBottom()
    });

    //messageStore.chat.messages
    // const executeScroll = () => 
    React.useEffect(() => {

        // {behavior: "smooth"}
        const id = window.location.href.split('/').pop();
        console.log("id", id)
        messageStore.loadMetaForChat(id)
        messageStore.loadUsersForChat(id)
        messageStore.loadMessageForChat(id)
    }, [id])
    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll>
                <Stack
                    direction="column-reverse"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ width: '100%', paddingBottom: 10, paddingTop: 10 }}
                >
                    <div ref={messagesEndRef} sx={{ position: 'absolute', bottom: 0, left: 0 }} />
                    {messageStore.chat.messages.map((item, index) => (
                        <Stack
                            key={index.toString()}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: '100%' }}
                        >
                            <ChatItem item={item} nextItem={messageStore.chat.messages.length != index + 1 ? messageStore.chat.messages[index + 1] : null} />
                        </Stack>

                    ))}
                </Stack>
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