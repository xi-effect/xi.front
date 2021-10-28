/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { inject, observer } from 'mobx-react'

import { Box, useTheme } from '@mui/material'

import Sidebar from './Sidebar'
import Helpbar from './Helpbar'
import Loading from '../Loading/Loading'
import SideDownbar from './SideDownbar'
import ChatDialog from '../../PagesComponents/Messages/ChatDialog';

const NavigationAll = inject('rootStore', 'settingsStore', 'uiStore')(observer(({ rootStore, settingsStore, uiStore, children }) => {
    const theme = useTheme();
    const router = useRouter()



    React.useEffect(() => {
        rootStore.fetchDataScr(`${rootStore.url}/settings/main/`, "GET")
            .then((data) => {
                console.log(data)
                if (data.a != undefined) {
                    if (data.a == "unauthorized: Missing cookie \"access_token_cookie\"" || data.a == "invalid token: Signature verification failed") {
                        router.push("/login")
                    }
                } else {
                    rootStore.fetchDataScr(`${rootStore.url}/settings/`, "GET")
                        .then((data) => {
                            console.log(data)
                            if (data != undefined) {
                                let emailArr = data.email.split("@", 2)
                                settingsStore.setSettings("username", data.username)
                                settingsStore.setSettings("emailBefore", emailArr[0])
                                settingsStore.setSettings("emailAfter", "@" + emailArr[1])
                                settingsStore.setSettings("darkTheme", data["dark-theme"])
                                settingsStore.setSettings("emailConfirmed", data["email-confirmed"])
                            } else {
                                console.log("Проблемы с сервером")
                            }
                        });
                    // uiStore.setLoading("/main")

                }
            })
    }, [])

    return (
        <>
            {/* {uiStore.loading["/main"] && <Loading />} */}
            {/* {!uiStore.loading["/main"] && */}
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
                <ChatDialog />
            </Box>
            {/* } */}
        </>
    );
}))

export default NavigationAll