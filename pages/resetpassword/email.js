import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import Link from 'next/link'
import { Grid, useTheme, TextField, useMediaQuery, Tooltip, Popper, Grow, MenuList, MenuItem, InputLabel, Checkbox, ButtonGroup, InputAdornment, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';


import clsx from 'clsx'
import { inject, observer } from 'mobx-react'
import HelpIcon from '@mui/icons-material/Help';
import BackgroundImg from './../../components/OtherComponents/Background/BackgroundImg';
import Loading from './../../components/OtherComponents/Loading/Loading';


const PREFIX = 'PassResetEmail';

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



const PassResetEmail = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
    const theme = useTheme();


    const [emailReset, setEmailReset] = React.useState('')

    const [errorEmailReset, setErrorEmailReset] = React.useState(false)
    const [errorEmailNotFounedReset, setErrorEmailNotFounedReset] = React.useState(false)
    const [emailResetOk, setEmailResetOk] = React.useState(false)

    const clickRegistartionButton = () => {
        if (!emailReset.includes('@') || !emailReset.includes('.') || emailReset.length < 5) {
            setErrorEmailReset(true)
        }

        if (!errorEmailReset && !errorEmailNotFounedReset) {
            rootStore.fetchData(`${rootStore.url}/password-reset/${emailReset}/`, "GET")
                .then((data) => {
                    if (data != undefined) {
                        if (data.a === true) { //true
                            setEmailResetOk(true)
                        } else if (data.a === false) {
                            setErrorEmailNotFounedReset(true)
                        }
                    }
                });

        }
    }

    return (
        <Root>
            <Head>
                <title>Ξ Регистрация</title>
            </Head>
            {/* {uiStore.loading["/registration"] && <Loading />} */}
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
                                    <Typography variant='h7' className={classes.typographyMainly}> Введите адрес электроной почты вашего аккаунта.</Typography>
                                    <Typography variant='h7' className={classes.typographyMainly}> Мы отправим вам письмо со ссылкой на страницу создания нового пароля. </Typography>
                                </Grid>
                                <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridTextField}>
                                    <FormControl className={classes.textField} variant="outlined">
                                        <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Адрес почты</Typography> </InputLabel>
                                        <OutlinedInput
                                            label="Адрес почты"
                                            className={classes.OutlinedInput}
                                            type='text'
                                            value={emailReset}
                                            onChange={(event) => setEmailReset(event.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" size="large">
                                                        <Tooltip title="Ваш адресс электронной почты" arrow>
                                                            <HelpIcon className={classes.icons} />
                                                        </Tooltip>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                {errorEmailReset && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Некорректный адрес почты</Typography>
                                </Grid>}
                                {errorEmailNotFounedReset && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridForgotPassword}>
                                    <Typography className={classes.ErrorLabel}> Пользователя с таким адресом электронной почты не существует</Typography>
                                </Grid>}
                                {!emailResetOk && <>
                                    <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridEnterButtom}>
                                        <Button onClick={clickRegistartionButton} variant="contained" color="primary" className={classes.enterButtom}>
                                            Отправить письмо
                                        </Button>
                                    </Grid>
                                </>}
                                {emailResetOk && <>
                                    <Grid item container direction="column" justifyContent="center" alignItems="center" className={classes.gridTypography}>
                                        <Typography className={classes.typographyMainlySuccess}> Письмо отправлено. С этой страницы можно безопасно уходить  </Typography>
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

export default PassResetEmail;