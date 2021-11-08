import { Global } from '@emotion/react';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import SubjectIcon from '@mui/icons-material/Subject';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { AppBar, Select, MenuItem, Badge, Link, Box, Button, Tabs, Tab, Divider, Drawer, Grid, Input, FormControl, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useWindowSize } from "react-use";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import * as yup from "yup";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const schema = yup.object({
    message: yup.string().max(100).required(),
}).required();

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
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,

    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        // borderTopRightRadius: theme.spacing(2),
        // borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,

        // fontSize: "20px",
        // '&.MuiTreeItem-iconContainer svg': {
        //     fontSize: "40px",
        // },

        '&.Mui-expanded': {
            //fontWeight: theme.typography.fontWeightRegular,
            //fontSize: "40px",
        },
        '&:hover': {
            // borderRight: `4px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.action.hover,
        },
        // '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
        //     borderRight: `4px solid ${theme.palette.primary.main}`,
        //     backgroundColor: 'var(--tree-view-bg-color)',
        //     color: 'var(--tree-view-color)',
        // },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {
    const theme = useTheme();
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        textVariant,
        select,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            sx={{
                // color: 'primary.main',
                bgcolor: select ? 'action.hover' : null,
                borderRight: select ? `4px solid ${theme.palette.primary.main}` : null,
            }}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1, }} />
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs zeroMinWidth>
                            <Typography sx={{ ml: 1, }} variant={textVariant} noWrap>{labelText}</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType,
    labelInfo: PropTypes.string,
    textVariant: PropTypes.string,
    select: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
};


const drawerBleeding = 64;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    // display: 'none',
    backgroundColor: theme.palette.mode === 'light' ? "#90a4ae" : "#455a64",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? "#90a4ae" : "#455a64",
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
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

const SideDownbar = inject('rootStore', 'uiStore', 'messageStore', 'settingsStore')(observer(({ window, rootStore, uiStore, messageStore, settingsStore, openSideMenu, setOpenSideMenu }) => {
    const { width, height } = useWindowSize();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const router = useRouter()

    const mainIconFn = () => {
        if (router.pathname === "/main") return <HomeIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname === "/knowledge") return <MenuBookIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/knowledge/page")) return <SubjectIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/knowledge/module")) return <FormatListBulletedIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/messages")) return <MessageIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/managment")) return <AddToQueueIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/settings")) return <SettingsIcon fontSize="large" sx={{ ml: 2 }} />

    }

    const defaultExpandedFn = () => {
        if (router.pathname.includes("/knowledge")) return ['2']
        if (router.pathname.includes("/managment")) return ['12']
        // if (router.pathname.include("/knowledge")) return ['2']
        return ['1']
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => console.log("left"),
        onSwipedRight: () => console.log("right"),
        delta: 10,
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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

    const [edit, setEdit] = React.useState(false)

    return (
        <Root>
            <AppBar
                {...handlers}
                onDoubleClick={toggleDrawer(true)}
                position="fixed"
                sx={{
                    top: 'auto',
                    bottom: 0,
                    width: '100%',
                    // height: 72,
                    // backgroundColor: 'primary.main',
                }}
            >
                <StyledBox
                    sx={{
                        // position: 'absolute',
                        // top: 0,
                        width: '100%',

                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        visibility: 'visible',
                        // right: 0,
                        // left: 0,
                        backgroundColor: 'background.2',
                    }}
                >
                    <Puller />
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        // spacing={2}
                        sx={{
                            height: 64,
                        }}
                    >
                        {/* <Box > */}
                        {mainIconFn()}
                        {/* </Box> */}
                        <Typography variant="h4" sx={{ ml: 1, mt: 0.3, color: 'text.secondary' }}>Ξffect</Typography>
                    </Stack>
                    {router.pathname.includes("/messages") && <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            // marginLeft: 'calc(50% - 400px)',
                            ml: 0,
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
                                        sx={{
                                            maxHeight: 250,
                                            overflowY: 'auto',
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
                                                {((messageStore.chat.role === 'admin' && item.role !== 'owner' && item.role !== 'admin') || (messageStore.chat.role === 'moder' && item.role !== 'owner' && item.role !== 'admin' && item.role !== 'moder') || messageStore.chat.role === 'owner') && <IconButton onClick={() => messageStore.sendMessage()} sx={{ ml: 1, mr: 1, color: 'error.dark' }} edge="end" size="large">
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
                    </Stack>}
                </StyledBox>
            </AppBar>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                // swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                sx={{
                    '& .MuiDrawer-paper': {
                        overflow: 'visible',
                        "& ::-webkit-scrollbar": {
                            backgroundColor: theme.palette.mode === 'light' ? "#90a4ae" : "#455a64",
                            width: "8px",
                        },
                        // "& ::-webkit-scrollbar-track": {
                        //     boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
                        // },
                        "& ::-webkit-scrollbar-thumb": {
                            borderRadius: "8px",
                            width: "2px",
                            backgroundColor: theme.palette.mode === 'light' ? "#455a64" : "#90a4ae",
                            minHeight: "24px",
                            border: `2px solid ${theme.palette.mode === 'light' ? "#90a4ae" : "#455a64"}`,
                        },
                        height: height > 700 ? '50%' : '70%',
                        overflow: 'auto',
                        p: 1,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: 'background.2',
                    }
                }}
            >
                <Puller />
                <Stack
                    onDoubleClick={toggleDrawer(false)}

                    // onClick={toggleDrawer(false)}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    // spacing={2}
                    sx={{
                        height: 72,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: 'background.2',
                    }}
                >
                    {/* <Box > */}
                    {mainIconFn()}
                    {/* </Box> */}
                    <Typography variant="h4" sx={{ ml: 1, mt: 0.3, color: 'text.secondary' }}>Ξffect</Typography>
                </Stack>
                <TreeView
                    defaultExpanded={defaultExpandedFn()}
                    defaultCollapseIcon={<KeyboardArrowDownIcon fontSize="large" />}
                    defaultExpandIcon={<KeyboardArrowRightIcon fontSize="large" />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                    sx={{
                        // height: 264,
                        flexGrow: 1,
                        // maxWidth: 400,
                        pt: 1,
                        overflowY: 'auto'
                    }}
                >
                    <StyledTreeItem
                        nodeId="1"
                        textVariant="h5"
                        labelText="Главная"
                        labelIcon={HomeIcon}
                        select={router.pathname === "/main"}
                        onClick={() => router.push("/main")}
                    />
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <StyledTreeItem
                        nodeId="2"
                        labelText="Знания"
                        textVariant="h5"
                        labelIcon={MenuBookIcon}
                    // select={router.pathname === "/knowledge"}
                    // onClick={() => router.push("/knowledge")}
                    >
                        <StyledTreeItem
                            nodeId="21"
                            textVariant="h5"
                            labelText="Страницы"
                            labelIcon={SubjectIcon}
                            //labelInfo="90"
                            select={router.pathname.includes("/knowledge/page")}
                            onClick={() => router.push("/knowledge/pages")}
                        />
                        <StyledTreeItem
                            nodeId="22"
                            textVariant="h5"
                            labelText="Модули"
                            labelIcon={FormatListBulletedIcon}
                            //labelInfo="2,294"
                            select={router.pathname.includes("/knowledge/module")}
                            onClick={() => router.push("/knowledge/modules")}
                        />
                    </StyledTreeItem>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <StyledTreeItem
                        nodeId="3"
                        textVariant="h5"
                        labelText="Общение"
                        labelIcon={MessageIcon}
                    >
                        <StyledTreeItem
                            nodeId="30"
                            textVariant="h6"
                            labelText="Создать чат"
                            labelIcon={PersonAddAlt1Icon}
                            //labelInfo="2,294"
                            onClick={() => messageStore.setUi("openDialog", true)}
                        />
                        {messageStore?.menu?.chats.map((chatItem, chatIndex) => (
                            <StyledTreeItem
                                textVariant="subtitle1"
                                key={chatIndex.toString()}
                                nodeId={"32" + chatIndex.toString()}
                                labelText={chatItem.name}
                                onClick={() => router.push(`/messages/${chatItem.id}`)}
                                // labelIcon={InfoIcon}
                                // select={true}
                                labelInfo={chatItem?.unread !== undefined ? chatItem.unread.toString() : null}
                            />
                        ))}
                    </StyledTreeItem>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    {/* <StyledTreeItem
                        nodeId="12"
                        textVariant="h5"
                        labelText="Студия"
                        labelIcon={AddToQueueIcon}
                        select={router.pathname === "/managment"}
                        onClick={() => router.push("/managment")}
                    >
                        <StyledTreeItem
                            nodeId="13"
                            textVariant="h6"
                            labelText="Страницы"
                            labelIcon={SubjectIcon}
                            select={router.pathname.includes("/managment/content/pages")}
                            onClick={() => router.push("/managment/content/pages")}
                        //labelInfo="90"
                        />
                        <StyledTreeItem
                            nodeId="14"
                            textVariant="h6"
                            labelText="Модули"
                            labelIcon={FormatListBulletedIcon}
                            select={router.pathname.includes("/managment/content/modules")}
                            onClick={() => router.push("/managment/content/modules")}
                        //labelInfo="2,294"
                        />
                    </StyledTreeItem>
                    <Divider sx={{ mt: 1, mb: 1 }} /> */}
                    <StyledTreeItem
                        nodeId="15"
                        textVariant="h5"
                        labelText="Настройки"
                        labelIcon={SettingsIcon}
                        select={router.pathname.includes("/settings")}
                        onClick={() => router.push("/settings")}
                    />
                </TreeView>
            </SwipeableDrawer>
        </Root>
    );
}))

export default SideDownbar;