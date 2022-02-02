import React from "react"
import { Stack, Dialog, DialogTitle, useTheme, DialogContent, DialogContentText, DialogActions, InputAdornment, Tooltip, IconButton, Avatar, Grid, FormControl, InputLabel, TextField, OutlinedInput, Typography, Box, Button } from "@mui/material"
import { inject, observer } from "mobx-react"

import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

let Crypto = require("crypto-js")


const DialogChangeEmail = inject("rootStore", "settingsStore")(observer(({ rootStore, settingsStore, openEmailChangeDialog, setOpenEmailChangeDialog }) => {
    const theme = useTheme();


    const [newEmail, setNewEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [symError, setSymError] = React.useState(false)
    //const [password, setPassword] = React.useState("")

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const clickReadyEmail = () => {
        setEmailError(false)
        setPasswordError(false)
        setSymError(false)
        if (!newEmail.includes("@") || !newEmail.includes(".") || newEmail.length < 5) {
            setSymError(true)
        }
        if (!symError) {
            rootStore.fetchDataScr(`${rootStore.url}/email-change/`, "POST", { "password": Crypto.SHA384(password).toString(), "new-email": newEmail }) // postData /auth //Crypto.SHA384(store.settingsNew.passwordOldChange).toString() //Crypto.SHA384(store.settingsNew.passwordNewChange).toString()
                .then((data) => {
                    console.log(data)
                    if (data != undefined) {
                        if (data.a == "Success") { //userId //"Success"
                            setOpenEmailChangeDialog(false)
                        } else if (data.a == "Email in use") { //"User doesn"t exist"
                            setEmailError(true)
                        } else if (data.a == "Wrong password") { //"User doesn"t exist"
                            setPasswordError(true)
                        }
                    }
                });
        }
    }

    return (
        <Dialog open={openEmailChangeDialog} onClose={() => setOpenEmailChangeDialog(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Изменение адреса электронной почты </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Чтобы изменить адрес электронной почты, введите сначала текущий пароль, а затем введите новый адрес электронной почты.
                    Мы отправим письмо-подтверждение на новый адрес электроной почты. Откройте письмо и перейдите по ссылке.
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
                        <InputLabel htmlFor="outlined-adornment-password"> <Typography>Пароль</Typography> </InputLabel>
                        <OutlinedInput
                            label="Пароль"
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
                    {emailError && <Typography> Эта почта уже используется! </Typography>}
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"> <Typography>Новый адрес почты</Typography> </InputLabel>
                        <OutlinedInput
                            label="Новый адрес почты"
                            type="text"
                            value={newEmail}
                            onChange={(event) => setNewEmail(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" edge="end" size="large">
                                        <Tooltip title="Сохранить изменения" arrow>
                                            <SaveIcon />
                                        </Tooltip>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {passwordError && <Typography> Неверный пароль! </Typography>}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenEmailChangeDialog(false)}>отмена</Button>
                <Button color="primary" variant="contained" onClick={clickReadyEmail}>Готово</Button>
            </DialogActions>
        </Dialog>
    );
}))

export default DialogChangeEmail