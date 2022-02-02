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

import NavigationAll from "../../../OtherComponents/Navigation/NavigationAll";


const NewCommentCreation = inject(
    "rootStore",
)(
    observer(({ rootStore, messageStore }) => {
        const theme = useTheme();
        const router = useRouter();
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));
        const mobileSecond = useMediaQuery((theme) => theme.breakpoints.up("md"));


        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >

            </Stack>
        );
    })
);

export default NewCommentCreation;
