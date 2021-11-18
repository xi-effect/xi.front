/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Grow, Drawer, Collapse, Box, List, Badge, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

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

const SidebarSecond = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const theme = useTheme();
    const router = useRouter()

    const menuKnowledge = [
            {
                id: 0,
                label: "Страницы",
                href: '/knowledge/page',
            },
            {
                id: 1,
                label: "Модули",
                href: '/knowledge/module',
            },
    ]

    const menuManagment = [
        {
            id: 0,
            label: "Страницы",
            href: '/managment/content/page',
        },
        {
            id: 1,
            label: "Модули",
            href: '/managment/content/module',
        },
]

    return (
        <Grow
        in={hoverLeftName !== null}
        style={{ transformOrigin: '0 0 0' }}
        {...(hoverLeftName !== null ? { timeout: 1500 } : {})}
      >
        <Stack
        // onMouseEnter={() => {
        //     if(router.pathname.includes('/managment') || router.pathname.includes('/messages') || router.pathname.includes('/knowledge'))   setHoverLeft(true)
        // }}
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-start"
  spacing={1}
  sx={{
    zIndex: 0,
      position: 'absolute',
      marginTop: 2,
      marginLeft: 8,
      width: 128,
      height: 'calc(100% - 72px)',
  }}
>
        {hoverLeftName === '/knowledge' && menuKnowledge.map((item, index) => (
            <Typography
            onClick={() => router.push(`${item.href}s`)}
             key={index.toString()}
             sx={{
                 pl: 1,
                 pr: 1,
                 pt: 0.5,
                 pb: 0.5,
                 width: '100%',
                 borderRadius: 1,
                 bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
                 cursor: 'pointer',
             }}
             >
                {item.label}
            </Typography>
        ))}
                {hoverLeftName === '/managment/content' && menuManagment.map((item, index) => (
            <Typography
            onClick={() => router.push(`${item.href}s`)}
             key={index.toString()}
             sx={{
                 pl: 1,
                 pr: 1,
                 pt: 0.5,
                 pb: 0.5,
                 width: '100%',
                 borderRadius: 1,
                 bgcolor: router.pathname.includes(item.href) ? 'tertiary.main' : 'secondary.main',
                 cursor: 'pointer',
             }}
             >
                {item.label}
            </Typography>
        ))}
</Stack>
</Grow>
    )
}));

export default SidebarSecond
