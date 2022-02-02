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

import CustomAvatar from "../../../OtherComponents/Avatar/CustomAvatar";


const Comment = inject(
    "rootStore",
)(
    observer(({ rootStore, messageStore, comment, index }) => {
        const theme = useTheme();
        const router = useRouter();
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));
        const mobileSecond = useMediaQuery((theme) => theme.breakpoints.up("md"));


        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        height: 52,
                        width: 52,
                    }}>
                    <CustomAvatar avatar={{ bgcolor: "none" }} viewBox={{ x: "50", y: "-100", width: "732", height: "732" }} />
                </Box>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "primary.main",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    asfbdabfdsgnfsnhfdmn
                </Stack>
            </Stack>
        );
    })
);

const Comments = inject(
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
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                {[...Array(10)].map((comment, index) => (
                    <Comment comment={comment} index={index} />
                ))}
            </Stack>
        );
    })
);

export default Comments;
