import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Divider, AppBar, Toolbar, Input, Stack, Avatar, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import moment from 'moment';

import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ChatItem = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore, item, nextItem }) => {
    const theme = useTheme();

    const [hover, setHover] = React.useState(false);
    const itemDate = new Date(item.sent)
    moment.locale('ru', {
        calendar: {
            lastDay: '[Yesterday, at] HH:mm',
            sameDay: '[Today, at] HH:mm',
            nextDay: '[Tomorrow at] LT',
            lastWeek: 'HH:mm, DD/MM',
            nextWeek: 'dddd [at] LT',
            sameElse: 'L'
        }
    })
    console.log("moment", moment(item.sent).calendar())


    if (nextItem !== null) {
        return (
            <Stack
                onMouseEnter={e => setHover(true)}
                onMouseLeave={e => setHover(false)}
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    position: 'relative',
                    // height: 64,
                    pt: nextItem["sender-name"] === item["sender-name"] ? 0 : 1,
                    // pb: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,
                    pl: 8,
                    pr: 2,
                    mt: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,
                    // m: 1,
                    // ml: 3,
                    borderRadius: 1,
                    width: '100%',
                    maxWidth: 1200,
                    '&:hover': {
                        bgcolor: 'background.1',
                    }
                    // bgcolor: 'background.1',
                }}
            >
                {hover &&
                    <Paper
                        elevation={2}
                        sx={{
                            bgcolor: 'background.1',
                            position: 'absolute',
                            right: 5,
                            top: -15,
                            borderRadius: 1,
                            height: 30,
                            width: 92,
                            color: 'text.main'
                        }}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                p: 0,
                            }}

                        >
                            <Tooltip placement="top-start" title="Цитировать">
                                <IconButton size="small">
                                    <ReplyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Divider sx={{ bgcolor: 'text.dark', height: 16, width: "1px" }} orientation="vertical" />
                            <Tooltip placement="top-start" title="Изменить">
                                <IconButton size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Divider sx={{ bgcolor: 'text.dark', height: 16, width: "1px" }} orientation="vertical" />
                            <Tooltip placement="top-start" title="Удалить для всех">
                                <IconButton size="small">
                                    <DeleteForeverIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Paper>}
                {
                    nextItem["sender-name"] !== item["sender-name"] &&
                    <Avatar
                        sx={{
                            bgcolor: 'background.2',
                            position: 'absolute',
                            left: 5,
                            top: 7,
                            borderRadius: 2,
                            height: 52,
                            width: 52,
                            color: 'text.main'
                        }}
                        variant="square"
                    >
                        {item["sender-name"][0].toUpperCase()}
                    </Avatar>
                }
                {
                    nextItem["sender-name"] !== item["sender-name"] &&
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                    >
                        <Link
                            sx={{
                                fontSize: 22,
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
                        <Typography sx={{ color: 'text.dark' }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                    </Stack>
                }
                {nextItem["sender-name"] === item["sender-name"] && hover && <Typography sx={{ color: 'text.dark', position: 'absolute', left: 20, top: 1, }} variant="subtitle2"> {moment(item.sent).format('LT')} </Typography>}
                <Grid container wrap="nowrap">
                    <Grid item xs>
                        <Typography> {item.content} </Typography>
                    </Grid>
                </Grid>
            </Stack >

        );
    }
    else {
        return null
    }
}))

export default ChatItem