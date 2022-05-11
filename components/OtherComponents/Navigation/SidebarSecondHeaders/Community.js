/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { Box, Typography, Stack, Tooltip, IconButton, Popper, Grow, Paper, ClickAwayListener } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CloseIcon from "@mui/icons-material/Close";

import CommunityMenu from "kit/CommunityMenu";

const Community = inject()(observer(() => {
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
            <Popper
                open={open}
                anchorEl={anchorRef.current}
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
                                <Box>
                                    <CommunityMenu open={open} setOpen={setOpen} handleListKeyDown={handleListKeyDown} handleClose={handleClose} />
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Stack>
    );
}));

export default Community;