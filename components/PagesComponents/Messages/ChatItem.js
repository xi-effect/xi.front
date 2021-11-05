import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Divider, AppBar, Popper, Toolbar, Input, MenuList, Menu, MenuItem, Grow, ClickAwayListener, Stack, Avatar, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

const ChatItem = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore, item, nextItem }) => {
    const theme = useTheme();

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


    if (nextItem !== null) {
        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    position: 'relative',
                    pt: nextItem["sender-name"] === item["sender-name"] ? 0 : 1,
                    pr: 2,
                    mt: nextItem["sender-name"] === item["sender-name"] ? 0 : 2,
                    borderRadius: 1,
                    maxWidth: 1200,
                    width: "100%",
                }}
            >
                {nextItem["sender-name"] !== item["sender-name"] && <Box sx={{ position: 'absolute', top: "12px", left: "2px", height: 64, width: 64, }}>
                    <CustomAvatar avatar={item["sender-avatar"]} viewBox={{ x: '50', y: '-100', width: '732', height: '732' }} />
                </Box>}
                <Stack
                    onContextMenu={handleContextMenu}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        position: 'relative',
                        pl: 1,
                        pr: 6,
                        ml: 10,
                        width: "calc(100% - 72px)",
                        '&:hover': {
                            bgcolor: 'background.1',
                        }
                    }}
                >
                    {nextItem["sender-name"] !== item["sender-name"] && <Stack
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
                            underline="hover"
                        >
                            {item["sender-name"]}
                        </Link>
                        <Typography sx={{ color: 'text.dark' }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                    </Stack>}
                    <Grid container wrap="nowrap">
                        <Grid item xs>
                            <Typography> {item.content} </Typography>
                        </Grid>
                    </Grid>
                    <Menu
                        open={contextMenu !== null}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            contextMenu !== null
                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                : undefined
                        }
                    >
                        <Typography align='center' sx={{ color: 'text.dark', width: '100%', }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                        <MenuItem onClick={handleClose}> <ReplyIcon sx={{ mr: 1 }} /> Ответить </MenuItem>
                        <MenuItem onClick={handleClose}> <EditIcon sx={{ mr: 1 }} /> Редактировать</MenuItem>
                        <MenuItem onClick={handleClose}> <DeleteForeverIcon sx={{ mr: 1 }} />Удалить</MenuItem>
                        <MenuItem onClick={handleClose}> <VolumeMuteIcon sx={{ mr: 1 }} /> Заглушить</MenuItem>
                        <MenuItem onClick={handleClose}> <PersonRemoveIcon sx={{ mr: 1 }} /> Удалить пользователя</MenuItem>
                    </Menu>
                </Stack >
            </Stack >

        );
    }
    else {
        return null
    }
}))

export default ChatItem
