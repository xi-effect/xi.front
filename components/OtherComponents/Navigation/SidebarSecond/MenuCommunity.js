/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, Box, MenuList, ListItemText, useMediaQuery } from '@mui/material';
import Image from "next/image";

import { motion } from "framer-motion";

const categories = [
    {},
    {},
]

const MenuCommunity = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"))

    return (
        <>

        </>
    )
}));

export default MenuCommunity;