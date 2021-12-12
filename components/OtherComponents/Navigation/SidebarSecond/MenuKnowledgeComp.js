/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Stack, Paper, Box, Divider, Typography } from '@mui/material';

import { motion } from "framer-motion";


const MenuKnowledgeComp = inject('rootStore', 'uiStore', 'messageStore')(observer(({ rootStore, uiStore, messageStore, hoverLeft, hoverLeftName, setHoverLeft }) => {
    const router = useRouter()


    return (
        <>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/pages')}
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
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/pages') ? '' : '',
                }}
            >
                {'cтраницы'}
            </Typography>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/modules')}
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
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/modules') ? '' : '',
                }}
            >
                {'модули'}
            </Typography>
            <Divider flexItem light />
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/createpage')}
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
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/page') ? '' : '',
                }}
            >
                {'создание страницы'}
            </Typography>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/createmodule')}
                sx={{
                    "&:hover": {
                        bgcolor: 'primary.light',
                    },
                    pl: 1,
                    pr: 1,
                    pt: 0.2,
                    pb: 0.2,
                    fontSize: 22,
                    width: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/module') ? '' : '',
                }}
            >
                {'создание модуля'}
            </Typography>
            <Divider flexItem light />
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/yourpages')}
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
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/page') ? '' : '',
                }}
            >
                {'ваши страницы'}
            </Typography>
            <Typography
                component={motion.p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/knowledge/yourmodules')}
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
                    cursor: 'pointer',
                    bgcolor: router.pathname.includes('/knowledge/module') ? '' : '',
                }}
            >
                {'ваши модули'}
            </Typography>
        </>
    )
}));

export default MenuKnowledgeComp;