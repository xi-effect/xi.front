/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, MenuList, ListItemText } from '@mui/material';

import { motion } from "framer-motion";

const menuSettings = [
    {
        id: 0,
        label: "# Безопасность",
        href: 'secure',
    },
    {
        id: 1,
        label: "# Аватар",
        href: 'useravatar',
    },
    {
        id: 2,
        label: "# Внешний вид",
        href: 'customize',
    },
    {
        id: 3,
        label: "# Приглашения",
        href: 'invite',
    },
]

const MenuSettingsComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()



    return (
        <MenuList sx={{ width: '100%', }}>
            {menuSettings.map((item, index) => (
                <MenuItem
                    selected={router.pathname.includes(item.href)}
                    onClick={() => router.push(`/settings?option=${item.href}`)}
                    key={index.toString()}
                    sx={{
                        "&:hover": {
                            bgcolor: '',
                        },
                        pl: 1,
                        pr: 1,
                        pt: 0.4,
                        pb: 0.4,
                        fontSize: 22,
                        width: '100%',
                        borderRadius: 1,
                        cursor: 'pointer',
                        bgcolor: router.pathname.includes(item.href) ? '' : '',
                    }}
                >
                    <ListItemText>
                        {item.label.toLowerCase()}
                    </ListItemText>
                </MenuItem>
            ))}
        </MenuList>
    )
}));

export default MenuSettingsComp;