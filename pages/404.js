import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, useTheme, Divider, useMediaQuery, Typography, Link } from '@mui/material'
import clsx from 'clsx'

import { useRouter } from 'next/router'


const PREFIX = '404';

const classes = {
    root: `${PREFIX}-root`,
    Link: `${PREFIX}-Link`,
    LinkMobile: `${PREFIX}-LinkMobile`,
    mainLabelGrid: `${PREFIX}-mainLabelGrid`,
    errorNumberLabel: `${PREFIX}-errorNumberLabel`,
    Divider: `${PREFIX}-Divider`,
    errorLabel: `${PREFIX}-errorLabel`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: '0',
        padding: '0',
        backgroundImage: 'url(https://cdna.artstation.com/p/assets/images/images/012/086/010/large/mikael-gustafsson-amongtrees-2-8.jpg?1532971442)',
        height: '100%',
        width: '100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundColor: '#659DBD',
    },

    [`& .${classes.Link}`]: {
        fontSize: 34,
        margin: 8,
        cursor: "pointer",
        color: theme => theme.palette.constant.textWhite,
    },

    [`& .${classes.LinkMobile}`]: {
        fontSize: 28,
    },

    [`& .${classes.mainLabelGrid}`]: {
        margin: 16,
    },

    [`& .${classes.errorNumberLabel}`]: {
        fontSize: 72,
        margin: 8,
        cursor: "default",
        color: theme => theme.palette.constant.textWhite,
    },

    [`& .${classes.Divider}`]: {
        height: 3,
        width: 100,
        backgroundColor: theme => theme.palette.constant.textWhite,
    },

    [`& .${classes.errorLabel}`]: {
        fontSize: 32,
        margin: 8,
        cursor: "default",
        color: theme => theme.palette.constant.textWhite,
    }
}));

export default function _404() {
    const theme = useTheme();


    const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const router = useRouter()

    return (
        <Root className={classes.root}>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "100%" }}
            >
                <Grid item className={classes.mainLabelGrid}>

                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography className={classes.errorNumberLabel}> 404 </Typography>
                    <Divider className={classes.Divider} />
                    <Typography className={classes.errorLabel}> Упс, вы заблудились... </Typography>
                    <Link
                        className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
                        onClick={() => {
                            router.push({
                                pathname: '/',
                            })
                        }}
                        underline="hover"
                    >
                        Вернуться в Ξffect
                    </Link>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </Root>
    );
}