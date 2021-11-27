import React, { useState } from 'react'
import { styled } from '@mui/material/styles';


//import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Slider, Dialog, DialogTitle, useTheme, DialogContent, DialogContentText, DialogActions, InputAdornment, Tooltip, IconButton, Avatar, Grid, FormControl, InputLabel, TextField, OutlinedInput, Typography, Box, Button } from '@mui/material'
import { inject, observer } from 'mobx-react'

import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PREFIX = 'DialogChangeEmail';

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


const DialogChangeEmail = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore, openEmailChangeDialog, setOpenEmailChangeDialog }) => {
    const theme = useTheme();


    const [newEmail, setNewEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)

    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [symError, setSymError] = React.useState(false)
    //const [password, setPassword] = React.useState('')

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const clickReadyEmail = () => {
        setEmailError(false)
        setPasswordError(false)
        setSymError(false)
        if (!newEmail.includes('@') || !newEmail.includes('.') || newEmail.length < 5) {
            setSymError(true)
        }
        if (!symError) {
            rootStore.fetchDataScr(`${rootStore.url}/email-change/`, "POST", { "password": Crypto.SHA384(password).toString(), "new-email": newEmail }) // postData /auth //Crypto.SHA384(store.settingsNew.passwordOldChange).toString() //Crypto.SHA384(store.settingsNew.passwordNewChange).toString()
                .then((data) => {
                    console.log(data)
                    if (data != undefined) {
                        if (data.a == "Success") { //userId //"Success"
                            setOpenEmailChangeDialog(false)
                        } else if (data.a == "Email in use") { //"User doesn't exist"
                            setEmailError(true)
                        } else if (data.a == "Wrong password") { //"User doesn't exist"
                            setPasswordError(true)
                        }
                    }
                });
        }
    }

    return (
        <StyledDialog open={openEmailChangeDialog} onClose={() => setOpenEmailChangeDialog(false)} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Изменение адреса электронной почты </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText className={classes.dialogContentText}>
                    Чтобы изменить адрес электронной почты, введите сначала текущий пароль, а затем введите новый адрес электронной почты.
                    Мы отправим письмо-подтверждение на новый адрес электроной почты. Откройте письмо и перейдите по ссылке.
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
                                            size="large">
                                            {showPassword ? <Visibility className={classes.icons} /> : <VisibilityOff className={classes.icons} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {emailError && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Эта почта уже используется! </Typography>
                    </Grid>}
                    <Grid className={classes.gridDialogItem}>
                        <FormControl className={classes.textFieldDialog} variant="outlined">
                            <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Новый адрес почты</Typography> </InputLabel>
                            <OutlinedInput
                                label="Новый адрес почты"
                                className={classes.OutlinedInput}
                                type='text'
                                value={newEmail}
                                onChange={(event) => setNewEmail(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" edge="end" size="large">
                                            <Tooltip title="Сохранить изменения" arrow>
                                                <SaveIcon className={classes.icons} />
                                            </Tooltip>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {passwordError && <Grid item container direction="column" justifyContent="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Неверный пароль! </Typography>
                    </Grid>}
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button className={classes.cancelButton} onClick={() => setOpenEmailChangeDialog(false)}>отмена</Button>
                <Button color="primary" variant="contained" onClick={clickReadyEmail}>Готово</Button>
            </DialogActions>
        </StyledDialog>
    );
}))

export default DialogChangeEmail