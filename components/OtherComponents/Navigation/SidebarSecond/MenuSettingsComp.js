/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography } from '@mui/material';

import { motion } from "framer-motion";

const menuHome = [
    {
        id: 0,
        label: "Профиль 1",
        href: '/home?profile=1',
    },
    {
        id: 1,
        label: "Профиль 2",
        href: '/home?profile=2',
    },
    {
        id: 2,
        label: "Профиль 3",
        href: '/home?profile=3',
    },
]

const MenuHomeComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()

    return (
        <>
            {menuHome.map((item, index) => (
                <Typography
                    component={motion.p}
                    whileHover={{ scale: 1.1, marginLeft: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`${item.href}`)}
                    key={index.toString()}
                    sx={{
                        "&:hover": {
                            bgcolor: '',
                        },
                        pl: 1,
                        pr: 1,
                        pt: 0.2,
                        pb: 0.2,
                        fontSize: 22,
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: router.pathname.includes(item.href) ? '' : '',
                        cursor: 'pointer',
                    }}
                >
                    {item.label.toLowerCase()}
                </Typography>))}
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1, marginLeft: 10 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                    "&:hover": {
                        bgcolor: '',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 18,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                }}
            >
                {'создать профиль'}
            </Typography>
        </>
    )
}));

export default MenuHomeComp;