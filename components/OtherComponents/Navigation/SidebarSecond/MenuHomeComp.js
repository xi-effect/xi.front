/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, MenuList, ListItemText } from '@mui/material';

import { motion } from "framer-motion";

const menuHome = [
    {
        id: 0,
        label: "Профиль 1",
        href: '/home?profile=1',
    },
]

const MenuHomeComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()

    return (
        <MenuList sx={{ width: '100%', }}>
            {menuHome.map((item, index) => (
                <MenuItem
                    selected
                    onClick={() => router.push(`${item.href}`)}
                    key={index.toString()}
                    sx={{
                        "&.Mui-selected": {
                            bgcolor: 'primary.light',
                            '&:hover': {
                                bgcolor: 'primary.light',
                            }
                        },
                        pl: 1,
                        pr: 1,
                        pt: 0.4,
                        pb: 0.4,
                        fontSize: 22,
                        width: '100%',
                        borderRadius: 1,
                        cursor: 'pointer',
                    }}
                >
                    {item.label.toLowerCase()}
                </MenuItem>))}
        </MenuList>
    )
}));

export default MenuHomeComp;