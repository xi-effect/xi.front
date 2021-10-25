import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, AppBar, Toolbar, Stack, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react'


const ChatBar = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
    const theme = useTheme();
    const router = useRouter()

    return (
        <AppBar sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                >

                </Stack>
            </Toolbar>
        </AppBar>
    );
}))

export default ChatBar