import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

const PREFIX = 'Header';

const classes = {
    root: `${PREFIX}-root`,
    mainLabel: `${PREFIX}-mainLabel`,
    mainLabelMobile: `${PREFIX}-mainLabelMobile`,
    Link: `${PREFIX}-Link`,
    LinkMobile: `${PREFIX}-LinkMobile`,
    enterButton: `${PREFIX}-enterButton`,
    enterButtonMobile: `${PREFIX}-enterButtonMobile`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        height: 64,
        backgroundColor: theme.palette.constant.landingBlue,
    },

    [`& .${classes.mainLabel}`]: {
        cursor: "pointer",
        fontWeight: "bold",
        color:theme.palette.constant.textWhite,
        marginLeft: 16,
    },

    [`& .${classes.mainLabelMobile}`]: {
        fontSize: 26,
    },

    [`& .${classes.Link}`]: {
        fontSize: 20,
        margin: 8,
        cursor: "pointer",
        color: theme.palette.constant.textWhite,
    },

    [`& .${classes.LinkMobile}`]: {
        fontSize: 12,
    },

    [`& .${classes.enterButton}`]: {
        //cursor: "default",
        fontWeight: "bold",
        color:theme.palette.constant.textWhite,
        fontSize: 24,
        marginRight: 8,
        // borderRadius: 32,
        // padding: 12,
    },

    [`& .${classes.enterButtonMobile}`]: {
        fontSize: 18,
    }
}));


const Header = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


    return (
        <StyledGrid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.root}>
            <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ maxWidth: 1200, height: 64, }}
            >
                <Grid item>
                    <Typography onClick={() => {
                        router.push({
                            pathname: '/',
                        })
                    }}
                        className={clsx(classes.mainLabel, { [classes.mainLabelMobile]: mobile })} variant="h3"
                    >
                        Ξffect
                    </Typography>
                </Grid>
                <Grid item>
                    {!mobile && <>
                        <Link
                            className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
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
                            className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
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
                            className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
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
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            router.push({
                                pathname: '/main',
                            })
                        }}
                        className={clsx(classes.enterButton, { [classes.enterButtonMobile]: mobile })}
                    >
                        Войти
                    </Button>
                </Grid>
            </Grid>
        </StyledGrid>
    );
}

export default Header