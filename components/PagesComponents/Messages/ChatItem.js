import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Divider, AppBar, Popper, Toolbar, Input, Menu, MenuItem, Stack, Avatar, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

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
import CustomAvatar from '../../OtherComponents/Avatar/CustomAvatar';

const ChatItem = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore, item, nextItem }) => {
    const theme = useTheme();

    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

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
                    // pl: 7,
                    // ml: "156px",
                    pr: 2,
                    // mt: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,
                    // minHeight: nextItem["sender-name"] === item["sender-name"] ? 0 : 132,
                    // m: 1,
                    // ml: 3,
                    mt: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,
                    borderRadius: 1,
                    // width: '100%',
                    maxWidth: 1200,
                    width: "100%",
                    // '&:hover': {
                    //     bgcolor: 'background.1',
                    // }
                    // bgcolor: 'background.1',
                }}
            >
                {
                    nextItem["sender-name"] !== item["sender-name"] &&
                    <Box sx={{ position: 'absolute', top: "12px", left: "2px", height: 64, width: 64, }}>
                        <CustomAvatar avatar={item["sender-avatar"]} viewBox={{ x: '50', y: '-100', width: '732', height: '732' }} />
                    </Box>
                }
                <Stack
                    onContextMenu={handleContextMenu}
                    onMouseEnter={e => setHover(true)}
                    onMouseLeave={e => setHover(false)}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        position: 'relative',
                        // height: 64,
                        // pt: nextItem["sender-name"] === item["sender-name"] ? 0 : 1,
                        // pb: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,

                        pl: 1,

                        // ml: "156px",
                        // pr: 2,
                        // mt: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,
                        // minHeight: nextItem["sender-name"] === item["sender-name"] ? 0 : 132,
                        // m: 1,
                        ml: 10,
                        // borderRadius: 1,
                        // width: '100%',
                        // maxWidth: 1200,
                        width: "calc(100% - 72px)",
                        '&:hover': {
                            bgcolor: 'background.1',
                        }
                        // bgcolor: 'background.1',
                    }}
                >
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

                    <Grid container wrap="nowrap">
                        <Grid item xs>
                            <Typography> {item.content} </Typography>
                        </Grid>
                    </Grid>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                </Stack >
            </Stack >

        );
    }
    else {
        return null
    }
}))

export default ChatItem
