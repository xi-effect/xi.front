import React, { useState } from "react"
import { Slider, Dialog, DialogTitle, Stack, useTheme, DialogContent, DialogContentText, DialogActions, Link, InputAdornment, Tooltip, IconButton, ClickAwayListener, Divider, ButtonGroup, MenuList, MenuItem, Avatar, Paper, Grow, Popper, Badge, Grid, FormControl, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from "@mui/material"


import { inject, observer } from "mobx-react"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

let Crypto = require("crypto-js")


const DialogChangePassword = inject("rootStore", "settingsStore")(observer(({ rootStore, settingsStore, openPasswordChangeDialog, setOpenPasswordChangeDialog }) => {
    const theme = useTheme()


    const [password, setPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
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
                        } else { //"User doesn"t exist"
                            setPasswordError(true)
                        }
                    } else {
                        setErrorServer(true)
                    }
                });
        }
    }

    return (
        <Dialog open={openPasswordChangeDialog} onClose={() => setOpenPasswordChangeDialog(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Изменение пароля</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Чтобы изменить пароль, введите сначала текущий пароль, а затем введите новый.
                </DialogContentText>
                <Stack
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ pt: 2 }}
                >
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"> <Typography>Текущий пароль</Typography> </InputLabel>
                        <OutlinedInput
                            label="Текущий пароль"
                            type={showPassword ? "text" : "password"}
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
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {passwordError && <Typography> Не сработало! Проверьте правильность текущего пароля </Typography>}
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"> <Typography>Новый пароль</Typography> </InputLabel>
                        <OutlinedInput
                            label="Новый пароль"
                            type={showPasswordNew ? "text" : "password"}
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
                                        {showPasswordNew ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {lengthError && <Typography> Недопустим пароль менее 6 символов </Typography>}
                    {symError && <Typography > Недопустимые символы в пароле </Typography>}
                    {errorServer && <Typography> Ошибка сервера :( </Typography>}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenPasswordChangeDialog(false)}>отмена</Button>
                <Button color="primary" variant="contained" onClick={clickReadyPassword}>Готово</Button>
            </DialogActions>
        </Dialog>
    );
}))

export default DialogChangePassword