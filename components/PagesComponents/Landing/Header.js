import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import { Divider, Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography, Container } from '@mui/material';


const Header = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));


    return (
        <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: mobile ? '100px' : "140px", p: mobile ? '20px' : '40px', width: '100%', }}
        >
            <Stack
                direction="row"
            >
                <Typography
                    component={"h1"}
                    onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                    }}

                    variant="Roboto500XiLabel"
                    sx={{
                        mt: '0.5px',
                        cursor: 'pointer',
                        color: 'secondary.main',
                        fontSize: {
                            sm: '28px',
                            md: '34px',
                            lg: '40px',
                        },
                    }}
                >
                    Ξ
                </Typography>
                <Typography
                    component={"h1"}
                    onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                    }}

                    variant="IBMPlexMono500XiLabelEnd"
                    sx={{
                        '&.MuiTypography-root': {
                            cursor: 'pointer',
                            color: 'secondary.main',
                        },
                        fontSize: {
                            sm: '28px',
                            md: '34px',
                            lg: '40px',
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
                    '&.MuiButton-root': {
                        fontFamily: 'Open Sans, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '25px',
                        width: mobile ? '120px' : '180px',
                        height: mobile ? '40px' : '60px',
                        color: 'text.primary',
                        bgcolor: 'primary.main',
                        borderRadius: mobile ? '62px' : '88px',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                    }
                }}
            >
                Войти
            </Button>
        </Stack>
    );
}

export default Header