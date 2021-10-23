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
                bgcolor: select ?  'action.hover' : null,
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
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    textVariant: PropTypes.string,
    select: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};




const Sidebar = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore, openSideMenu, setOpenSideMenu }) => {
    const theme = useTheme();


    const router = useRouter()

    const [openManagment, setOpenManagment] = React.useState(false)

    // React.useEffect(() => {
    //     if (router.pathname.includes('/managment')) setOpenManagment(true)
    // })

    const iconList = {
        homeIcon: <HomeIcon />,
        menuBookIcon: <MenuBookIcon />,
        subjectIcon: <SubjectIcon />,
        formatListBulletedIcon: <FormatListBulletedIcon />,
        messageIcon: <MessageIcon />,
        menuBookIcon: <MenuBookIcon />,
        adjustIconGreen: <AdjustIcon sx={{ color: '#4caf50' }} />,
        adjustIconPurple: <AdjustIcon sx={{ color: '#9575cd' }} />,
        adjustIcon: <AdjustIcon />,
        addToQueueIcon: <AddToQueueIcon />,
        settingsEthernetIcon: <SettingsEthernetIcon />,
        settingsIcon: <SettingsIcon />,
    }

    const menuList = [
        {
            id: 0,
            icon: "homeIcon",
            label: "Главная",
            href: '/main',
        },
        {
            id: 1,
            icon: "menuBookIcon",
            label: "Знания",
            href: '/knowledge',
            secondMenu: [
                {
                    icon: "subjectIcon",
                    label: "Страницы",
                    href: '/knowledge/pages'
                },
                {
                    icon: "formatListBulletedIcon",
                    label: "Модули",
                    href: '/knowledge/modules'
                },
            ],
        },
        {
            id: 2,
            icon: "messageIcon",
            label: "Общение",
            href: '/messages',
            type: 'messager',
            secondMenu: [
                {
                    icon: "adjustIconGreen",
                    label: "Класс",
                    bgcolor: "#4caf50",
                    href: null,
                    messages: [
                        {
                            label: "Беседа",
                            mCounter: 1,
                            userId: 234154,
                        },
                        {
                            label: "Личность",
                            mCounter: null,
                            userId: 234154,
                        },
                        {
                            label: "Ещё одна Личность Очень большая",
                            mCounter: 2,
                            userId: 234154,
                        }
                    ]
                },

                {
                    icon: "adjustIconPurple",
                    label: "Преподаватели",
                    bgcolor: "#9575cd",
                    href: null,
                    messages: [
                        {
                            label: "ВВ",
                            mCounter: 1,
                            userId: 234154,
                        },
                        {
                            label: "МТВ",
                            mCounter: 2,
                            userId: 234154,
                        },
                        // {
                        //     label: "КВ",
                        //     mCounter: null,
                        //     userId: 234154,
                        // }
                    ]
                },
                {
                    icon: "adjustIcon",
                    label: "Пользователи",
                    href: '2562456'
                },
            ],
        },
        {
            id: 3,
            icon: "addToQueueIcon",
            label: "Студия",
            href: '/managment',
            secondMenu: [
                {
                    icon: "subjectIcon",
                    label: "Страницы",
                    href: '/managment/content/pages'
                },

                {
                    icon: "formatListBulletedIcon",
                    label: "Модули",
                    href: '/managment/content/modules'
                },
                {
                    icon: "settingsEthernetIcon",
                    label: "Модерация",
                    href: '/managment/moderation'
                },
            ],
        },
        {
            id: 4,
            icon: "settingsIcon",
            label: "Настройки",
            href: '/settings',
        }
    ]

    // return (
    //     <Drawer
    //         sx={{
    //             zIndex: 1,
    //             width: 256,
    //             flexShrink: 0,
    //             backgroundColor: 'background.1',
    //             '& .MuiDrawer-paper': {
    //                 backgroundColor: 'background.1',
    //                 width: 256,
    //             }
    //         }}
    //         variant="permanent"
    //         anchor="left"
    //     >
    //         <Grid
    //             sx={{ mt: 1, }}
    //             container
    //             direction="column"
    //             justifyContent="center"
    //             alignItems="center"
    //         >
    //             {menuList.map((item, index) => (
    //                 <Grid
    //                     key={index.toString()}
    //                     container
    //                     direction="column"
    //                     justifyContent="center"
    //                     alignItems="flex-start"
    //                 >
    //                     <Grid
    //                         container
    //                         direction="row"
    //                         justifyContent="flex-start"
    //                         alignItems="center"
    //                         onClick={() => router.push(item.href)}
    //                         sx={{
    //                             width: "calc(100% - 8px)",
    //                             height: 48,
    //                             p: 0.5,
    //                             pl: 1.5,
    //                             m: 0.5,
    //                             borderRadius: 4,
    //                             cursor: "pointer",
    //                             transition: '0.4s',
    //                             '&:hover': {
    //                                 backgroundColor: 'background.2'
    //                             },
    //                             backgroundColor: router.pathname.includes(item.href) ? 'background.2' : 'none',
    //                         }}
    //                     >
    //                         {iconList[item.icon]}
    //                         <Typography sx={{ ml: 1 }} variant="h5">{item.label}</Typography>
    //                         {(item.href === "/messages" || item.href === "/managment" || item.href === "/knowledge") && <ArrowLeftIcon size="large" sx={{ ml: "auto", fontSize: 32, transition: "0.2s", transform: router.pathname.includes(item.href) ? "rotate(-90deg)" : "rotate(0deg)", }} />}
    //                     </Grid>
    //                     {item?.secondMenu !== undefined && router.pathname.includes(item.href) && item.secondMenu.map((itemMenu, indexMenu) => (
    //                         <Grid
    //                             key={indexMenu.toString()}
    //                             container
    //                             direction="column"
    //                             justifyContent="center"
    //                             alignItems="flex-start"
    //                         >
    //                             <Grid
    //                                 container
    //                                 direction="row"
    //                                 justifyContent="flex-start"
    //                                 alignItems="center"
    //                                 onClick={() => router.push(itemMenu.href)}
    //                                 sx={{
    //                                     position: "relative",
    //                                     width: "calc(100% - 24px)",
    //                                     height: 48,
    //                                     p: 0.5,
    //                                     pl: 1.5,
    //                                     m: 0.5,
    //                                     ml: 2.5,
    //                                     borderRadius: 4,
    //                                     cursor: "pointer",
    //                                     transition: '0.4s',
    //                                     '&:hover': {
    //                                         backgroundColor: 'background.2'
    //                                     },
    //                                     backgroundColor: router.pathname.includes(itemMenu.href) ? 'background.2' : 'none',
    //                                 }}
    //                             >
    //                                 {iconList[itemMenu.icon]}
    //                                 {itemMenu?.messages !== undefined && <Divider sx={{
    //                                     width: "3px",
    //                                     height: 40 * itemMenu.messages.length,
    //                                     position: "absolute",
    //                                     top: 32,
    //                                     left: 22.5,
    //                                     bgcolor: itemMenu.bgcolor,
    //                                     borderRadius: "2px",
    //                                 }} />}
    //                                 <Typography sx={{ ml: 1, }} variant="h6">{itemMenu.label}</Typography>
    //                                 {/* {(item.href === "/messages" || item.href === "/managment" || item.href === "/knowledge") && <ArrowLeftIcon size="large" sx={{ ml: "auto", fontSize: 32, transition: "0.2s", transform: router.pathname.includes(item.href) ? "rotate(-90deg)" : "rotate(0deg)", }} />} */}
    //                             </Grid>
    //                             {itemMenu?.messages !== undefined && itemMenu.messages.map((itemMessager, indexMessager) => (
    //                                 <Grid
    //                                     key={indexMessager.toString()}
    //                                     container
    //                                     direction="column"
    //                                     justifyContent="center"
    //                                     alignItems="flex-start"
    //                                 >
    //                                     <Grid
    //                                         container
    //                                         direction="row"
    //                                         justifyContent="flex-start"
    //                                         alignItems="center"
    //                                         onClick={() => router.push(itemMessager.href)}
    //                                         sx={{
    //                                             position: "relative",
    //                                             width: "calc(100% - 36px)",
    //                                             height: 32,
    //                                             p: 0.5,
    //                                             pl: 1.4,
    //                                             m: 0.5,
    //                                             ml: 4,
    //                                             borderRadius: 4,
    //                                             cursor: "pointer",
    //                                             transition: '0.4s',
    //                                             '&:hover': {
    //                                                 backgroundColor: 'background.2'
    //                                             },
    //                                             backgroundColor: router.pathname.includes(itemMessager.href) ? 'background.2' : 'none',
    //                                         }}
    //                                     >
    //                                         <Divider
    //                                             sx={{
    //                                                 height: "4px",
    //                                                 width: "16px",
    //                                                 bgcolor: itemMenu.bgcolor,
    //                                                 ml: 0,
    //                                                 borderRadius: "2px",
    //                                             }}
    //                                         />
    //                                         <Grid sx={{ maxWidth: itemMessager.mCounter === null ? "200px" : "184px" }} container wrap="nowrap" spacing={2}>
    //                                             <Grid item xs zeroMinWidth>
    //                                                 <Typography sx={{ ml: 1, }} variant="body1" noWrap>{itemMessager.label}</Typography>
    //                                             </Grid>
    //                                         </Grid>
    //                                         {itemMessager.mCounter !== null && <Typography
    //                                             align="center"
    //                                             sx={{
    //                                                 position: "absolute",
    //                                                 top: 5,
    //                                                 right: 5,
    //                                                 height: 22,
    //                                                 width: 22,
    //                                                 borderRadius: 6,
    //                                                 bgcolor: itemMenu.bgcolor,
    //                                             }} variant="body1" noWrap>{itemMessager.mCounter}</Typography>}
    //                                         {/* {(item.href === "/messages" || item.href === "/managment" || item.href === "/knowledge") && <ArrowLeftIcon size="large" sx={{ ml: "auto", fontSize: 32, transition: "0.2s", transform: router.pathname.includes(item.href) ? "rotate(-90deg)" : "rotate(0deg)", }} />} */}
    //                                     </Grid>
    //                                 </Grid>
    //                             ))}
    //                         </Grid>
    //                     ))}
    //                 </Grid>
    //             ))}
    //         </Grid>
    //     </Drawer >
    // );

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
                width: 256,
                height: "100vh",
                flexShrink: 0,
                backgroundColor: 'background.1',
                '& .MuiDrawer-paper': {
                    backgroundColor: 'background.1',
                    width: 256,
                    height: "100vh",
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <TreeView
                defaultExpanded={defaultExpandedFn}
                defaultCollapseIcon={<KeyboardArrowDownIcon fontSize="large" />}
                defaultExpandIcon={<KeyboardArrowRightIcon fontSize="large" />}
                defaultEndIcon={<div style={{ width: 24 }} />}
                sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
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
                    select={router.pathname === "/knowledge"}
                    onClick={() => router.push("/knowledge")}
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
                        selectable={true}
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
                    selectable={true}
                    select={router.pathname.includes("/settings")}
                    onClick={() => router.push("/settings")}
                />
            </TreeView>
        </Drawer >
    )
}));

export default Sidebar