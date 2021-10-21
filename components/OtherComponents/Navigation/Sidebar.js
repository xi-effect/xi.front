/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'

import { Grid, Drawer, Collapse, Stack, Box, List, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

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

const FadeMenuManagment = (props) => {
    const theme = useTheme();

    const router = useRouter()

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            {...props}>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Управление контентом" placement="right" arrow>
                <ListItem onClick={() => router.push('/managment/content')} className={clsx(classes.smallListItem, { [classes.listItemActive]: router.pathname === '/managment/content' })}>
                    <SubjectIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Модерация контента" placement="right" arrow>
                <ListItem onClick={() => router.push('/managment/moderation')} className={clsx(classes.smallListItem, { [classes.listItemActive]: router.pathname === '/managment/moderation' })}>
                    <SettingsEthernetIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Создать учебное заведение" placement="right" arrow>
                <ListItem className={classes.smallListItem} onClick={null}>
                    <AddBoxIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
        </Grid>
    );
}

const Sidebar = inject('store')(observer(({ store, openSideMenu, setOpenSideMenu }) => {
    const theme = useTheme();


    const router = useRouter()

    const [openManagment, setOpenManagment] = React.useState(false)

    // React.useEffect(() => {
    //     if (router.pathname.includes('/managment')) setOpenManagment(true)
    // })

    const menuList = [
        {
            id: 0,
            icon: <HomeIcon />,
            label: "Главная",
            href: '/main',
        },
        {
            id: 1,
            icon: <MenuBookIcon />,
            label: "Знания",
            href: '/knowledge',
            secondMenu: [
                {
                    icon: <SubjectIcon />,
                    label: "Страницы",
                    href: '/knowledge/pages'
                },
                {
                    icon: <FormatListBulletedIcon />,
                    label: "Модули",
                    href: '/knowledge/modules'
                },
            ],
        },
        {
            id: 2,
            icon: <MessageIcon />,
            label: "Общение",
            href: '/messages',
        },
        {
            id: 3,
            icon: <AddToQueueIcon />,
            label: "Студия",
            href: '/managment',
            secondMenu: [
                {
                    icon: <SubjectIcon />,
                    label: "Страницы",
                    href: '/managment/content/pages'
                },
                {
                    icon: <FormatListBulletedIcon />,
                    label: "Модули",
                    href: '/managment/content/modules'
                },
                {
                    icon: <SettingsEthernetIcon />,
                    label: "Модерация",
                    href: '/managment/moderation'
                },
            ],
        },
        {
            id: 4,
            icon: <SettingsIcon />,
            label: "Настройки",
            href: '/settings',
        }
    ]

    return (
        <Drawer
            sx={{
                zIndex: 1,
                width: 210,
                flexShrink: 0,
                backgroundColor: 'background.1',
                '& .MuiDrawer-paper': {
                    backgroundColor: 'background.1',
                    width: 210,
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <Stack
                sx={{ mt: 1, }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0}
            >
                {menuList.map((item, index) => (
                    <Stack
                        sx={{
                            width: "100%",
                        }}
                        key={index.toString()}>
                        <Stack

                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            onClick={() => router.push(item.href)}
                            sx={{
                                width: "calc(100% - 16px)",
                                height: 36,
                                p: 1,
                                pl: 1,
                                m: 1,
                                borderRadius: 4,
                                cursor: "pointer",
                                transition: '0.4s',
                                '&:hover': {
                                    backgroundColor: 'background.2'
                                },
                                backgroundColor: router.pathname.includes(item.href) ? 'background.2' : 'none',
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {item.icon}
                                <Typography> {item.label} </Typography>
                            </Stack>
                            {(item.href === "/messages" || item.href === "/managment" || item.href === "/knowledge") && <ArrowLeftIcon sx={{ transition: "0.2s", transform: router.pathname.includes(item.href) ? "rotate(-90deg)" : "rotate(0deg)", }} />}
                        </Stack>
                        {item?.secondMenu !== undefined && router.pathname.includes(item.href) && item.secondMenu.map((itemMenu, indexMenu) => (
                            <Stack
                                key={indexMenu.toString()}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                onClick={() => router.push(itemMenu.href)}
                                sx={{
                                    width: "calc(100% - 40px)",
                                    height: 36,
                                    p: 1,
                                    pl: 1,
                                    m: 1,
                                    ml: 4,
                                    borderRadius: 4,
                                    cursor: "pointer",
                                    transition: '0.4s',
                                    '&:hover': {
                                        backgroundColor: 'background.2'
                                    },
                                    backgroundColor: router.pathname.includes(itemMenu.href) ? 'background.2' : 'none',
                                }}
                            >

                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    {itemMenu.icon}
                                    <Typography> {itemMenu.label} </Typography>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                ))}
            </Stack>

        </Drawer >
    );
}));

export default Sidebar