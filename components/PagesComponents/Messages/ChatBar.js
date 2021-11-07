import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Divider, AppBar, Select, Toolbar, Tabs, Tab, Input, MenuItem, Stack, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const schema = yup.object({
    message: yup.string().max(100).required(),
}).required();

import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import socket from '../../../utils/socket';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? "#455a64"
            : "#90a4ae",
    // flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        // marginLeft: theme.spacing(1),
        // marginBottom: 1,
        // padding: 0,
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChatBar = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore }) => {
    const theme = useTheme();
    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [edit, setEdit] = React.useState(false)
    const [newChatName, setNewChatName] = React.useState("")

    const [expanded, setExpanded] = React.useState(false);

    const onSubmit = data => messageStore.sendMessage(data.message);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUserRoleLabel = (role) => {
        if (role === 'basic') return 'Пользователь'
        if (role === 'moder') return 'Модератор'
        if (role === 'admin') return 'Администратор'
        if (role === 'owner') return 'Владелец'
        if (role === 'muted') return 'Читатель'

    }

    return (
        <Box sx={{
            position: 'fixed',
            top: 'auto',
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // marginLeft: 'calc(50% - 400px)',
                        ml: 37,
                        maxWidth: 1200,
                        minHeight: 64,
                        width: '100%',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: 'background.2',
                        zIndex: 10000,
                        // top: 'auto',
                        // bottom: 0,
                    }}
                >
                    {messageStore.chat.role !== 'muted' && <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: '100%',
                            pt: 2, pl: 2, pr: 2, pb: 0,
                        }}
                    >
                         <Input
                            sx={{ backgroundColor: 'background.2', width: "100%", }}
                            type='text'
                            value={messageStore.chat.newMessage}
                            onChange={(e) => messageStore.setChat("newMessage", e.target.value)}
                            multiline
                            maxRows={5}
                            placeholder="Отправить сообщение"
                        />
                    </Stack>}
                    <Accordion sx={{ width: '100%', mt: 1, mb: 1, }} expanded={expanded}>
                        <AccordionSummary expandIcon={null} sx={{ cursor: 'default !important' }} aria-controls="panel1d-content" id="panel1d-header">
                            <IconButton onClick={() => setExpanded(!expanded)} size="large">
                                <ExpandMoreIcon
                                    sx={{
                                        transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                                        transition: "0.2s",
                                    }}
                                />
                            </IconButton>
                            {(messageStore.chat.role === 'owner' || messageStore.chat.role === 'admin') && <IconButton size="large">
                                <Tooltip title="Добавить пользователя" arrow>
                                    <PersonAddIcon />
                                </Tooltip>
                            </IconButton>}
                            {messageStore.chat.role !== 'muted' && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: 'auto', mr: 0.2 }} edge="end" size="large">
                                <Tooltip title="Отправить" arrow>
                                    <SendIcon sx={{ color: 'text.main' }} />
                                </Tooltip>
                            </IconButton>}
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: 'background.2' }}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {(messageStore.chat.role === 'owner' || messageStore.chat.role === 'admin') && edit &&
                                    <Input
                                        sx={{ backgroundColor: 'background.2', width: "100%", }}
                                        type='text'
                                        value={messageStore.chat.name}
                                        onChange={(e) => messageStore.setChat("name", e.target.value)}
                                        // multiline
                                        maxRows={1}
                                        placeholder="Имя чата"
                                    />
                                }
                                {!edit && <Typography sx={{ cursor: 'default', pl: 2 }} variant="h6">
                                    {`${messageStore.chat.name}`}
                                </Typography>}
                                {(messageStore.chat.role === 'owner' || messageStore.chat.role === 'admin') && !edit && <IconButton onClick={() => setEdit(true)} sx={{ ml: 1 }} size="large">
                                    <Tooltip title="Изменить название чата" arrow>
                                        <ModeEditIcon />
                                    </Tooltip>
                                </IconButton>}
                                {messageStore.chat.role === 'owner' && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: 'auto', mr: 1, color: 'error.dark' }} edge="end" size="large">
                                    <Tooltip title="Удалить чат" arrow>
                                        <DeleteSweepIcon />
                                    </Tooltip>
                                </IconButton>}
                                {messageStore.chat.role !== 'owner' && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: 'auto', mr: 1, color: 'error.dark' }} edge="end" size="large">
                                    <Tooltip title="Выйти из чата" arrow>
                                        <LogoutIcon />
                                    </Tooltip>
                                </IconButton>}
                            </Stack>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="full width tabs example"
                            //variant="fullWidth"
                            // centered
                            >
                                <Tab label={<GroupIcon sx={{ color: 'text.main' }} />} {...a11yProps(0)} />
                                <Tab label={<DescriptionIcon sx={{ color: 'text.main' }} />} {...a11yProps(1)} />
                                <Tab label={<AttachFileIcon sx={{ color: 'text.main' }} />} {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Typography variant="subtitle1">
                                        {`${messageStore.chat.users} пользователей в чате:`}
                                    </Typography>
                                    {messageStore.chat.usersInChat.length !== 0 && messageStore.chat.usersInChat.map((item, index) => (
                                        <Stack
                                            key={index.toString()}
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={0}
                                            sx={{
                                                height: 48,
                                                width: '100%',
                                                // bgcolor: 'background.0',
                                                '&:hover': {
                                                    bgcolor: 'background.1',
                                                },
                                                borderRadius: 2,
                                                transition: '0.8s',
                                            }}
                                        >
                                            <Link
                                                sx={{
                                                    ml: 1,
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
                                                {item.username}
                                            </Link>
                                            <Box sx={{ ml: 'auto', mr: 1 }}>
                                            </Box>
                                            {((messageStore.chat.role === 'admin' && item.role !== 'owner' && item.role !== 'admin' ) || (messageStore.chat.role === 'moder' && item.role !== 'owner' && item.role !== 'admin' && item.role !== 'moder' ) || messageStore.chat.role === 'owner') && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: 1, mr: 1, color: 'error.dark' }} edge="end" size="large">
                                                <Tooltip title="Удалить пользователя" arrow>
                                                    <PersonRemoveIcon />
                                                </Tooltip>
                                            </IconButton>}
                                            {messageStore.chat.role === 'moder' && (item.role != 'moder' && item.role != 'admin' && item.role != 'owner') &&
                                                <FormControl variant="standard" sx={{ ml: 1, mr: 1, width: 150 }}>
                                                    <Select
                                                        // labelId="demo-simple-select-standard-label"
                                                        // id="demo-simple-select-standard"
                                                        value={item.role}
                                                        onChange={() => messageStore.changeUserRole(event.target.value)}
                                                        label="Роль"
                                                    >
                                                        <MenuItem value={'muted'}> Читатель </MenuItem>
                                                        <MenuItem value={'basic'}> Участник </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            }
                                            {messageStore.chat.role === 'admin' && (item.role != 'admin' && item.role != 'owner') &&
                                                <FormControl variant="standard" sx={{ ml: 1, mr: 1, width: 150 }}>
                                                    <Select
                                                        // labelId="demo-simple-select-standard-label"
                                                        // id="demo-simple-select-standard"
                                                        value={item.role}
                                                        onChange={() => messageStore.changeUserRole(event.target.value)}
                                                        label="Роль"
                                                    >
                                                        <MenuItem value={'muted'}> Читатель </MenuItem>
                                                        <MenuItem value={'basic'}> Участник </MenuItem>
                                                        <MenuItem value={'moder'}> Модератор </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            }
                                            {messageStore.chat.role === 'owner' &&
                                                <FormControl variant="standard" sx={{ ml: 1, mr: 1, width: 150 }}>
                                                    <Select
                                                        // labelId="demo-simple-select-standard-label"
                                                        // id="demo-simple-select-standard"
                                                        value={item.role}
                                                        onChange={() => messageStore.changeUserRole(event.target.value)}
                                                        label="Роль"
                                                    >
                                                        <MenuItem value={'muted'}> Читатель </MenuItem>
                                                        <MenuItem value={'basic'}> Участник </MenuItem>
                                                        <MenuItem value={'moder'}> Модератор </MenuItem>
                                                        <MenuItem value={'admin'}> Администратор </MenuItem>
                                                        {/* <MenuItem value={'owner'}> Владелец </MenuItem> */}
                                                    </Select>
                                                </FormControl>
                                            }

                                            {(messageStore.chat.role === 'basic' || messageStore.chat.role === 'muted' || (messageStore.chat.role === 'moder' && (item.role === 'owner' || item.role === 'admin' || item.role === 'moder')) || (messageStore.chat.role === 'admin' && (item.role === 'owner' || item.role === 'admin'))) && <Typography sx={{ ml: 1, mr: 1, width: 150, cursor: 'default' }}> {getUserRoleLabel(item.role)} </Typography>}
                                        </Stack>
                                    ))}
                                </Stack>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                2
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                3
                            </TabPanel>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </Stack>
        </Box>
    );
}))

export default ChatBar