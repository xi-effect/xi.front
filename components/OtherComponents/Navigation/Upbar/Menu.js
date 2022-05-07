/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { MenuItem, Stack, Popper, Grow, Tooltip, IconButton, MenuList, Paper, ClickAwayListener, Divider } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { AnimatePresence, motion } from "framer-motion";

const Menu = inject()(observer(() => {
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

    const handleListKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
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
                            <PersonIcon />
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
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                disablePortal
                sx={{
                    zIndex: 10000,
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom-start" ? "left top" : "left bottom",
                        }}
                    >
                        <Paper sx={{
                            position: "absolute", zIndex: 10000, left: -238, width: 248,
                            backgroundColor: "primary.dark",
                        }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ width: "100%" }}
                                >
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        // setOpenDialogInvite(true);
                                        setOpen(false);
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
                                        // setOpenDialogSettings(true);
                                        setOpen(false);
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
                                        // setOpenDialogChannelCreation(true);
                                        setOpen(false);
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
                                        // setOpenDialogCategoryCreation(true);
                                        setOpen(false);
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
                                        // setOpenDialogPrivacy(true);
                                        setOpen(false);
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
        </>
    );
}));

export default Menu;