/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, Stack, Box, MenuList, ListItemText, useMediaQuery } from '@mui/material';
import Image from "next/image";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';

import { motion } from "framer-motion";

const arrowVariants = {
    open: {
        rotate: 90,
        x: -10,
    },
    closed: {
        rotate: 0,
    }
}

const MenuCommunity = inject('rootStore', 'uiStore', 'messageStore', 'communityStore')(observer(({ rootStore, uiStore, messageStore, communityStore }) => {
    const router = useRouter()
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"))

    const [hoverCategory, setHoverCategory] = React.useState(null)

    return (
        <>
            {communityStore.categories.map((category, index) => (
                <Stack
                    key={index.toString()}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        width: '100%'
                    }}
                >
                    <Stack
                        onClick={() => communityStore.setCategories(index, 'open', !category.open)}
                        onMouseEnter={() => setHoverCategory(index)}
                        onMouseLeave={() => setHoverCategory(null)}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: '100%',
                            pl: 1,
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
                            animate={category.open ? "open" : "closed"}
                            transition={{ type: "ease", duration: 0.2 }}
                            sx={{ fontSize: 14 }}
                        />
                        <Typography
                            variant='subtitle2'
                            sx={{
                                ml: 1,
                                fontSize: 14,
                            }}
                        >
                            {category.name.toUpperCase()}
                        </Typography>
                        {hoverCategory === index && <AddIcon sx={{ ml: 'auto', mr: 0, fontSize: 20 }} />}
                    </Stack>
                    {
                        category.open && <MenuList
                            sx={{ width: '100%', pl: 2, pr: 1, zIndex: 1 }}
                        >
                            {category.channels.map((channel, indexCh) => (
                                <MenuItem key={indexCh.toString()} dense sx={{ width: '100%', borderRadius: 1 }}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ width: '100%' }}
                                    >
                                        {channel.name}
                                    </Stack>
                                </MenuItem>
                            ))}
                        </MenuList>
                    }
                </Stack>
            ))}
        </>
    )
}));

export default MenuCommunity;