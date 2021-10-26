import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Divider, AppBar, Toolbar, Input, Stack, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const ChatItem = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore, item }) => {
    const theme = useTheme();

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
                height: 64,
                p: 2,
                m: 1,
                ml: 3,
                borderRadius: 4,
                width: '100%',
                maxWidth: 800,
                bgcolor: 'background.1',
            }}
        >
            <Link
                sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    color: 'text.main',
                }}
                // onClick={() => {
                //     router.push({
                //         pathname: '/students',
                //     })
                // }}
                underline="hover"
            >
                {item["sender-name"]}
            </Link>
            <Typography> {item.content} </Typography>
        </Stack>

    );
}))

export default ChatItem