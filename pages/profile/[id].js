import { Button, Grid, Tab, Typography, Stack, Box, Divider, useTheme, Avatar } from '@mui/material';

import { inject, observer } from 'mobx-react';

import Head from 'next/head';
import React from 'react';
import Router from 'next/router'

import CustomAvatar from '../../components/OtherComponents/Avatar/CustomAvatar';
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";

const router = Router

const Profile = inject('rootStore', 'settingsStore', 'profileStore')(observer(({ rootStore, settingsStore, profileStore }) => {
    // console.log("router.query", router.query.id);


    React.useEffect(() => {
        const id = window.location.href.split("/").pop();
        profileStore.loadUserInfo(id)
    }, []);

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <NavigationAll>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{
                        p: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{
                            height: "300px",
                            width: '100%',
                        }}
                    >
                        <Box sx={{ height: 290, width: 290, }}>
                            <CustomAvatar avatar={{ ...settingsStore.settings.avatar, bgcolor: null }} viewBox={{ x: '-175', y: '-100', width: '1256', height: '1256' }} />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                            sx={{ pt: 4 }}
                        >
                            <Typography sx={{ cursor: 'default' }} variant="h5">
                                {profileStore.user.name ?? 'Имени нет'}
                            </Typography>
                            <Typography sx={{ cursor: 'default' }} variant="h5">
                                {profileStore.user.surname ?? 'Фамилии нет'}
                            </Typography>
                            <Typography sx={{ cursor: 'default' }} variant="h5">
                                {profileStore.user.username}
                            </Typography>
                        </Stack>

                    </Stack>
                </Stack>
            </NavigationAll>
        </>
    );
}))

export default Profile
