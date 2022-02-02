/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    Divider,
    Paper,
    Skeleton,
    Box,
    useMediaQuery,
    Grid,
    Stack,
    FormControlLabel,
    Button,
    useTheme,
    Menu,
    Hidden,
    IconButton,
    InputBase,
    Switch,
    Typography,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";
import Discussion from "../../../../components/PagesComponents/Community/Discussion";


const DiscussionPage = inject(
    "rootStore",
)(
    observer(({ rootStore, messageStore }) => {
        const theme = useTheme();
        const router = useRouter();
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));
        const mobileSecond = useMediaQuery((theme) => theme.breakpoints.up("md"));


        return (
            <>
                <Head>
                    <title>Ξffect</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <NavigationAll>
                    <Discussion/>
                </NavigationAll>
            </>
        );
    })
);

export default DiscussionPage;

