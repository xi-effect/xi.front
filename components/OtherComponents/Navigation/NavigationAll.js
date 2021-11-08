/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { inject, observer } from 'mobx-react'

import { Box, Button, useTheme } from '@mui/material'

import Sidebar from './Sidebar'
import Helpbar from './Helpbar'
import Loading from '../Loading/Loading'
import SideDownbar from './SideDownbar'
import ChatDialog from '../../PagesComponents/Messages/ChatDialog';

import { io } from "socket.io-client";

import socket from '../../../utils/socket'

const NavigationAll = inject('rootStore', 'settingsStore', 'uiStore', 'messageStore')(observer(({ rootStore, settingsStore, uiStore, messageStore, children }) => {
    const theme = useTheme();
    const router = useRouter()

    React.useEffect(() => {
        socket = io("https://xieffect-socketio.herokuapp.com/", {
            withCredentials: true,
        });
        rootStore.fetchDataScr(`${rootStore.url}/settings/main/`, "GET")
            .then((data) => {
                if (data) {
                    console.log("settings/main", data)

                    messageStore.loadChatsInMenu()
                    uiStore.setLoading("navigation", false)
                    settingsStore.setSettings("darkTheme", data["dark-theme"])
                    settingsStore.setSettings("id", data.id)
                    settingsStore.setSettings("username", data.username)
                }
            })
        rootStore.fetchDataScr(`${rootStore.url}/settings/`, "GET")
            .then((data) => {
                if (data) {
                    console.log("settings", data)
                    settingsStore.setSettings("avatar", data["avatar"])
                }
            })
    }, [])

    // const socketClick = () => {
    //     socket.emit("open", {
    //         "chat-id": 2,
    //         "data": {}
    //     });
    // }

    // if (socket != null) {
    //     socket.on("hello", (arg) => {
    //         console.log(arg);
    //     })
    // }

    return (
        <>
            {uiStore.loading["navigation"] && <Loading />}
            {!uiStore.loading["navigation"] &&
                <Box sx={{
                    zIndex: 0,
                    display: 'flex',
                    backgroundColor: 'background.1',
                    minHeight: "100vh",
                }}>
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block', } }}>
                        <Sidebar />
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', } }}>
                        <SideDownbar />
                    </Box>
                    {/* <Helpbar openHelpMenu={openHelpMenu} setOpenHelpMenu={setOpenHelpMenu} /> */}
                    <Box
                        sx={{
                            zIndex: 0,
                            margin: 0,
                            //height: "100vh",
                            width: "100%",
                            backgroundColor: 'background.0',
                        }}
                    >
                        {children}
                    </Box>
                    {/* <Button sx={{ position: 'absolute', top: 64, left: 512 }} onClick={socketClick}>
                        Click
                    </Button> */}
                    <ChatDialog />
                </Box>
            }
        </>
    );
}))

export default NavigationAll