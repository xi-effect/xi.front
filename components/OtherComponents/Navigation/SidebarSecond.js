/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Paper, Box, Divider, Typography } from '@mui/material';

import { motion } from "framer-motion";

import MenuHomeComp from "./SidebarSecond/MenuHomeComp";
import MenuKnowledgeComp from "./SidebarSecond/MenuKnowledgeComp";
import MenuSettingsComp from "./SidebarSecond/MenuSettingsComp.js";

const SidebarSecond = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()

    const getUnreadCount = (counter) => {
        if (counter < 100 && counter > 0) return counter
        if (counter > 99) return "99+"
    }

    return (
        <Paper
            elevation={12}
            sx={{
                zIndex: 0,
                position: 'absolute',
                left: 80,
                m: 0,
                p: 0,
                width: 256,
                height: '100%',
                bgcolor: 'primary.dark'
            }}
        >
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                sx={{

                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "48px",
                        // mt: '16px',
                        fontSize: 32,
                        p: 1
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            // fontSize: 22,
                            // p: 1
                        }}
                    >
                        {router.pathname.includes('/home') && "Главная"}
                        {router.pathname.includes('/knowledge') && "Знания"}
                        {router.pathname.includes('/messages') && "Общение"}
                        {router.pathname.includes('/settings') && "Настройки"}
                    </Typography>
                </Box>
                {router.pathname.includes('/home') && <MenuHomeComp />}
                {router.pathname.includes('/knowledge') && <MenuKnowledgeComp />}
                {router.pathname.includes('/messages') && messageStore.menu.chats.map((item, index) => (
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        component={motion.div}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/messages/${item.id}/`)}
                        key={index.toString()}
                        sx={{
                            "&:hover": {
                                bgcolor: '',
                            },
                            pl: 0.3,
                            pr: 0.3,
                            pt: 0.2,
                            pb: 0.2,
                            width: '100%',
                            borderRadius: 1,
                            bgcolor: router.pathname.includes(item.href) ? '' : '',
                            cursor: 'pointer',
                        }}
                    >
                        <Grid sx={{ width: 'calc(100% - 0px)' }} container wrap="nowrap" spacing={2}>
                            <Grid item xs zeroMinWidth>
                                <Typography sx={{ cursor: 'pointer', }} noWrap>
                                    {item.name.toLowerCase()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle1">
                            {getUnreadCount(item.unread)}
                        </Typography>
                    </Grid>
                ))
                }
                {router.pathname.includes('/settings') && <MenuSettingsComp />}

            </Stack >
        </Paper>

    )
}));

export default SidebarSecond
