/* eslint-disable no-continue */
import React from "react";
import { Dialog, DialogTitle, Stack, DialogContentText, InputAdornment, IconButton, Button } from "@mui/material";
import Slide from '@mui/material/Slide';

import { inject, observer } from "mobx-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { useSnackbar } from "notistack";

const Crypto = require("crypto-js");

const schema = yup
    .object({
        password: yup.string().min(6).max(100).required(),
        newPassword: yup.string().min(6).max(100).required(),
    })
    .required();



const DialogChangePassword = inject("rootStore", "userSt")(observer(({ rootStore, openPasswordChangeDialog, setOpenPasswordChangeDialog }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordNew, setShowPasswordNew] = React.useState(false);


    const [passwordError, setPasswordError] = React.useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (newData) => {
        setPasswordError(false);
        rootStore.fetchData(`${rootStore.url}/password-change/`, "POST", { "password": Crypto.SHA384(newData.password).toString(), "new-password": Crypto.SHA384(newData.newPassword).toString() },)
            .then((data) => {
                if (data !== undefined) {
                    if (data.a === "Success") { // userId //"Success"
                        setOpenPasswordChangeDialog(false);
                        enqueueSnackbar("Пароль успешно изменён", {
                            variant: 'info',
                            autoHideDuration: 5000,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            },
                            TransitionComponent: Slide,
                        });
                    } else {
                        setPasswordError(true);
                    }
                }
                trigger();
            });
    };

    return (
        <Dialog open={openPasswordChangeDialog} onClose={() => {
            setOpenPasswordChangeDialog(false);
            reset();
        }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Изменение пароля </DialogTitle>
            <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    p: 2,
                }}
            >
                <DialogContentText>
                    Чтобы изменить пароль, введите сначала текущий пароль, а затем введите новый.
                </DialogContentText>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ pt: 2 }}
                >
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextFieldCustom
                                variant="filled"
                                error={errors?.email?.password || passwordError}
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                label="Пароль"
                                helperText={passwordError && 'Неверный пароль!'}
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                }}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="newPassword"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextFieldCustom
                                variant="filled"
                                error={errors?.newPassword}
                                type={showPasswordNew ? "text" : "password"}
                                fullWidth
                                label="Новый пароль"
                                helperText={errors?.newPassword && 'Пароль должен иметь минимальную длинну в 6 символв'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPasswordNew(!showPasswordNew)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large">
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                {...field}
                            />
                        )}
                    />
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        pt: 2
                    }}
                >
                    <Button color="inherit" onClick={() => setOpenPasswordChangeDialog(false)}>отмена</Button>
                    <Button color="primary" variant="contained" type="submit">Готово</Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}));

export default DialogChangePassword;