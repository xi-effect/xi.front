/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { MenuItem, Stack, Popper, Grow, Tooltip, IconButton, MenuList, Paper, ClickAwayListener, Divider, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AnimatePresence, motion } from "framer-motion";

import CustomAvatar from "components/OtherComponents/Avatar/CustomAvatar";


const Menu = inject("userSt")(observer(({ userSt }) => {
    const router = useRouter();
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
            <Tooltip arrow title="Меню сообщества" disableHoverListener={open}>
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
                        <Stack
                            key="arrow"
                            component={motion.div}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CustomAvatar avatar={{ ...userSt.settings.avatar }} height="48px" width="48px" />
                        </Stack>
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
                            position: "absolute", zIndex: 10000, left: -248, top: 10, width: 248,
                            border: "1px solid",
                            // backgroundColor: "primary.dark",
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
                                        router.push(`/profile/${userSt.settings.id}/`);
                                        setOpen(false);
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ width: "100%" }}
                                        >
                                            <AccountBoxIcon />
                                            <Typography sx={{ fontWeight: 800 }}> Профиль </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider flexItem />
                                    <MenuItem sx={{ width: "100%" }} onClick={() => {
                                        setOpen(false);
                                        userSt.logout();
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ width: "100%", color: "error.main" }}
                                        >
                                            <LogoutIcon sx={{ color: "error.main" }} />
                                            <Typography sx={{ fontWeight: 800 }}> Выйти </Typography>
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