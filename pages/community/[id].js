import { Button, Grid, Tab, Tabs, Typography, Stack, Box, Divider, useTheme, Avatar } from '@mui/material';

import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Image from "next/image";
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router'

import CustomAvatar from '../../components/OtherComponents/Avatar/CustomAvatar';
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";


const Community = inject('rootStore', 'settingsStore', 'profileStore')(observer(({ rootStore, settingsStore, profileStore }) => {
    // console.log("router.query", router.query.id);

    const router = useRouter()

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            profileStore.loadUserInfo(router.query.id)
        }
    }, [router.query.id]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    
                </Stack>
            </NavigationAll>
        </>
    );
}))

export default Community
