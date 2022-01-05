/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, Stack, Box, MenuList, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import Image from "next/image";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ForumIcon from '@mui/icons-material/Forum';
import TodayIcon from '@mui/icons-material/Today';

import { motion } from "framer-motion";

const arrowVariants = {
    open: {
        rotate: 90,
        x: -15,
    },
    closed: {
        rotate: 0,
    }
}
const Channel = inject('rootStore', 'uiStore', 'messageStore', 'communityStore')(observer(({ rootStore, uiStore, messageStore, communityStore, index }) => {
    const channel = communityStore.channels[index]
    const [hoverCategory, setHoverCategory] = React.useState(null)

    const iconSelect = (type) => {
        if (type === "schedule") return <TodayIcon fontSize="small" />
        if (type === "chat") return <ForumIcon fontSize="small" />
        if (type === "voiceroom") return <RecordVoiceOverIcon fontSize="small" />
    }

    if (channel.isCategory) {
        return (
            <Stack
                key={index.toString()}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    mt: "2px",
                    mb: "2px",
                    width: '100%'
                }}
            >
                <Stack
                    onClick={() => communityStore.setChannel(index, 'open', !channel.open)}
                    onMouseEnter={() => setHoverCategory(index)}
                    onMouseLeave={() => setHoverCategory(null)}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        pl: 0,
                        pr: 1,
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary',
                        },
                        zIndex: 1
                    }}
                >
                    <ArrowForwardIosIcon
                        component={motion.svg}
                        variants={arrowVariants}
                        animate={channel.open ? "open" : "closed"}
                        transition={{ type: "ease", duration: 0.2 }}
                        sx={{ fontSize: 8 }}
                    />
                    <Typography
                        variant='subtitle2'
                        sx={{
                            ml: 1,
                            fontSize: 14,
                        }}
                    >
                        {channel.name.toLowerCase()}
                    </Typography>
                    {hoverCategory === index && <AddIcon sx={{ ml: 'auto', mr: 0, fontSize: 20 }} />}
                </Stack>
                {
                    channel.open && <MenuList
                        sx={{ width: '100%', pl: 2, pr: 1, zIndex: 1 }}
                    >
                        {channel.underchannels.map((underchannel, indexCh) => (
                            <MenuItem key={indexCh.toString()} sx={{ width: '100%', borderRadius: 1, height: 36, }}>
                                <ListItemIcon
                                    sx={{
                                        "&.MuiListItemIcon-root": {
                                            minWidth: 16,
                                            fontSize: 26,

                                        }
                                    }}
                                >
                                    {iconSelect(underchannel.type)}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        pl: 1
                                    }}
                                >
                                    {underchannel.name}
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                }
            </Stack>
        )
    }
    if (!channel.isCategory) {
        return (
            <MenuItem sx={{ width: '100%', borderRadius: 1, height: 36, }}>
                <ListItemIcon
                    sx={{
                        "&.MuiListItemIcon-root": {
                            minWidth: 16,
                            fontSize: 26,

                        }
                    }}
                >
                    {iconSelect(channel.type)}
                </ListItemIcon>
                <ListItemText
                    sx={{
                        pl: 1
                    }}
                >
                    {channel.name}
                </ListItemText>
            </MenuItem>
        )
    }
}));

const MenuCommunity = inject('rootStore', 'uiStore', 'messageStore', 'communityStore')(observer(({ rootStore, uiStore, messageStore, communityStore }) => {
    const router = useRouter()
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"))
    return (
        <MenuList
            sx={{ width: '100%', pl: 1, pr: 1, zIndex: 1 }}
        >
            {communityStore.channels.map((channel, index) => (
                <Channel index={index} key={index.toString()} />
            ))}
        </MenuList>
    )
}));

export default MenuCommunity;