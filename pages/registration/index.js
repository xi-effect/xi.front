import React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { Tooltip, Grid, TextField, useMediaQuery, useTheme, InputLabel, InputAdornment, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';
import { Link as LinkUI } from '@mui/material'

import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { inject, observer } from 'mobx-react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import HelpIcon from '@mui/icons-material/Help';
import BackgroundImg from './../../components/OtherComponents/Background/BackgroundImg';
import Loading from './../../components/OtherComponents/Loading/Loading';

let Crypto = require('crypto-js')

const useStyles = makeStyles((theme) => ({
    root: {
        //backgroundColor: '#2a2a2a',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: '-1',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    main: {
        zIndex: 999,
    },
    gridTittle: {
        paddingTop: 16,
        [theme => theme.breakpoints.up('lg')]: {
            paddingLeft: 64,
        },
        [theme => theme.breakpoints.only('lg')]: {
            paddingLeft: 32,
        },
        [theme => theme.breakpoints.down('lg')]: {
            paddingLeft: 16,
        },
        paddingLeft: 16,
        zIndex: 999,
        marginRight: 'auto',
    },
    tittle: {
        fontSize: 32,
        color: theme => theme.palette.primary.contrastText,
        cursor: 'pointer',
        zIndex: 999,
    },
    gridUnderPaper: {
        //paddingTop: 150,
        zIndex: 999,
    },
    Paper: {
        zIndex: 999,
        borderRadius: 4,
        width: 500,
        // [theme => theme.breakpoints.only('xs')]: {
        //     width: 400,
        // },
        height: 'auto',
        backgroundColor: 'rgb(54,57,63)',
        transition: '1s',
        '&:hover': {
            // background: 'linear-gradient(-90deg, rgb(80,151,136, 0.5), rgb(4,40,75, 0.5))',
            backgroundColor: 'rgb(54,57,63, 0.85)',
        },

    },
    PaperOnlyXs: {
        width: 350,
        transition: '1s',
    },
    typographyMain: {
        cursor: "default",
        zIndex: 999,
        color: 'rgb(255,255,255)',
        fontWeight: 'bold',
        fontSize: 32,
    },
    typographyMainly: {
        cursor: "default",
        fontSize: 14,
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    gridPaper: {
        zIndex: 999,
        margin: 8,
        marginTop: 24,
    },
    inputLabel: {
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    gridTextField: {
        zIndex: 999,
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 32,
        width: '100%',
    },
    textField: {
        zIndex: 999,
        width: '100%',
        backgroundColor: 'rgb(49,51,57)',
    },
    textFieldTypography: {
        zIndex: 999,
        marginTop: -4,
        color: 'rgb(142,146,151)',
    },
    icons: {
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    gridForgotPassword: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingRight: 20,

    },
    forgotPassword: {
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    gridEnterButtom: {
        zIndex: 999,
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 32,

        width: '100%',
    },
    enterButtom: {
        zIndex: 999,
        width: '100%',
    },
    gridForgotRegistration: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingBottom: 20,

    },
    forgotRegistration: {
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    OutlinedInput: {
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,
    },
    ErrorLabel: {
        zIndex: 999,
        fontSize: 16,
        color: theme => theme.palette.error.main,
    },
    AboutLabel: {
        zIndex: 999,
        fontSize: 12,
        color: theme => theme.palette.primary.contrastText,
    },
    gridroot: {
        width: '100vw',
        minHeight: '100vh',
    },
}));



const Registration = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
    const theme = useTheme()
    const classes = useStyles(theme);

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setUsername] = React.useState('')

    const [showPassword, setShowPassword] = React.useState(false)

    const [error, setError] = React.useState(false)
    const [errorUsername, setErrorUsername] = React.useState(false)
    const [errorSymbols, setErrorSymbols] = React.useState(false)
    const [errorEmail, setErrorEmail] = React.useState(false)
    const [errorPasswordLength, setErrorPasswordLength] = React.useState(false)
    const [errorServer, setErrorServer] = React.useState(false)
    const [emailAlreadyUsed, setEmailAlreadyUsed] = React.useState(false)


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const gotoAuth = (event) => {
        const router = Router
        router.push('/login')
        event.preventDefault();
    }

    const clickRegistartionButton = () => {
        setErrorUsername(false)
        setErrorSymbols(false)
        setErrorEmail(false)
        setErrorPasswordLength(false)
        setErrorServer(false)
        setEmailAlreadyUsed(false)
        let sym = '1234567890qwertyuiopasdfghjklzxcvbnm_'
        if (username.length == 0) {
            setErrorUsername(true)
        }
        if (!email.includes('@') || !email.includes('.') || email.length < 5) {
            setErrorEmail(true)
        }
        if (password.length < 6) {
            setErrorPasswordLength(true)
        }
        for (let i = 0; i < password.length; i++) {
            if (sym.includes(password[i].toLowerCase())) continue
            else {
                setErrorSymbols(true)
                break
            }
        }
        if (!errorUsername && !errorPasswordLength && !errorSymbols && !errorEmail) {
            rootStore.fetchData(`${rootStore.url}/reg/`, "POST", { "email": email, "password": Crypto.SHA384(password).toString(), "username": username })
                .then((data) => {
                    console.log(data)
                    if (data != undefined) {
                        if (data.a) { //true
                            const router = Router
                            router.push('/main')
                        } else {
                            setEmailAlreadyUsed(true)
                        }
                    } else {
                        setErrorServer(true)
                    }
                });
        }
    }

    return (
        <>
            <Head>
                <title>Ξ Регистрация</title>
            </Head>
            {uiStore.loading["/registration"] && <Loading />}
            <div className={classes.root}>
                <BackgroundImg src="/wallpapers/hp1.jpg" />
                <Grid
                    className={classes.gridroot}
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between">
                    <Grid className={classes.gridTittle} item container justifyContent="flex-start" direction="column" alignItems="flex-start">
                        <Link href="https://xieffect.herokuapp.com/" passHref>
                            <Typography className={classes.tittle}> Ξ Effect </Typography>
                        </Link>
                    </Grid>
                    <Grid className={classes.gridUnderPaper} item container direction="column" alignItems="center">
                        <Paper variant="outlined" className={clsx(classes.Paper, { [classes.PaperOnlyXs]: useMediaQuery(theme.breakpoints.only('xs')) })}>
                            <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.gridPaper}>
                                <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridTypography}>
                                    <Typography className={classes.typographyMain}> Регистрация </Typography>
                                    <Typography className={classes.typographyMainly}> Начните свой путь в цифровом образовании! </Typography>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridTextField}>
                                    <FormControl className={classes.textField} variant="outlined">
                                        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Имя пользователя</Typography> </InputLabel>
                                        <OutlinedInput
                                            label="Имя пользователя"
                                            className={classes.OutlinedInput}
                                            type='text'
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                    >
                                                        <Tooltip title="Придумайте себе Имя пользователя, это ваше основное имя на просторах нашего портала." arrow>
                                                            <HelpIcon className={classes.icons} />
                                                        </Tooltip>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                {errorUsername && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Это поле не может быть пустым! </Typography>
                                </Grid>}
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridTextField}>
                                    <FormControl className={classes.textField} variant="outlined">
                                        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Адрес Электронной почты</Typography></InputLabel>
                                        <OutlinedInput
                                            label="Адрес Электронной почты"
                                            className={classes.OutlinedInput}
                                            type='text'
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                    >
                                                        <EmailIcon className={classes.icons} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                {errorEmail && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Некорректный адрес почты </Typography>
                                </Grid>}
                                {emailAlreadyUsed && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Данный адрес электронной почты уже используется </Typography>
                                </Grid>}
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridTextField}>
                                    <FormControl className={classes.textField} variant="outlined">
                                        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Пароль</Typography> </InputLabel>
                                        <OutlinedInput
                                            label="Пароль"
                                            className={classes.OutlinedInput}
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility className={classes.icons} /> : <VisibilityOff className={classes.icons} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.AboutLabel}> Минимальная длина: 6 символов. Используйте латинские буквы, цифры и знак нижнего подчёркивания.</Typography>
                                </Grid>
                                {errorPasswordLength && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Недопустим пароль менее 6 символов </Typography>
                                </Grid>}
                                {errorSymbols && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Недопустимые символы в пароле </Typography>
                                </Grid>}
                                {errorServer && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Ошибка сервера :( </Typography>
                                </Grid>}
                                <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridEnterButtom}>
                                    <Button onClick={clickRegistartionButton} variant="contained" color="primary" className={classes.enterButtom}>
                                        Регистрация
                                    </Button>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotRegistration}>
                                    <LinkUI className={classes.forgotRegistration} href="#" onClick={gotoAuth}>
                                        Уже есть учётная запись? Войти!
                                    </LinkUI>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item container>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}))

export default Registration;