import * as React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { CircularProgress, FormControl, useTheme, useMediaQuery, InputLabel, IconButton, InputAdornment, Tooltip, Divider, OutlinedInput, Paper, Grid, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, Fab, Zoom, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { inject, observer } from 'mobx-react'
import BackgroundImg from './../../components/OtherComponents/Background/BackgroundImg';

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
    },
    typographyMainly: {
        textAlign: 'center',
        cursor: "default",
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },
    gridPaper: {
        margin: 8,
        marginTop: 24,
    },
    inputLabel: {
        color: 'rgb(142,146,151)',
    },
    gridTextField: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 32,
        width: '100%',
    },
    textField: {
        width: '100%',
        backgroundColor: 'rgb(49,51,57)',
    },
    textFieldTypography: {
        marginTop: -4,
        color: 'rgb(142,146,151)',
    },
    icons: {
        color: 'rgb(142,146,151)',
    },
    gridForgotPassword: {
        marginTop: 4,
        paddingLeft: 20,

    },
    forgotPassword: {
        color: 'rgb(142,146,151)',
    },
    gridEnterButtom: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 32,

        width: '100%',
    },
    enterButtom: {
        width: '100%',
    },
    gridForgotRegistration: {
        marginTop: 4,
        paddingLeft: 20,
        paddingBottom: 20,

    },
    forgotRegistration: {
        color: 'rgb(142,146,151)',
    },
    popper: {
        zIndex: 1100,
    },
    paper: {
        zIndex: 1100,
    },
    gridCheckbox: {
        marginTop: 4,
        paddingLeft: 16,
        paddingRight: 32,
        width: '100%',
    },
    checkboxTypography: {
        paddingTop: 2,
        color: 'rgb(142,146,151)',
    },
    tooltip: {

    },
    tooltipTypography: {
        paddingTop: 2,
        fontSize: 16,
    },
    iconHelp: {
        marginTop: 8,
        marginLeft: -10,
        color: 'rgb(142,146,151)',
    },
    Checkbox: {
        color: theme => theme.palette.primary.contrastText,
    },
    OutlinedInput: {
        color: theme => theme.palette.primary.contrastText,
    },
    ErrorLabel: {
        zIndex: 999,
        fontSize: 16,
        color: theme => theme.palette.error.main,
    },
    gridForgotPassword: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingRight: 20,

    },
    gridroot: {
        width: '100vw',
        minHeight: '100vh',
    },
    gridTypography: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    typographyMainlySuccess: {
        textAlign: 'center',
        cursor: "default",
        zIndex: 999,
        fontSize: 18,
        color: 'rgb(142,146,151)',
    }
}));


const PasswordReset = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter()
    const { id } = router.query

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [passwordReset, setPasswordReset] = React.useState('')

    const [showPassword, setShowPassword] = React.useState(false)

    const [errorPasswordLengthReset, setErrorPasswordLengthReset] = React.useState(false)
    const [errorSymbolsReset, setErrorSymbolsReset] = React.useState(false)
    const [emailResetOkay, setEmailResetOkay] = React.useState(false)


    const acceptButtonClicked = () => {
        setErrorPasswordLengthReset(false)
        setErrorSymbolsReset(false)
        let sym = '1234567890qwertyuiopasdfghjklzxcvbnm_'
        if (passwordReset.length < 6) {
            setErrorPasswordLengthReset(true)
        }
        for (let i = 0; i < passwordReset.length; i++) {
            if (sym.includes(passwordReset[i].toLowerCase())) continue
            else {
                setErrorSymbolsReset(true)
                break
            }
        }
        if (!errorSymbolsReset && !errorPasswordLengthReset) {
            rootStore.fetchData(`${rootStore.url}/password-reset/confirm/`, "POST", { "code": id, "password": Crypto.SHA384(passwordReset).toString() },)
                .then((data) => {
                    if (data != undefined) {
                        if (data.a == "Success") { //"Success"
                            setEmailResetOkay(true)
                        }
                    }
                })
        }
    }

    return (
        <>
            <Head>
                <title>Ξ Регистрация</title>
            </Head>
            <div className={classes.root}>
                <BackgroundImg src="/wallpapers/hp3.jpg" />
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
                                    <Typography variant='h5' className={classes.typographyMain}> Восстановление пароля </Typography>
                                    <Typography variant='h7' className={classes.typographyMainly}> Придумайте новый пароль</Typography>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridTextField}>
                                    <FormControl className={classes.textField} variant="outlined">
                                        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Новый пароль</Typography> </InputLabel>
                                        <OutlinedInput
                                            label="Новый пароль"
                                            className={classes.OutlinedInput}
                                            type={showPassword ? 'text' : 'password'}
                                            value={passwordReset}
                                            onChange={(event) => setPasswordReset(event.target.value)}
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
                                {errorSymbolsReset && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Недопустимые символы!</Typography>
                                </Grid>}
                                {errorPasswordLengthReset && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Минимальная длинна пароля - 6 символов!</Typography>
                                </Grid>}
                                {!emailResetOkay && <>
                                    <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridEnterButtom}>
                                        <Button onClick={acceptButtonClicked} variant="contained" color="primary" className={classes.enterButtom}>
                                            Сохранить новый пароль
                                        </Button>
                                    </Grid>
                                </>}
                                {emailResetOkay && <>
                                    <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridTypography}>
                                        <Typography className={classes.typographyMainlySuccess}> Пароль успешно сохранён. С этой страницы можно безопасно уходить  </Typography>
                                    </Grid>
                                </>}
                            </Grid>

                        </Paper>
                    </Grid>
                    <Grid item container>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}))

export default PasswordReset