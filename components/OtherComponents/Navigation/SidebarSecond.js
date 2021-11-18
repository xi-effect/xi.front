/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Drawer, Collapse, Box, List, Badge, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

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

const Sidebar = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, setHoverLeft }) => {
    const theme = useTheme();
    const router = useRouter()

    const defaultExpandedFn = () => {
        if (router.pathname.includes("/knowledge")) return ['2']
        if (router.pathname.includes("/managment")) return ['12']
        // if (router.pathname.include("/knowledge")) return ['2']
        return ['1']
    }

    const menuList = [
            {
                id: 0,
                icon: <HomeIcon sx={{fontSize: 28}}/>,
                label: "Главная",
                href: '/main',
            },
            {
                id: 1,
                icon: <MenuBookIcon sx={{fontSize: 28}}/>,
                label: "Знания",
                href: '/knowledge/pages',
            },
            {
                id: 2,
                icon: <MessageIcon sx={{fontSize: 28}}/>,
                label: "Общение",
                href: '/messages',
            },
            {
                id: 3,
                icon: <AddToQueueIcon sx={{fontSize: 28}}/>,
                label: "Студия",
                href: '/managment/content',
            },
            {
                id: 4,
                icon: <SettingsIcon sx={{fontSize: 28}}/>,
                label: "Настройки",
                href: '/settings',
            }
    ]

    return (
        <Stack
        onMouseEnter={() => {
            if(router.pathname.includes('/managment') || router.pathname.includes('/messages') || router.pathname.includes('/knowledge'))   setHoverLeft(true)
        }}
  direction="column"
  justifyContent="flex-start"
  alignItems="center"
  spacing={2}
  sx={{
      position: 'absolute',
      marginTop: 2,
      width: 70,
      height: 'calc(100% - 72px)',
  }}
>
        {menuList.map((item, index) => (
            <>
            <Tooltip placement="right" title={item.label}>
            <IconButton 
            onClick={() => router.push(item.href)}
             sx={{
                 bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
                 borderRadius: 2,
                 }}
                 >
                {item.icon}
            </IconButton>
            </Tooltip>
            </>
        ))}
</Stack>
    )
}));

export default Sidebar
