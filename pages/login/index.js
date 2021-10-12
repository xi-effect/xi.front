import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router';
import clsx from 'clsx';
import { Grid, InputLabel, useMediaQuery, InputAdornment, useTheme, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';
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
        fontSize: 16,
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
    OutlinedInput: {
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,
    },
    textFieldTypography: {
        zIndex: 999,
        marginTop: -4,
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
    icons: {
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    gridForgotPassword: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,

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
        cursor: "pointer",
        fontSize: 16,
    },
    ErrorLabel: {
        zIndex: 999,
        fontSize: 16,
        color: theme => theme.palette.error.main,
    },
    gridroot: {
        width: '100vw',
        minHeight: '100vh',
    },
}));

const Login = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
    const theme = useTheme()
    const classes = useStyles(theme);

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [showPassword, setShowPassword] = React.useState(false)

    const [error, setError] = React.useState(false)
    const [errorEmail, setErrorEmail] = React.useState(false)
    const [errorPassword, setErrorPassword] = React.useState(false)
    const [errorServer, setErrorServer] = React.useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const gotoRegistration = (event) => {
        event.preventDefault();
        const router = Router
        router.push('/registration')
    }

    const clickEnterButton = () => {
        setError(false)
        setErrorEmail(false)
        setErrorPassword(false)
        setErrorServer(false)
        if (email.length > 0 && password.length > 0) {
            rootStore.fetchData(`${rootStore.url}/auth/`, "POST", { "email": email, "password": Crypto.SHA384(password).toString() })
                .then((data) => {
                    if (data != undefined) {
                        if (data.a == "Success") {
                            const router = Router
                            router.push('/')
                            setTimeout(() => {
                                setEmail('')
                                setPassword('')
                            }, 10000)
                        } else if (data.a == "User doesn't exist") {
                            setErrorEmail(true)
                        } else if (data.a == "Wrong password") {
                            setErrorPassword(true)
                        }
                    } else {
                        setErrorServer(true)
                    }
                });
        }
        else {
            setError(true)
        }
    }

    return (
        <>
            <Head>
                <title>Ξ Авторизация</title>
            </Head>
            {uiStore.loading["/login"] && <Loading />}
            <div className={classes.root}>
                <BackgroundImg src="/wallpapers/hp4.jpg" />
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
                                    <Typography className={classes.typographyMain}> Добро пожаловать! </Typography>
                                    <Typography className={classes.typographyMainly}> Вас привела жажда знаний, не так ли? </Typography>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridTextField}>
                                    <FormControl className={classes.textField} variant="outlined">
                                        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"><Typography className={classes.textFieldTypography}>Адрес Электронной почты </Typography></InputLabel>
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
                                    <Typography className={classes.ErrorLabel}> Пользователя с таким адресом почты не существует </Typography>
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
                                {errorPassword && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Неправильный пароль </Typography>
                                </Grid>}
                                {error && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Нужно ввести адрес почты и пароль! </Typography>
                                </Grid>}
                                {errorServer && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Ошибка сервера :( </Typography>
                                </Grid>}
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <LinkUI className={classes.forgotPassword} href="/resetpassword/email">
                                        Забыли пароль?
                                    </LinkUI>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridEnterButtom}>
                                    <Button onClick={clickEnterButton} variant="contained" color="primary" className={classes.enterButtom}>
                                        Вход
                                    </Button>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotRegistration}>
                                    <LinkUI className={classes.forgotRegistration} onClick={gotoRegistration}>
                                        Нужна учётная запись? Зарегистрироваться!
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

export default Login