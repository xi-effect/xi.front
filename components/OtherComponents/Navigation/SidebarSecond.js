/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Stack, Paper, Box } from "@mui/material";

import MenuHomeComp from "./SidebarSecond/Home";
import MenuCommunity from "./SidebarSecond/Community";
import MenuSettingsComp from "./SidebarSecond/SettingsComp";

import Home from "./SidebarSecondHeaders/Home";
import Community from "./SidebarSecondHeaders/Community";
import Settings from "./SidebarSecondHeaders/Settings";

const SidebarSecond = inject()(observer(() => {
    const router = useRouter();

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
                        fontSize: 32,
                        zIndex: 100,
                        p: 1
                    }}
                >

                    {router.pathname.includes("/home") && <Home />}
                    {router.pathname.includes("/community") && <Community />}
                    {router.pathname.includes("/settings") && <Settings />}
                </Box>
                {router.pathname.includes("/home") && <MenuHomeComp />}
                {router.pathname.includes("/community") && <MenuCommunity />}
                {router.pathname.includes("/settings") && <MenuSettingsComp />}
            </Stack >
        </Paper >

    );
}));

export default SidebarSecond;
