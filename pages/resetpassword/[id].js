import * as React from 'react';
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { CircularProgress, FormControl, useTheme, useMediaQuery, InputLabel, IconButton, InputAdornment, Tooltip, Divider, OutlinedInput, Paper, Grid, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, Fab, Zoom, Button } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { inject, observer } from 'mobx-react'
import BackgroundImg from './../../components/OtherComponents/Background/BackgroundImg';

const PREFIX = 'PasswordReset';

const classes = {
    root: `${PREFIX}-root`,
    gridTittle: `${PREFIX}-gridTittle`,
    tittle: `${PREFIX}-tittle`,
    gridUnderPaper: `${PREFIX}-gridUnderPaper`,
    Paper: `${PREFIX}-Paper`,
    PaperOnlyXs: `${PREFIX}-PaperOnlyXs`,
    typographyMain: `${PREFIX}-typographyMain`,
    typographyMainly: `${PREFIX}-typographyMainly`,
    gridPaper: `${PREFIX}-gridPaper`,
    inputLabel: `${PREFIX}-inputLabel`,
    gridTextField: `${PREFIX}-gridTextField`,
    textField: `${PREFIX}-textField`,
    textFieldTypography: `${PREFIX}-textFieldTypography`,
    icons: `${PREFIX}-icons`,
    gridForgotPassword: `${PREFIX}-gridForgotPassword`,
    forgotPassword: `${PREFIX}-forgotPassword`,
    gridEnterButtom: `${PREFIX}-gridEnterButtom`,
    enterButtom: `${PREFIX}-enterButtom`,
    gridForgotRegistration: `${PREFIX}-gridForgotRegistration`,
    forgotRegistration: `${PREFIX}-forgotRegistration`,
    popper: `${PREFIX}-popper`,
    paper: `${PREFIX}-paper`,
    gridCheckbox: `${PREFIX}-gridCheckbox`,
    checkboxTypography: `${PREFIX}-checkboxTypography`,
    tooltip: `${PREFIX}-tooltip`,
    tooltipTypography: `${PREFIX}-tooltipTypography`,
    iconHelp: `${PREFIX}-iconHelp`,
    Checkbox: `${PREFIX}-Checkbox`,
    OutlinedInput: `${PREFIX}-OutlinedInput`,
    ErrorLabel: `${PREFIX}-ErrorLabel`,
    gridForgotPassword: `${PREFIX}-gridForgotPassword`,
    gridroot: `${PREFIX}-gridroot`,
    gridTypography: `${PREFIX}-gridTypography`,
    typographyMainlySuccess: `${PREFIX}-typographyMainlySuccess`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        //backgroundColor: '#2a2a2a',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: '-1',
        overflowY: 'auto',
        overflowX: 'hidden',
    },

    [`& .${classes.gridTittle}`]: {
        paddingTop: 16,
        [theme => theme.breakpoints.up('lg')]: {
            paddingLeft: 64,
        },
        [theme => theme.breakpoints.only('lg')]: {
            paddingLeft: 32,
        },
        [theme => theme.breakpoints.down('xl')]: {
            paddingLeft: 16,
        },
        paddingLeft: 16,
        zIndex: 999,
        marginRight: 'auto',
    },

    [`& .${classes.tittle}`]: {
        fontSize: 32,
        color: theme => theme.palette.primary.contrastText,
        cursor: 'pointer',
        zIndex: 999,
    },

    [`& .${classes.gridUnderPaper}`]: {
        zIndex: 999,
    },

    [`& .${classes.Paper}`]: {
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

    [`& .${classes.PaperOnlyXs}`]: {
        width: 350,
        transition: '1s',
    },

    [`& .${classes.typographyMain}`]: {
        cursor: "default",
        zIndex: 999,
        color: 'rgb(255,255,255)',
        fontWeight: 'bold',
    },

    [`& .${classes.typographyMainly}`]: {
        textAlign: 'center',
        cursor: "default",
        zIndex: 999,
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.gridPaper}`]: {
        margin: 8,
        marginTop: 24,
    },

    [`& .${classes.inputLabel}`]: {
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.gridTextField}`]: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 32,
        width: '100%',
    },

    [`& .${classes.textField}`]: {
        width: '100%',
        backgroundColor: 'rgb(49,51,57)',
    },

    [`& .${classes.textFieldTypography}`]: {
        marginTop: -4,
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.icons}`]: {
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.gridForgotPassword}`]: {
        marginTop: 4,
        paddingLeft: 20,

    },

    [`& .${classes.forgotPassword}`]: {
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.gridEnterButtom}`]: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 32,

        width: '100%',
    },

    [`& .${classes.enterButtom}`]: {
        width: '100%',
    },

    [`& .${classes.gridForgotRegistration}`]: {
        marginTop: 4,
        paddingLeft: 20,
        paddingBottom: 20,

    },

    [`& .${classes.forgotRegistration}`]: {
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.popper}`]: {
        zIndex: 1100,
    },

    [`& .${classes.paper}`]: {
        zIndex: 1100,
    },

    [`& .${classes.gridCheckbox}`]: {
        marginTop: 4,
        paddingLeft: 16,
        paddingRight: 32,
        width: '100%',
    },

    [`& .${classes.checkboxTypography}`]: {
        paddingTop: 2,
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.tooltip}`]: {

    },

    [`& .${classes.tooltipTypography}`]: {
        paddingTop: 2,
        fontSize: 16,
    },

    [`& .${classes.iconHelp}`]: {
        marginTop: 8,
        marginLeft: -10,
        color: 'rgb(142,146,151)',
    },

    [`& .${classes.Checkbox}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.OutlinedInput}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.ErrorLabel}`]: {
        zIndex: 999,
        fontSize: 16,
        color: theme => theme.palette.error.main,
    },

    [`& .${classes.gridForgotPassword}`]: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingRight: 20,

    },

    [`& .${classes.gridroot}`]: {
        width: '100vw',
        minHeight: '100vh',
    },

    [`& .${classes.gridTypography}`]: {
        paddingLeft: 16,
        paddingRight: 16,
    },

    [`& .${classes.typographyMainlySuccess}`]: {
        textAlign: 'center',
        cursor: "default",
        zIndex: 999,
        fontSize: 18,
        color: 'rgb(142,146,151)',
    }
}));

let Crypto = require('crypto-js')


const PasswordReset = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();

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
        <Root>
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
                                                        size="large">
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
        </Root>
    );
}))

export default PasswordReset