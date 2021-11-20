import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const Header = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


    return (
        <Grid
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
                sx={{ p: 2, maxWidth: 1200, height: 64, }}
            >
                <Grid item>
                    <Typography onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                    }}
                     variant="h4"
                     sx={{
                         cursor: 'default'
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