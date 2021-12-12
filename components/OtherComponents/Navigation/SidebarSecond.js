/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Paper, Box, Divider, Typography } from '@mui/material';

import { motion } from "framer-motion";

const MenuHomeComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()

    const menuHome = [
        {
            id: 0,
            label: "Профиль 1",
            href: '/home?profile=1',
        },
        {
            id: 1,
            label: "Профиль 2",
            href: '/home?profile=2',
        },
        {
            id: 2,
            label: "Профиль 3",
            href: '/home?profile=3',
        },
    ]


    return (
        <>
            {menuHome.map((item, index) => (
                <Typography
                    component={motion.p}
                    whileHover={{ scale: 1.1, marginLeft: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`${item.href}`)}
                    key={index.toString()}
                    sx={{
                        "&:hover": {
                            bgcolor: '',
                        },
                        pl: 1,
                        pr: 1,
                        pt: 0.2,
                        pb: 0.2,
                        fontSize: 22,
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: router.pathname.includes(item.href) ? '' : '',
                        cursor: 'pointer',
                    }}
                >
                    {item.label.toLowerCase()}
                </Typography>))}
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1, marginLeft: 10 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 18,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                }}
            >
                {'создать профиль'}
            </Typography>
        </>
    )
}));

const MenuKnowledgeComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()


    return (
        <>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1, left: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/pages')}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/pages') ? '' : '',
                }}
            >
                {'cтраницы'}
            </Typography>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1, left: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/modules')}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/modules') ? '' : '',
                }}
            >
                {'модули'}
            </Typography>
            <Divider flexItem light />
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/createpage')}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/page') ? '' : '',
                }}
            >
                {'создание страницы'}
            </Typography>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/createmodule')}
                sx={{
                    "&:hover": {
                        bgcolor: 'primary.light',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/module') ? '' : '',
                }}
            >
                {'создание модуля'}
            </Typography>
            <Divider flexItem light />
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/yourpages')}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/page') ? '' : '',
                }}
            >
                {'ваши страницы'}
            </Typography>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/yourmodules')}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/module') ? '' : '',
                }}
            >
                {'ваши модули'}
            </Typography>
        </>
    )
}));

const MenuSettingsComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()

    const menuSettings = [
        {
            id: 0,
            label: "# Безопасность",
            href: 'secure',
        },
        {
            id: 1,
            label: "# Аватар",
            href: 'useravatar',
        },
        {
            id: 2,
            label: "# Внешний вид",
            href: 'customize',
        },
        {
            id: 3,
            label: "# Приглашения",
            href: 'invite',
        },
    ]

    return (
        <>
            {menuSettings.map((item, index) => (
                <Typography
                    component={motion.p}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/settings?option=${item.href}`)}
                    key={index.toString()}
                    sx={{
                        "&:hover": {
                            bgcolor: '',
                        },
                        pl: 1,
                        pr: 1,
                        pt: 0.2,
                        pb: 0.2,
                        fontSize: 22,
                        width: '100%',
                        borderRadius: 1,
                        cursor: 'pointer',
                        bgcolor: router.pathname.includes(item.href) ? '' : '',
                    }}
                >
                    {item.label.toLowerCase()}
                </Typography>
            ))}
        </>
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
