import Head from 'next/head'
import { useRouter } from 'next/router'
import clsx from 'clsx';
import { Grid, Stack, InputLabel, useMediaQuery, InputAdornment, useTheme, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';
import { Link as LinkUI } from '@mui/material';
import React from 'react'
import BackgroundImg from '../../components/OtherComponents/Background/BackgroundImg'
import { inject, observer } from 'mobx-react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import { makeStyles, withStyles } from '@mui/styles';

import Loading from './../../components/OtherComponents/Loading/Loading';

let Crypto = require('crypto-js')

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background["0"],
    },

}));

const Login = inject('rootStore', 'uiStore', 'authorizationStore')(observer(({ rootStore, authorizationStore, uiStore }) => {
    const theme = useTheme()
    const classes = useStyles(theme);
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Ξ Авторизация</title>
            </Head>
            {/* {uiStore.loading["/login"] && <Loading />} */}
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"

                className={classes.root}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                    sx={{ width: "100%" }}
                >
                    <Typography
                        
                        onClick={() => router.push('/')}
                        variant="h3"
                        sx={{ color: 'text.main', m: 2, }}
                    >
                        Ξffect
                    </Typography>
                </Stack>
                <Box sx={{ height: "100px", width: "100px", backgroundColor: "red" }}>

                </Box>

            </Stack>

        </>
    )
}))

export default Login