/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, useTheme, Button, Chip, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Tooltip, Box, IconButton, Popper, Grow, MenuList, Paper, ClickAwayListener, Divider, ListItemIcon, ListItemText, useMediaQuery, Container } from '@mui/material';
import Image from "next/image";

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
import UndoIcon from '@mui/icons-material/Undo';
import { useSnackbar } from 'notistack';
import QRCode from "react-qr-code";

const DialogInvite = inject('rootStore')(observer(({ rootStore, openDialogInvite, setOpenDialogInvite }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
    const [step, setStep] = React.useState(0);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialogInvite ?? false}
            onClose={() => setOpenDialogInvite(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
            sx={{
                // height: '100%'
            }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                // spacing={2}
                sx={{
                    height: 64,
                    width: '100%',
                    p: 1,
                }}
            >
                <Typography sx={{ mt: 2, ml: 2, mr: 'auto' }} variant="h5">
                    Создать приглешние в сообщество
                </Typography>
                <Tooltip title="Назад">
                    <span>
                        <IconButton sx={{ color: 'text.secondary', ml: 'auto', mt: 2, mr: 1 }}>
                            <UndoIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Закрыть">
                    <IconButton sx={{ color: 'text.secondary', ml: 1, mt: 2, mr: 1 }} onClick={() => setOpenDialogInvite(false)}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <DialogContent>
                {step === 0 && <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: 660,
                        width: '100%',
                    }}
                >
                    <FormControl
                        fullWidth
                        sx={{
                            mt: 0,
                            pl: 1,
                            pr: 1,
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography sx={{ color: "text.primary" }}>
                                Лимит использования приглашения
                            </Typography>
                        </InputLabel>
                        <Input
                            sx={{ width: "100%", }}
                            label="Лимит использования приглашения"
                            type={"text"}
                        />
                    </FormControl>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            p: 2,
                            width: '100%',
                        }}
                    >
                        {[1, 5, 15, 30, 100, "Без лимита"].map((item, index) => (
                            <Chip
                                clickable
                                key={index.toString()}
                                onClick={null}
                                variant="filled"
                                // color="inherit"
                                label={item}
                                sx={{

                                    // height: 30,
                                    // width: 30,
                                    // borderRadius: 2,
                                    // border: '4px solid'
                                }}
                            />
                        ))}
                    </Stack>
                    <FormControl
                        fullWidth
                        sx={{
                            mt: 1,
                            pl: 1,
                            pr: 1,
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography sx={{ color: "text.primary" }}>
                                Время действия приглашения
                            </Typography>
                        </InputLabel>
                        <Input
                            sx={{ width: "100%", }}
                            label="Время действия приглашения"
                            type={"text"}
                        />
                    </FormControl>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            p: 2,
                            width: '100%',
                        }}
                    >
                        {["1 день", "3 дня", "1 месяц", "Без ограничений"].map((item, index) => (
                            <Chip
                                clickable
                                key={index.toString()}
                                onClick={null}
                                variant="filled"
                                // color="inherit"
                                label={item}
                                sx={{

                                    // height: 30,
                                    // width: 30,
                                    // borderRadius: 2,
                                    // border: '4px solid'
                                }}
                            />
                        ))}
                    </Stack>
                    <Typography
                        sx={{
                            pt: 2,
                            pl: 2,
                            width: '100%',
                        }}
                    >
                        Роль пользователя, которого вы приглашаете:
                    </Typography>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{
                            p: 2,
                            width: '100%',
                        }}
                    >
                        {["Администратор", "Модератор", "Учитель", "Ученик"].map((item, index) => (
                            <Chip
                                clickable
                                key={index.toString()}
                                onClick={null}
                                variant="filled"
                                // color="inherit"
                                label={item}
                                sx={{

                                    // height: 30,
                                    // width: 30,
                                    // borderRadius: 2,
                                    // border: '4px solid'
                                }}
                            />
                        ))}
                    </Stack>
                    <Button
                        onClick={() => setStep(1)}
                        sx={{
                            '&.MuiButton-root': {
                                fontFamily: 'Open Sans, sans-serif',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                fontSize: '18px',
                                lineHeight: '25px',
                                boxShadow: 6,
                                width: '280px',
                                height: '48px',
                                color: 'text.primary',
                                bgcolor: 'secondary.main',
                                borderRadius: '88px',
                                '&:hover': {
                                    bgcolor: 'secondary.main',
                                },
                                mt: 'auto',
                            },
                        }}
                    >
                        Создать приглашение
                    </Button>
                </Stack>}
                {step === 1 && <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: 660,
                        width: '100%',
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: 600,
                            width: 600,
                            bgcolor: '#FFF',
                        }}
                    >
                        <QRCode size={512} value={"123456"} />
                    </Stack>
                    <Button
                        onClick={() => setStep(0)}
                        sx={{
                            '&.MuiButton-root': {
                                fontFamily: 'Open Sans, sans-serif',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                fontSize: '18px',
                                lineHeight: '25px',
                                boxShadow: 6,
                                width: '280px',
                                height: '48px',
                                color: 'text.primary',
                                bgcolor: 'secondary.main',
                                borderRadius: '88px',
                                '&:hover': {
                                    bgcolor: 'secondary.main',
                                },
                                mt: 'auto',
                            },
                        }}
                    >
                        Вернуться к настройкам
                    </Button>
                </Stack>}
            </DialogContent>
        </Dialog >
    )
}));

const Community = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [openDialogInvite, setOpenDialogInvite] = React.useState(false);
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
                    }}
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
            <DialogInvite openDialogInvite={openDialogInvite} setOpenDialogInvite={setOpenDialogInvite} />
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                // role={undefined}
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
                                    <MenuItem sx={{ width: '100%' }} onClick={() => {
                                        setOpenDialogInvite(true)
                                        setOpen(false)
                                    }}>
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

export default Community;