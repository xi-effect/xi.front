import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useSwipeable } from 'react-swipeable';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'

import { Grid, Drawer, AppBar, Toolbar, Box, List, Stack, Badge, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import MessageIcon from '@mui/icons-material/Message';
import SubjectIcon from '@mui/icons-material/Subject';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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

const SideDownbar = inject('rootStore', 'uiStore')(observer(({ window, rootStore, uiStore, openSideMenu, setOpenSideMenu }) => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const router = useRouter()

    const mainIconFn = () => {
        if (router.pathname === "/main") return <HomeIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname === "/knowledge") return <MenuBookIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/knowledge/pages")) return <SubjectIcon fontSize="large" sx={{ ml: 2 }} />
        if (router.pathname.includes("/knowledge/modules")) return <FormatListBulletedIcon fontSize="large" sx={{ ml: 2 }} />
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
        onSwipedUp: toggleDrawer(true),
        delta: 10,
      });

    return (
        <Root>
            <AppBar {...handlers} position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, height: 64,  }}>
                <Toolbar>
                    <StyledBox
                        sx={{
                            position: 'absolute',
                            top: 0,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            visibility: 'visible',
                            right: 0,
                            left: 0,
                            backgroundColor: theme.palette.mode === 'light' ? "#90a4ae" : "#455a64",
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
                    </StyledBox>
                </Toolbar>
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
                        height: '50%',
                        overflow: 'auto',
                        p: 1,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: theme.palette.mode === 'light' ? "#90a4ae" : "#455a64",
                    }
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
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
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
                        select={router.pathname === "/knowledge"}
                        onClick={() => router.push("/knowledge")}
                    />
                    <StyledTreeItem
                        nodeId="21"
                        textVariant="h5"
                        labelText="Страницы"
                        labelIcon={SubjectIcon}
                        //labelInfo="90"
                        select={router.pathname.includes("/knowledge/pages")}
                        onClick={() => router.push("/knowledge/pages")}
                    />
                    <StyledTreeItem
                        nodeId="22"
                        textVariant="h5"
                        labelText="Модули"
                        labelIcon={FormatListBulletedIcon}
                        //labelInfo="2,294"
                        select={router.pathname.includes("/knowledge/modules")}
                        onClick={() => router.push("/knowledge/modules")}
                    />
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <StyledTreeItem
                        nodeId="3"
                        textVariant="h5"
                        labelText="Общение"
                        labelIcon={MessageIcon}
                    >
                        <StyledTreeItem
                            nodeId="31"
                            textVariant="h6"
                            labelText="Класс"
                            labelIcon={SupervisorAccountIcon}
                        // labelInfo="90"
                        >
                            {uiStore.menu.messagerItems[0].chats.map((chatItem, chatIndex) => (
                                <StyledTreeItem
                                    textVariant="subtitle1"
                                    key={chatIndex.toString()}
                                    nodeId={"31" + chatIndex.toString()}
                                    labelText={chatItem.userName}
                                    // labelIcon={InfoIcon}
                                    //select={true}
                                    labelInfo={chatItem?.count !== undefined ? chatItem.count.toString() : null}
                                />
                            ))}
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="32"
                            textVariant="h6"
                            labelText="Преподаватели"
                            labelIcon={SupervisorAccountIcon}
                        // labelInfo="90"
                        >
                            {uiStore.menu.messagerItems[1].chats.map((chatItem, chatIndex) => (
                                <StyledTreeItem
                                    textVariant="subtitle1"
                                    key={chatIndex.toString()}
                                    nodeId={"32" + chatIndex.toString()}
                                    labelText={chatItem.userName}
                                    // labelIcon={InfoIcon}
                                    // select={true}
                                    labelInfo={chatItem?.count !== undefined ? chatItem.count.toString() : null}
                                />
                            ))}
                        </StyledTreeItem>
                    </StyledTreeItem>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <StyledTreeItem
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
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <StyledTreeItem
                        nodeId="15"
                        textVariant="h5"
                        labelText="Настройки"
                        labelIcon={SettingsIcon}
                        select={router.pathname.includes("/settings")}
                        onClick={() => router.push("/settings")}
                    />
                </TreeView>
                {/* </StyledBox> */}
                {/* </Box> */}
            </SwipeableDrawer>
        </Root>
    );
}))

export default SideDownbar;