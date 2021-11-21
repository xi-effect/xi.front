import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import { Divider, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const Header = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


    return (
        <Grid
            component={motion.div}
            initial={false}
            // animate={{ rotate: 360 }}
            // transition={{ duration: 2 }}
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{zIndex: 1,}}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ p: 2, maxWidth: 1520, height: 64, }}
            >
                <Grid item>
                    <Typography
                    component={motion.h4}
                     onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                     }}
                     whileHover={{
                        scale: 1.2,
                        transition: { duration: 1 },
                    }}
                     variant="h4"
                     sx={{
                        cursor: 'pointer',
                     }}
                    >
                        Ξffect
                    </Typography>
                </Grid>
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
                <Grid item>
                    <Button
                        onClick={() => {
                            router.push({
                                pathname: '/home',
                            })
                        }}
                        sx={{
                            color: 'text.main',
                        }}
                    >
                        Войти
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Header