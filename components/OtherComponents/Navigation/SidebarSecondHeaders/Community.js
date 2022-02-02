/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { Typography, MenuItem, useTheme, Tab, Tabs, Radio, Switch, Button, Chip, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Tooltip, Box, IconButton, Popper, Grow, MenuList, Paper, ClickAwayListener, Divider, ListItemIcon, ListItemText, useMediaQuery, Container, DialogActions } from "@mui/material";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/Undo";
import { useSnackbar } from "notistack";
import QRCode from "react-qr-code";
import PropTypes from "prop-types";

import DialogInvite from "./Community/DialogInvite";
import DialogSettings from "./Community/DialogSettings";
import DialogPrivacy from "./Community/DialogPrivacy";
import DialogChannelCreation from "./Community/DialogChannelCreation";
import DialogCategoryCreation from "./Community/DialogCategoryCreation";


const Community = inject("rootStore", "uiStore", "messageStore")(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [openDialogInvite, setOpenDialogInvite] = React.useState(false);
    const [openDialogSettings, setOpenDialogSettings] = React.useState(false);
    const [openDialogChannelCreation, setOpenDialogChannelCreation] = React.useState(false);
    const [openDialogCategoryCreation, setOpenDialogCategoryCreation] = React.useState(false);
    const [openDialogPrivacy, setOpenDialogPrivacy] = React.useState(false);

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
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
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
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    sx={{
                        height: 36,
                        width: 36,
                    }}
                >
                    <AnimatePresence initial={false} exitBeforeEnter>
                        {!open && <Stack
                            key="arrow"
                            component={motion.div}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <KeyboardArrowDownIcon />
                        </Stack>}
                        {open && <Stack
                            key="close"
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
            <DialogSettings openDialogSettings={openDialogSettings} setOpenDialogSettings={setOpenDialogSettings} />
            <DialogPrivacy openDialogPrivacy={openDialogPrivacy} setOpenDialogPrivacy={setOpenDialogPrivacy} />
            <DialogChannelCreation openDialogChannelCreation={openDialogChannelCreation} setOpenDialogChannelCreation={setOpenDialogChannelCreation} />
            <DialogCategoryCreation openDialogCategoryCreation={openDialogCategoryCreation} setOpenDialogCategoryCreation={setOpenDialogCategoryCreation} />
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                // role={undefined}
                placement="bottom-end"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom-start" ? "left top" : "left bottom",
                        }}
                    >
                        <Paper sx={{ position: "absolute", left: -244, width: 248 }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ width: "100%" }}
                                >
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        setOpenDialogInvite(true)
                                        setOpen(false)
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: "100%" }}
                                        >
                                            Пригласить людей
                                            <PersonAddAlt1Icon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        setOpenDialogSettings(true)
                                        setOpen(false)
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: "100%" }}
                                        >
                                            Настройки сообщества
                                            <SettingsIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <Divider flexItem />
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        setOpenDialogChannelCreation(true)
                                        setOpen(false)
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: "100%" }}
                                        >
                                            Создать канал
                                            <AddCircleIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        setOpenDialogCategoryCreation(true)
                                        setOpen(false)
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: "100%" }}
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
                                            sx={{ width: "100%" }}
                                        >
                                            Уведомления
                                            <NotificationsIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        setOpenDialogPrivacy(true)
                                        setOpen(false)
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: "100%" }}
                                        >
                                            Конфиденсальность
                                            <LocalPoliceIcon fontSize="small" />
                                        </Stack>
                                    </MenuItem>
                                    <Divider flexItem />
                                    <MenuItem sx={{ width: "100%" }} onClick={handleClose}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ width: "100%", color: "error.main" }}
                                        >
                                            Покинуть сообщество
                                            <LogoutIcon sx={{ color: "error.main" }} fontSize="small" />
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