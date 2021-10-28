/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'

import { Grid, Drawer, Collapse, Box, List, Badge, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import MessageIcon from '@mui/icons-material/Message';
import SubjectIcon from '@mui/icons-material/Subject';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdjustIcon from '@mui/icons-material/Adjust';
import CircleIcon from '@mui/icons-material/Circle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

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
                    <Grid sx={{ maxWidth: labelText === null ? "224px" : "200px" }} container wrap="nowrap" spacing={2}>
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




const Sidebar = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, openSideMenu, setOpenSideMenu }) => {
    const theme = useTheme();
    const router = useRouter()

    const defaultExpandedFn = () => {
        if (router.pathname.includes("/knowledge")) return ['2']
        if (router.pathname.includes("/managment")) return ['12']
        // if (router.pathname.include("/knowledge")) return ['2']
        return ['1']
    }

    return (
        <Drawer
            sx={{
                zIndex: 1,
                width: 296,
                height: "100vh",
                flexShrink: 0,
                backgroundColor: 'background.1',
                '& .MuiDrawer-paper': {
                    backgroundColor: 'background.1',
                    width: 296,
                    height: "100vh",
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <TreeView
                defaultExpanded={defaultExpandedFn()}
                defaultCollapseIcon={<KeyboardArrowDownIcon fontSize="large" />}
                defaultExpandIcon={<KeyboardArrowRightIcon fontSize="large" />}
                defaultEndIcon={<div style={{ width: 24 }} />}
                sx={{ flexGrow: 1, maxWidth: 400, pt: 1, overflowY: 'auto' }}
            >
                <StyledTreeItem
                    nodeId="1"
                    textVariant="h5"
                    labelText="Главная"
                    labelIcon={HomeIcon}
                    select={router.pathname === "/main"}
                    onClick={() => router.push("/main")}
                />
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
                        textVariant="h6"
                        labelText="Страницы"
                        labelIcon={SubjectIcon}
                        //labelInfo="90"
                        select={router.pathname.includes("/knowledge/pages")}
                        onClick={() => router.push("/knowledge/pages")}
                    />
                    <StyledTreeItem
                        nodeId="22"
                        textVariant="h6"
                        labelText="Модули"
                        labelIcon={FormatListBulletedIcon}
                        //labelInfo="2,294"
                        select={router.pathname.includes("/knowledge/modules")}
                        onClick={() => router.push("/knowledge/modules")}
                    />
                </StyledTreeItem>
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
                                onClick={() => router.push("/messages/1/1")}
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
                <StyledTreeItem
                    nodeId="12"
                    textVariant="h5"
                    labelText="Студия"
                    labelIcon={AddToQueueIcon}
                // select={router.pathname === "/managment"}
                // onClick={() => router.push("/managment")}
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
                <StyledTreeItem
                    nodeId="15"
                    textVariant="h5"
                    labelText="Настройки"
                    labelIcon={SettingsIcon}
                    select={router.pathname.includes("/settings")}
                    onClick={() => router.push("/settings")}
                />
            </TreeView>
        </Drawer >
    )
}));

export default Sidebar