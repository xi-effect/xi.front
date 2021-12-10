import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import { Divider, Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography, Container } from '@mui/material';


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
            sx={{ height: "140px", width: '100%', }}
        >
            <Stack
                direction="row"
            >
                <Typography
                    onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                    }}

                    variant="h4"
                    sx={{
                        '&.MuiTypography-root': {
                            mt: '0.5px',
                            cursor: 'pointer',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '40px !important',
                            lineHeight: '50px',
                            letterSpacing: '-0.03em',
                            color: '#1D63FF',
                        }
                        // background: '-webkit-linear-gradient(0deg, #1D63FF -0.36%, #A056FF 46.64%, #32B5FF 96.61%)',
                        // WebkitBackgroundClip: "text",
                        // WebkitTextFillColor: "transparent"
                    }}
                >
                    Ξ
                </Typography>
                <Typography
                    onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                    }}

                    variant="h4"
                    sx={{
                        '&.MuiTypography-root': {
                            cursor: 'pointer',
                            fontFamily: 'IBM Plex Mono',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '40px',
                            lineHeight: '50px',
                            letterSpacing: '-0.03em',
                            background: '-webkit-linear-gradient(0deg, #1D63FF -0.36%, #A056FF 46.64%, #32B5FF 96.61%)',
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        },
                    }}
                >
                    ffect
                </Typography>
            </Stack>
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
                sx={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '25px',
                    width: '180px',
                    height: '60px',
                    color: 'text.main',
                    bgcolor: '#1D63FF',
                    borderRadius: '88px',

                    '&:hover': {
                        bgcolor: '#1D63FF',
                    },
                }}
            >
                Войти
            </Button>
        </Stack>
    );
}

export default Header