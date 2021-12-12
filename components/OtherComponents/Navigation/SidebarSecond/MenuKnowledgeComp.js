/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Paper, Box, Divider, Typography, MenuItem, MenuList, ListItemText } from '@mui/material';

import { motion } from "framer-motion";


const MenuKnowledgeComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()


    return (
        <MenuList sx={{ width: '100%', }}>
            <MenuItem
                selected={router.pathname.includes('/knowledge/pages')}
                onClick={() => router.push('/knowledge/pages')}
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
                    // bgcolor: router.pathname.includes('/knowledge/pages') ? '' : '',
                }}
            >
                <ListItemText>
                    {'cтраницы'}
                </ListItemText>
            </MenuItem>
            <MenuItem
                selected={router.pathname.includes('/knowledge/modules')}
                onClick={() => router.push('/knowledge/modules')}
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
                    bgcolor: router.pathname.includes('/knowledge/modules') ? '' : '',
                }}
            >
                {'модули'}
            </MenuItem>
            <Divider flexItem light />
            <MenuItem
                selected={router.pathname.includes('/knowledge/createpage')}
                onClick={() => router.push('/knowledge/createpage')}
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
                {'создание страницы'}
            </MenuItem>
            <MenuItem
                selected={router.pathname.includes('/knowledge/createmodule')}
                onClick={() => router.push('/knowledge/createmodule')}
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
                    bgcolor: router.pathname.includes('/knowledge/module') ? '' : '',
                }}
            >
                {'создание модуля'}
            </MenuItem>
            <Divider flexItem light />
            <MenuItem
                selected={router.pathname.includes('/knowledge/yourpages')}
                onClick={() => router.push('/knowledge/yourpages')}
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
                    bgcolor: router.pathname.includes('/knowledge/page') ? '' : '',
                }}
            >
                {'ваши страницы'}
            </MenuItem>
            <MenuItem
                selected={router.pathname.includes('/knowledge/yourmodules')}
                onClick={() => router.push('/knowledge/yourmodules')}
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
                    bgcolor: router.pathname.includes('/knowledge/module') ? '' : '',
                }}
            >
                {'ваши модули'}
            </MenuItem>
        </MenuList>
    )
}));

export default MenuKnowledgeComp;