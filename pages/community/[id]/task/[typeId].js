import { Button, Grid, Tab, Tabs, Typography, Stack, Box, Divider, useTheme, Avatar } from '@mui/material';

import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Image from "next/image";
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router'

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";


const TaskPage = inject('rootStore', 'settingsStore', 'profileStore')(observer(({ rootStore, settingsStore, profileStore }) => {
    // console.log("router.query", router.query.id);

    const router = useRouter()

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            //do smth 
        }
    }, [router.query.id]);
    // console.log("router.query", router.query)

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>

            </NavigationAll>
        </>
    );
}))

export default TaskPage
