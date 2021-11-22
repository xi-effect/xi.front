import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import { Divider, Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const Header = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


    return (
        <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ zIndex: 1, p: 2, maxWidth: 1520, height: 64, width: '100%', }}
        >
            <Typography
                onClick={() => {
                router.push({
                    pathname: '/',
                })
                }}

                variant="h4"
                sx={{cursor: 'pointer', }}
            >
                Ξffect
            </Typography>
            {/* <Grid item>
                {!mobile && <>
                    <Link

                        onClick={() => {
                            router.push({
                                pathname: '/students',
                            })
                        }}
                        underline="hover"
                    >
                        Ученикам
                    </Link>
                    <Link
                        
                        onClick={() => {
                            router.push({
                                pathname: '/teachers',
                            })
                        }}
                        underline="hover"
                    >
                        Преподавателям
                    </Link>
                    <Link
                        
                        onClick={() => {
                            router.push({
                                pathname: '/schools',
                            })
                        }}
                        underline="hover"
                    >
                        Школам
                    </Link>
                </>}
            </Grid> */}
            <Button
                onClick={() => {
                    router.push({
                        pathname: '/home',
                    })
                }}
                sx={{  color: 'text.main', }}
            >
                Войти
            </Button>
        </Stack>
    );
}

export default Header