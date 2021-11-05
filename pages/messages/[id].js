/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Skeleton, Box, useMediaQuery, Grid, Stack, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import ChatBar from '../../components/PagesComponents/Messages/ChatBar';
import ChatItem from '../../components/PagesComponents/Messages/ChatItem';

import InfiniteScroll from 'react-infinite-scroll-component';

const LoadingSkeleton = () => {

    return (
        <>
            {[...Array(15)].map((item, index) => (
                <Stack
                    key={index.toString()}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        width: 'calc(100% - 20px)',
                        marginLeft: "20px",
                    }}
                >
                    <Stack

                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            position: 'relative',
                            pt: 1,
                            pr: 2,
                            mt: 2,
                            borderRadius: 1,
                            // width: '100%',
                            maxWidth: 1200,
                            width: "100%",
                        }}>
                        <Box sx={{ position: 'absolute', top: "12px", left: "2px", height: 64, width: 64, }}>
                            <Skeleton sx={{
                                ml: 1,
                                height: "100%",
                                width: "100%",
                                borderRadius: 1,
                            }} />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                position: 'relative',
                                pl: 1,
                                pr: 6,
                                ml: 10,
                                width: "calc(100% - 72px)",
                            }}
                        >
                            <Skeleton sx={{
                                height: 64,
                                ml: 1,
                                height: "100%",
                                width: "100%",
                                borderRadius: 1,
                            }} />
                        </Stack>
                    </Stack>
                </Stack>
            ))}
        </>
    )
}

const Chat = inject('rootStore', 'messageStore')(observer(({ rootStore, messageStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme => theme.breakpoints.up('md'));
    const router = useRouter()
    // const { id } = router.query

    // //messageStore.chat.messages
    // // const executeScroll = () => 
    React.useEffect(() => {
        // {behavior: "smooth"}
        const id = window.location.href.split('/').pop();
        console.log("id", id)
        messageStore.loadMetaForChat(id)
        messageStore.loadUsersForChat(id)
        messageStore.uploadFirstMessages(id)
    }, [])



    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll>
                {/* <Stack
                    direction="column-reverse"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ width: '100%', paddingBottom: 12, paddingTop: 12, pl: 2, pr: 2 }}
                > */}
                <div
                    id="scrollableDiv"
                    style={{
                        height: "100vh",
                        width: '100%',
                        overflowY: 'auto',
                        overFlowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                    }}
                >
                    {/*Put the scroll bar always on the bottom*/}
                    <InfiniteScroll
                        dataLength={messageStore.chat.messages.length}
                        next={() => messageStore.uploadMoreMessages(messageStore.chat.id)}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        inverse={true} //
                        scrollThreshold={0.6}
                        hasMore={messageStore.chat.hasNext}
                        //endMessage={<Typography align='center' sx={{ color: 'text.main', width: '100%', m: 4 }} variant="subtitle2"> Это всё </Typography>}
                        loader={<LoadingSkeleton />}
                        scrollableTarget="scrollableDiv"
                    >
                        <Stack sx={{ height: "172px" }}>
                        </Stack>
                        {messageStore.chat.messages.length === 0 && <LoadingSkeleton />}
                        {messageStore.chat.messages.map((item, index) => (
                            <Stack
                                key={index.toString()}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{
                                    width: 'calc(100% - 20px)',
                                    marginLeft: "20px",
                                    // marginRight: 2,
                                }}
                            >
                                <ChatItem item={item} nextItem={messageStore.chat.messages.length != index + 1 ? messageStore.chat.messages[index + 1] : null} />
                            </Stack>
                        ))}
                    </InfiniteScroll>
                    <Stack sx={{ height: "172px" }}>
                    </Stack>
                </div>
                {mobile && <Box sx={{ maxWidth: 1200, zIndex: 10000, }}>
                    <ChatBar />
                </Box>}
            </NavigationAll>
        </>
    );
}))


export default Chat