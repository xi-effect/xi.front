/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'

import { Grid, Drawer, Collapse, Stack, List, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import MessageIcon from '@mui/icons-material/Message';
import SubjectIcon from '@mui/icons-material/Subject';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';



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
                width: 200,
                flexShrink: 0,
                backgroundColor: 'background.1',
                '& .MuiDrawer-paper': {
                    backgroundColor: 'background.1',
                    width: 200,
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
                        key={index.toString()}
                        direction="row"
                        justifyContent="flex-start"
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
                            backgroundColor: router.pathname === item.href ? 'background.2' : 'none',
                        }}
                    >
                        {item.icon}
                        <Typography> {item.label} </Typography>
                    </Stack>))}
            </Stack>

        </Drawer >
    );
}));

export default Sidebar