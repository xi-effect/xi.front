/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Grow, Drawer, Collapse, Box, List, Badge, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import MessageIcon from '@mui/icons-material/Message';
import SubjectIcon from '@mui/icons-material/Subject';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdjustIcon from '@mui/icons-material/Adjust';
import CircleIcon from '@mui/icons-material/Circle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { motion } from "framer-motion";

const SidebarSecond = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const theme = useTheme();
    const router = useRouter()

    React.useEffect(() => {
        messageStore.loadChatsInMenu()
    }, [])

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

    const menuKnowledge = [
        {
            id: 0,
            label: "Страницы",
            href: '/knowledge/page',
        },
        {
            id: 1,
            label: "Модули",
            href: '/knowledge/module',
        },
    ]

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
            href: 'castomize',
        },
        {
            id: 3,
            label: "# Приглашения",
            href: 'invite',
        },
    ]

    const getUnreadCount = (counter) => {
        if (counter < 100 && counter > 0) return counter
        if (counter > 99) return "99+"
    }

    return (
        <Stack
            // onMouseEnter={() => {
            //     if(router.pathname.includes('/managment') || router.pathname.includes('/messages') || router.pathname.includes('/knowledge'))   setHoverLeft(true)
            // }}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            sx={{
                zIndex: 0,
                position: 'absolute',
                left: 64,
                m: 0,
                p: 0,
                width: 186,
                height: '100%',
            }}
        >
            <Typography
                sx={{
                    width: "100%",
                    height: "48px",
                    bgcolor: '#000',
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    // mt: '16px',
                    fontSize: 24,
                    p: 1
                }}
            >
                {router.pathname.includes('/home') && "Главная"}
                {router.pathname.includes('/knowledge') && "Знания"}
                {router.pathname.includes('/messages') && "Общение"}
                {router.pathname.includes('/settings') && "Настройки"}
            </Typography>
            {router.pathname.includes('/home') && menuHome.map((item, index) => (
                <Typography
                    component={motion.p}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`${item.href}`)}
                    key={index.toString()}
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
                        bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
                        cursor: 'pointer',
                    }}
                >
                    {item.label.toLowerCase()}
                </Typography>
            ))}
            {router.pathname.includes('/home') &&
                <Typography
                    component={motion.p}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        "&:hover": {
                            bgcolor: 'primary.light',
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
                    {'Создать профиль'}
                </Typography>
            }
            {router.pathname.includes('/knowledge') && menuKnowledge.map((item, index) => (
                    <Typography
                        component={motion.p}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`${item.href}s`)}
                        key={index.toString()}
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
                            bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
                            cursor: 'pointer',
                        }}
                    >
                        {item.label.toLowerCase()}
                    </Typography>
                ))
            }
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
                                bgcolor: 'primary.light',
                            },
                            pl: 0.3,
                            pr: 0.3,
                            pt: 0.2,
                            pb: 0.2,
                            width: '100%',
                            borderRadius: 1,
                            bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
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
            {router.pathname.includes('/settings') && menuSettings.map((item, index) => (
                    <Typography
                        component={motion.p}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/settings?option=${item.href}`)}
                        key={index.toString()}
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
                            bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
                        }}
                    >
                        {item.label.toLowerCase()}
                    </Typography>
                ))
            }

        </Stack >
    )
}));

export default SidebarSecond
