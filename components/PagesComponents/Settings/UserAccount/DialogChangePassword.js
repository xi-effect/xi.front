import React, { useState } from 'react'

import { styled } from '@mui/material/styles';

//import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Slider, Dialog, DialogTitle, useTheme, DialogContent, DialogContentText, DialogActions, Link, InputAdornment, Tooltip, IconButton, ClickAwayListener, Divider, ButtonGroup, MenuList, MenuItem, Avatar, Paper, Grow, Popper, Badge, Grid, FormControl, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material'


import { inject, observer } from 'mobx-react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const PREFIX = 'DialogChangePassword';

const classes = {
    dialogTitle: `${PREFIX}-dialogTitle`,
    dialogContent: `${PREFIX}-dialogContent`,
    dialogContentText: `${PREFIX}-dialogContentText`,
    dialogActions: `${PREFIX}-dialogActions`,
    textFieldDialog: `${PREFIX}-textFieldDialog`,
    OutlinedInput: `${PREFIX}-OutlinedInput`,
    icons: `${PREFIX}-icons`,
    inputLabel: `${PREFIX}-inputLabel`,
    textFieldTypography: `${PREFIX}-textFieldTypography`,
    cancelButton: `${PREFIX}-cancelButton`,
    gridDialogItem: `${PREFIX}-gridDialogItem`,
    gridRootDialogItem: `${PREFIX}-gridRootDialogItem`,
    ErrorLabel: `${PREFIX}-ErrorLabel`,
    gridErrorLabel: `${PREFIX}-gridErrorLabel`
};

const StyledDialog = styled(Dialog)((
    {
        theme
    }
) => ({
    [`& .${classes.dialogTitle}`]: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.dialogContent}`]: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
    },

    [`& .${classes.dialogContentText}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.dialogActions}`]: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
    },

    [`& .${classes.textFieldDialog}`]: {
        marginLeft: 12,
        marginRight: 0,
        width: "100%",
        backgroundColor: theme => theme.palette.blueGrey["7"],
    },

    [`& .${classes.OutlinedInput}`]: {
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.icons}`]: {
        //color: 'rgb(142,146,151)',
    },

    [`& .${classes.inputLabel}`]: {
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,

    },

    [`& .${classes.textFieldTypography}`]: {
        zIndex: 999,
        marginTop: -4,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.cancelButton}`]: {
        color: theme => theme.palette.primary.contrastText
    },

    [`& .${classes.gridDialogItem}`]: {
        width: '100%',
        paddingTop: 16,
        paddingLeft: -4,
    },

    [`& .${classes.gridRootDialogItem}`]: {
        width: '100%',
        paddingRight: 24,
    },

    [`& .${classes.ErrorLabel}`]: {
        zIndex: 999,
        fontSize: 16,
        color: theme => theme.palette.error.main,
    },

    [`& .${classes.gridErrorLabel}`]: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingRight: 20,
    }
}));


let Crypto = require('crypto-js')


const DialogChangePassword = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore, openPasswordChangeDialog, setOpenPasswordChangeDialog }) => {
    const theme = useTheme()


    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordNew, setShowPasswordNew] = React.useState(false)


    const [passwordError, setPasswordError] = React.useState(false)
    const [symError, setSymError] = React.useState(false)
    const [lengthError, setLengthError] = React.useState(false)
    const [errorServer, setErrorServer] = React.useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clickReadyPassword = () => {
        setLengthError(false)
        setSymError(false)
        setPasswordError(false)
        setErrorServer(false)
        let sym = "1234567890qwertyuiopasdfghjklzxcvbnm_QWERTYUIOPASDFGHJKLZXCVBNM"
        if (newPassword.length < 6) {
            setLengthError(true)
        }
        for (let i = 0; i < newPassword.length; i++) {
            if (sym.includes(newPassword[i])) continue
            else {
                setSymError(true)
                break
            }
        }
        if (!symError && !lengthError) {
            rootStore.fetchDataScr(`${rootStore.url}/password-change/`, "POST", { "password": Crypto.SHA384(password).toString(), "new-password": Crypto.SHA384(newPassword).toString() },)
                .then((data) => {
                    console.log(data)
                    if (data != undefined) {
                        if (data.a == "Success") { //userId //"Success"
                            setOpenPasswordChangeDialog(false)
                        } else { //"User doesn't exist"
                            setPasswordError(true)
                        }
                    } else {
                        setErrorServer(true)
                    }
                });
        }
    }

    return (
        <StyledDialog open={openPasswordChangeDialog} onClose={() => setOpenPasswordChangeDialog(false)} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Изменение пароля</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText className={classes.dialogContentText}>
                    Чтобы изменить пароль, введите сначала текущий пароль, а затем введите новый.
                </DialogContentText>
                <Grid
                    className={classes.gridRootDialogItem}

                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid className={classes.gridDialogItem}>
                        <FormControl className={classes.textFieldDialog} variant="outlined">
                            <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Текущий пароль</Typography> </InputLabel>
                            <OutlinedInput
                                label="Текущий пароль"
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
                                            size="large">
                                            {showPassword ? <Visibility className={classes.icons} /> : <VisibilityOff className={classes.icons} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {passwordError && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Не сработало! Проверьте правильность текущего пароля </Typography>
                    </Grid>}
                    <Grid className={classes.gridDialogItem}>
                        <FormControl className={classes.textFieldDialog} variant="outlined">
                            <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Новый пароль</Typography> </InputLabel>
                            <OutlinedInput
                                label="Новый пароль"
                                className={classes.OutlinedInput}
                                type={showPasswordNew ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPasswordNew(!showPasswordNew)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large">
                                            {showPasswordNew ? <Visibility className={classes.icons} /> : <VisibilityOff className={classes.icons} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {lengthError && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Недопустим пароль менее 6 символов </Typography>
                    </Grid>}
                    {symError && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Недопустимые символы в пароле </Typography>
                    </Grid>}
                    {errorServer && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.passwordChangeServerError}> Ошибка сервера :( </Typography>
                    </Grid>}
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button className={classes.cancelButton} onClick={() => setOpenPasswordChangeDialog(false)}>отмена</Button>
                <Button color="primary" variant="contained" onClick={clickReadyPassword}>Готово</Button>
            </DialogActions>
        </StyledDialog>
    );
}))

export default DialogChangePassword