/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Paper, Box, Divider, Typography, IconButton, Tooltip } from '@mui/material';

import { motion } from "framer-motion";

import PlusOneIcon from '@mui/icons-material/PlusOne';
import { useSnackbar } from 'notistack';
import MenuHomeComp from "./SidebarSecond/MenuHomeComp";
import MenuKnowledgeComp from "./SidebarSecond/MenuKnowledgeComp";
import MenuSettingsComp from "./SidebarSecond/MenuSettingsComp.js";

const HeaderHome = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                    // p: 1
                }}
            >
                Главная
            </Typography>
            <Tooltip arrow title="Создать профиль">
                <IconButton
                    // disableRipple
                    sx={{
                        height: 36,
                        width: 36,
                        borderRadius: '8px',
                        bgcolor: 'secondary.dark',
                        '&:hover': {
                            bgcolor: 'secondary.dark',
                        },
                        boxShadow: 6,
                    }}
                    onClick={() => enqueueSnackbar('Эту функцию мы ещё только разрабатываем', {
                        variant: 'info',
                    })}
                >
                    <PlusOneIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}));

const HeaderKnowledge = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                    // p: 1
                }}
            >
                Знания
            </Typography>
        </Stack>
    )
}));

const HeaderMessages = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                    // p: 1
                }}
            >
                Общение
            </Typography>
        </Stack>
    )
}));

const HeaderSettings = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                    // p: 1
                }}
            >
                Настройки
            </Typography>
        </Stack>
    )
}));

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
                zIndex: 20,
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

                    {router.pathname.includes('/home') && <HeaderHome />}
                    {router.pathname.includes('/knowledge') && <HeaderKnowledge />}
                    {router.pathname.includes('/messages') && <HeaderMessages />}
                    {router.pathname.includes('/settings') && <HeaderSettings />}
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
        </Paper >

    )
}));

export default SidebarSecond
