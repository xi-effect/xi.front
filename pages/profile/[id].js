import { Button, Grid, Tab, Typography, Divider, useTheme, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { styled } from '@mui/material/styles';
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";


const Profile = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();

    return (
        <>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                
            </NavigationAll>

        </>
    );
}))

export default Profile

