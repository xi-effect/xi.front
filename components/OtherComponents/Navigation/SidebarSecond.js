/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Paper, Box, Popper, Grow, Divider, ClickAwayListener, ListItemText, ListItemIcon, MenuItem, MenuList, Typography, IconButton, Tooltip } from '@mui/material';

import { AnimatePresence, motion } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloseIcon from '@mui/icons-material/Close';

import { useSnackbar } from 'notistack';
import MenuHomeComp from "./SidebarSecond/MenuHomeComp";
import MenuCommunity from "./SidebarSecond/MenuCommunity";
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
                        // borderRadius: '8px',
                        // bgcolor: 'secondary.dark',
                        // '&:hover': {
                        //     bgcolor: 'secondary.dark',
                        // },
                        // boxShadow: 6,
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

const HeaderCommunity = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                    // p: 1
                }}
            >
                Тестовое сообщество
            </Typography>
            <Tooltip arrow title="Меню сообщества">
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    sx={{
                        height: 36,
                        width: 36,
                        // borderRadius: '8px',
                        // bgcolor: 'secondary.dark',
                        // '&:hover': {
                        //     bgcolor: 'secondary.dark',
                        // },
                        // boxShadow: 6,
                    }}
                // onClick={() => enqueueSnackbar('Эту функцию мы ещё только разрабатываем', {
                //     variant: 'info',
                // })}
                >
                    <AnimatePresence initial={false} exitBeforeEnter>
                        {!open && <Stack
                            key='arrow'
                            component={motion.div}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <KeyboardArrowDownIcon />
                        </Stack>}
                        {open && <Stack
                            key='close'
                            component={motion.div}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CloseIcon />
                        </Stack>}
                    </AnimatePresence>
                </IconButton>
            </Tooltip>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-end'
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper sx={{ position: 'absolute', left: -244, width: 248 }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ width: '100%' }}
                                >
                                    <MenuItem sx={{ width: '100%' }} onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%' }}
                                        >
                                            Пригласить людей
                                            <PersonAddAlt1Icon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem sx={{ width: '100%' }} onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%' }}
                                        >
                                            Настройки сообщества
                                            <SettingsIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <Divider flexItem />
                                    <MenuItem sx={{ width: '100%' }} onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%' }}
                                        >
                                            Создать канал
                                            <AddCircleIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem sx={{ width: '100%' }} onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%' }}
                                        >
                                            Создать категорию
                                            <CreateNewFolderIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <Divider flexItem />
                                    <MenuItem onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%' }}
                                        >
                                            Уведомления
                                            <NotificationsIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%' }}
                                        >
                                            Конфиденсальность
                                            <LocalPoliceIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <Divider flexItem />
                                    <MenuItem sx={{ width: '100%' }} onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: '100%', color: 'error.main' }}
                                        >
                                            Покинуть сообщество
                                            <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        // spacing={2}
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
            <Tooltip arrow title="Начать диалог">
                <IconButton
                    // disableRipple
                    sx={{
                        height: 36,
                        width: 36,
                        // borderRadius: '8px',
                        // bgcolor: 'secondary.dark',
                        // '&:hover': {
                        //     bgcolor: 'secondary.dark',
                        // },
                        // boxShadow: 6,
                        mt: 0,
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
                    {router.pathname.includes('/community') && <HeaderCommunity />}
                    {router.pathname.includes('/knowledge') && <HeaderKnowledge />}
                    {router.pathname.includes('/messages') && <HeaderMessages />}
                    {router.pathname.includes('/settings') && <HeaderSettings />}
                </Box>
                {router.pathname.includes('/home') && <MenuHomeComp />}
                {router.pathname.includes('/community') && <MenuCommunity />}
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
