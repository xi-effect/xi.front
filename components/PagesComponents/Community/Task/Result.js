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

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { motion } from "framer-motion";
import MarkdownEditor from "../../../OtherComponents/MarkdownEditor/MarkdownEditor";

const arrowVariants = {
    open: {
        rotate: 90,
        x: -15,
    },
    closed: {
        rotate: 0,
    }
}

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

const Result = inject(
    "rootStore",
)(
    observer(({ rootStore, messageStore }) => {
        const theme = useTheme();
        const router = useRouter();
        const [result, setResult] = React.useState(false)
        const [test, setTest] = React.useState(markdown)
        return (
            <>
                <Stack
                    onClick={() => setResult(!result)}
                    // onMouseEnter={() => setHoverCategory(index)}
                    // onMouseLeave={() => setHoverCategory(null)}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        pl: 0,
                        pr: 1,
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary',
                        },
                        zIndex: 1
                    }}
                >
                    <ArrowForwardIosIcon
                        component={motion.svg}
                        variants={arrowVariants}
                        animate={result ? "open" : "closed"}
                        // animate={"closed"}
                        transition={{ type: "ease", duration: 0.2 }}
                        sx={{ fontSize: 8 }}
                    />
                    <Typography
                        variant='subtitle2'
                        sx={{
                            ml: 1,
                            fontSize: 14,
                        }}
                    >
                        {'результат'}
                    </Typography>
                </Stack>
                {result && <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: '100%'
                    }}
                >
                    <MarkdownEditor
                        readOnly={false}
                        content={test}
                        setContent={setTest}
                    />
                </Stack>}
            </>
        );
    })
);

export default Result;
