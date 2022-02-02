import { styled } from "@mui/material/styles";
import Router from "next/router"
import Image from "next/image"
import React from "react";
import clsx from "clsx"
import { useRouter } from "next/router"
import { Divider, AppBar, Select, Toolbar, Tabs, Tab, Input, MenuItem, Stack, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from "@mui/material";

import { inject, observer } from "mobx-react"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const schema = yup.object({
    message: yup.string().max(100).required(),
}).required();

import SendIcon from "@mui/icons-material/Send";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import socket from "../../../utils/socket";

const ChatBar = inject("rootStore", "uiStore", "messageStore")(observer(({ rootStore, uiStore, messageStore }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("xl"));
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
        if (role === "basic") return "Пользователь"
        if (role === "moder") return "Модератор"
        if (role === "admin") return "Администратор"
        if (role === "owner") return "Владелец"
        if (role === "muted") return "Читатель"
    }

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{
                minHeight: 72,
                // width: "100%",
                // m: 0,
                pb: 1,
                position: "fixed",
                left: "336px",
                right: "256px",
                bottom: 0,
                bgcolor: "background.main"
            }}
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    minHeight: 48,
                    width: "calc(100% - 72px)",
                    p: 1,
                    ml: 2,
                    bgcolor: "grey.800",
                    borderRadius: 2,
                }}
            >
                <Input
                    sx={{
                        width: "100%",
                    }}
                    type="text"
                    value={messageStore.chat.newMessage}
                    onChange={(e) => messageStore.setChat("newMessage", e.target.value)}
                    multiline
                    maxRows={5}
                    placeholder="Написать в чат"
                    disableUnderline
                    fullWidth
                />
            </Stack>
            <Tooltip title="Отправить">
                <IconButton
                    color="inherit"
                    sx={{
                        bgcolor: "primary.main",
                        boxShadow: 6,
                        "&:hover": {
                            bgcolor: "primary.main",
                        }
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}))

export default ChatBar

{/* <Accordion sx={{ width: "100%", mt: 1, mb: 1, }} expanded={expanded}>
                        <AccordionSummary expandIcon={null} sx={{ cursor: "default !important" }} aria-controls="panel1d-content" id="panel1d-header">
                            <IconButton onClick={() => setExpanded(!expanded)} size="large">
                                <ExpandMoreIcon
                                    sx={{
                                        transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                                        transition: "0.2s",
                                    }}
                                />
                            </IconButton>
                            {(messageStore.chat.role === "owner" || messageStore.chat.role === "admin") && <IconButton size="large">
                                <Tooltip title="Добавить пользователя" arrow>
                                    <PersonAddIcon />
                                </Tooltip>
                            </IconButton>}
                            {messageStore.chat.role !== "muted" && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: "auto", mr: 0.2 }} edge="end" size="large">
                                <Tooltip title="Отправить" arrow>
                                    <SendIcon sx={{ color: "text.main" }} />
                                </Tooltip>
                            </IconButton>}
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: "background.2" }}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{
                                    width: "100%",
                                }}
                            >
                                {(messageStore.chat.role === "owner" || messageStore.chat.role === "admin") && edit &&
                                    <Input
                                        sx={{ backgroundColor: "background.2", width: "100%", }}
                                        type="text"
                                        value={messageStore.chat.name}
                                        onChange={(e) => messageStore.setChat("name", e.target.value)}
                                        // multiline
                                        maxRows={1}
                                        placeholder="Имя чата"
                                    />
                                }
                                {!edit && <Typography sx={{ cursor: "default", pl: 2 }} variant="h6">
                                    {`${messageStore.chat.name}`}
                                </Typography>}
                                {(messageStore.chat.role === "owner" || messageStore.chat.role === "admin") && !edit && <IconButton onClick={() => setEdit(true)} sx={{ ml: 1 }} size="large">
                                    <Tooltip title="Изменить название чата" arrow>
                                        <ModeEditIcon />
                                    </Tooltip>
                                </IconButton>}
                                {messageStore.chat.role === "owner" && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: "auto", mr: 1, color: "error.dark" }} edge="end" size="large">
                                    <Tooltip title="Удалить чат" arrow>
                                        <DeleteSweepIcon />
                                    </Tooltip>
                                </IconButton>}
                                {messageStore.chat.role !== "owner" && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: "auto", mr: 1, color: "error.dark" }} edge="end" size="large">
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
                                <Tab label={<GroupIcon sx={{ color: "text.main" }} />} {...a11yProps(0)} />
                                <Tab label={<DescriptionIcon sx={{ color: "text.main" }} />} {...a11yProps(1)} />
                                <Tab label={<AttachFileIcon sx={{ color: "text.main" }} />} {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    spacing={1}
                                    sx={{
                                        maxHeight: 400,
                                        overflowY: "auto",
                                    }}
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
                                                width: "100%",
                                                // bgcolor: "background.0",
                                                "&:hover": {
                                                    bgcolor: "background.1",
                                                },
                                                borderRadius: 2,
                                                transition: "0.8s",
                                            }}
                                        >
                                            <Link
                                                sx={{
                                                    ml: 1,
                                                    fontSize: 22,
                                                    cursor: "pointer",
                                                    color: "text.main",
                                                }}
                                                // onClick={() => {
                                                //     router.push({
                                                //         pathname: "/students",
                                                //     })
                                                // }}
                                                underline="hover"
                                            >
                                                {item.username}
                                            </Link>
                                            <Box sx={{ ml: "auto", mr: 1 }}>
                                            </Box>
                                            {((messageStore.chat.role === "admin" && item.role !== "owner" && item.role !== "admin") || (messageStore.chat.role === "moder" && item.role !== "owner" && item.role !== "admin" && item.role !== "moder") || messageStore.chat.role === "owner") && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: 1, mr: 1, color: "error.dark" }} edge="end" size="large">
                                                <Tooltip title="Удалить пользователя" arrow>
                                                    <PersonRemoveIcon />
                                                </Tooltip>
                                            </IconButton>}
                                            {messageStore.chat.role === "moder" && (item.role != "moder" && item.role != "admin" && item.role != "owner") &&
                                                <FormControl variant="standard" sx={{ ml: 1, mr: 1, width: 150 }}>
                                                    <Select
                                                        // labelId="demo-simple-select-standard-label"
                                                        // id="demo-simple-select-standard"
                                                        value={item.role}
                                                        onChange={(e) => messageStore.changeUserRole(e.target.value)}
                                                        label="Роль"
                                                    >
                                                        <MenuItem value={"muted"}> Читатель </MenuItem>
                                                        <MenuItem value={"basic"}> Участник </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            }
                                            {messageStore.chat.role === "admin" && (item.role != "admin" && item.role != "owner") &&
                                                <FormControl variant="standard" sx={{ ml: 1, mr: 1, width: 150 }}>
                                                    <Select
                                                        // labelId="demo-simple-select-standard-label"
                                                        // id="demo-simple-select-standard"
                                                        value={item.role}
                                                        onChange={(e) => messageStore.changeUserRole(e.target.value)}
                                                        label="Роль"
                                                    >
                                                        <MenuItem value={"muted"}> Читатель </MenuItem>
                                                        <MenuItem value={"basic"}> Участник </MenuItem>
                                                        <MenuItem value={"moder"}> Модератор </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            }
                                            {messageStore.chat.role === "owner" &&
                                                <FormControl variant="standard" sx={{ ml: 1, mr: 1, width: 150 }}>
                                                    <Select
                                                        // labelId="demo-simple-select-standard-label"
                                                        // id="demo-simple-select-standard"
                                                        value={item.role}
                                                        onChange={(e) => messageStore.changeUserRole(e.target.value)}
                                                        label="Роль"
                                                    >
                                                        <MenuItem value={"muted"}> Читатель </MenuItem>
                                                        <MenuItem value={"basic"}> Участник </MenuItem>
                                                        <MenuItem value={"moder"}> Модератор </MenuItem>
                                                        <MenuItem value={"admin"}> Администратор </MenuItem>
                                                        {/* <MenuItem value={"owner"}> Владелец </MenuItem> */}
//                                                     </Select >
//                                                 </FormControl >
//                                             }

// { (messageStore.chat.role === "basic" || messageStore.chat.role === "muted" || (messageStore.chat.role === "moder" && (item.role === "owner" || item.role === "admin" || item.role === "moder")) || (messageStore.chat.role === "admin" && (item.role === "owner" || item.role === "admin"))) && <Typography sx={{ ml: 1, mr: 1, width: 150, cursor: "default" }}> {getUserRoleLabel(item.role)} </Typography> }
//                                         </Stack >
//                                     ))}
//                                 </Stack >
//                             </TabPanel >
//                             <TabPanel value={value} index={1}>
//                                 2
//                             </TabPanel>
//                             <TabPanel value={value} index={2}>
//                                 3
//                             </TabPanel>
//                         </AccordionDetails >
//                     </Accordion > * /