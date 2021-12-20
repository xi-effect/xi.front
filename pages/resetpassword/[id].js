import Head from 'next/head'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import clsx from 'clsx';
import { Grid, Stack, Input, useMediaQuery, TextField, useTheme, InputLabel, InputAdornment, Tooltip, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';
import { Link as LinkUI } from '@mui/material';
import React from 'react'
import BackgroundImg from '../../components/OtherComponents/Background/BackgroundImg'
import { inject, observer } from 'mobx-react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    password: yup.string().required(),
}).required();



const PasswordReset = inject('rootStore', 'uiStore', 'authorizationStore')(observer(({ rootStore, authorizationStore, uiStore }) => {
    const theme = useTheme();

    const router = useRouter()
    const { id } = router.query

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showPassword, setShowPassword] = React.useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        authorizationStore.saveNewPassword(id, data)
    }


    return (
        <>
            <Head>
                <title>Ξ Авторизация</title>
            </Head>
            {/* {uiStore.loading["/login"] && <Loading />} */}
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: 'background.1',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                    sx={{ width: "100%" }}
                >
                    <Typography
                        onClick={() => router.push('/')}
                        variant="h3"
                        sx={{ color: 'text.main', m: 2, cursor: "pointer", }}
                    >
                        Ξffect
                    </Typography>
                </Stack>
                <Box component="form" sx={{ width: "100%", }} onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{ width: "100%", p: 2, }}
                    >
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <FormControl error={errors?.password?.type === "required"} fullWidth sx={{ maxWidth: 512, }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password"> <Typography sx={{ color: 'text.main' }}>Пароль</Typography> </InputLabel>
                                <OutlinedInput
                                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                                    label="Адрес почты"
                                    type={showPassword ? 'text' : 'password'}

                                    // value={emailReset}
                                    // onChange={null}
                                    {...field}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large">
                                                {showPassword ? <Visibility sx={{ color: 'text.main' }} /> : <VisibilityOff sx={{ color: 'text.main' }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {errors?.password?.message === "password must be at least 6 characters" && <Typography variant="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Минимальная длинна пароля - 6 символов </Typography>}
                                {errors?.password?.message === "password is a required field" && <Typography variant="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Обязательное поле </Typography>}
                            </FormControl>}
                        />
                        {!authorizationStore.passwordReset.emailResetOk && <Button variant="outlined" size="large" type="submit" sx={{ color: 'text.main', border: `2px solid ${theme.palette.text.dark}`, '&:hover': { border: `2px solid ${theme.palette.text.dark}` } }}>
                            Сохранить новый пароль
                        </Button>}
                        {authorizationStore.passwordReset.emailResetOk && <Typography variant="subtitle1"> Пароль успешно сохранён. С этой страницы можно безопасно уходить  </Typography>}
                    </Stack>
                </Box>
                <div>

                </div>

            </Stack>
        </>
    );
}))

export default PasswordReset