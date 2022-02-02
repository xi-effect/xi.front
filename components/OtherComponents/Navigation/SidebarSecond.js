/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { Grid, Stack, Paper, Box, Popper, Grow, Divider, ClickAwayListener, ListItemText, ListItemIcon, MenuItem, MenuList, Typography, IconButton, Tooltip } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";


import { useSnackbar } from "notistack";
import MenuHomeComp from "./SidebarSecond/Home";
import MenuCommunity from "./SidebarSecond/Community";
import MenuKnowledgeComp from "./SidebarSecond/KnowledgeComp";
import MenuSettingsComp from "./SidebarSecond/SettingsComp.js";

import Home from "./SidebarSecondHeaders/Home";
import Community from "./SidebarSecondHeaders/Community";
import Knowledge from "./SidebarSecondHeaders/Knowledge";
import Settings from "./SidebarSecondHeaders/Settings";

const HeaderSettings = inject("rootStore", "uiStore", "messageStore")(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {

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

const SidebarSecond = inject("rootStore", "uiStore", "messageStore")(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
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
                position: "absolute",
                left: 80,
                m: 0,
                p: 0,
                width: 256,
                height: "100vh",
                bgcolor: "primary.dark"
            }}
        >
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    maxHeight: "calc(100vh - 2px)",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "48px",
                        // mt: "16px",
                        fontSize: 32,
                        zIndex: 100,
                        p: 1
                    }}
                >

                    {router.pathname.includes("/home") && <Home />}
                    {router.pathname.includes("/community") && <Community />}
                    {router.pathname.includes("/knowledge") && <Knowledge />}
                    {router.pathname.includes("/settings") && <Settings />}
                </Box>
                {router.pathname.includes("/home") && <MenuHomeComp />}
                {router.pathname.includes("/community") && <MenuCommunity />}
                {router.pathname.includes("/knowledge") && <MenuKnowledgeComp />}
                {router.pathname.includes("/settings") && <MenuSettingsComp />}
            </Stack >
        </Paper >

    )
}));

export default SidebarSecond
