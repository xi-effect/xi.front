import Head from 'next/head'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import clsx from 'clsx';
import Image from "next/image";
import { Grid, Stack, Input, Link, useMediaQuery, TextField, useTheme, InputLabel, InputAdornment, Tooltip, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';
import { Link as LinkUI } from '@mui/material';
import React from 'react'
import BackgroundImg from '../../components/OtherComponents/Background/BackgroundImg'
import { inject, observer } from 'mobx-react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import HelpIcon from '@mui/icons-material/Help';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
}).required();

import Loading from './../../components/OtherComponents/Loading/Loading';

const Registration = inject('rootStore', 'uiStore', 'authorizationStore')(observer(({ rootStore, authorizationStore, uiStore }) => {
    const theme = useTheme()

    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    console.log("errors", errors)
    const onSubmit = data => authorizationStore.clickRegistrationButton(data);

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
                    <Image
                alt="alt"
                src={"/landing.svg"}
                layout="fill"
                objectFit="cover"
                quality={100}
                // onLoadingComplete={() => setLoading(false)}
                />
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                    sx={{ width: "100%" }}
                >
                    <Typography
              onClick={() => router.push("/")}
              variant="h4"
              sx={{ color: "text.main", m: 2, zIndex: 2, cursor: "pointer" }}
            >
              Ξffect
            </Typography>
          </Stack>
          <Box
            component="form"
            // bgcolor: 'rgba(1, 1, 1, 0.4)',
            sx={{ zIndex: 2, p: 1, borderRadius: 16, width: "100%", mt: -20,  maxWidth: 512 }}
            onSubmit={handleSubmit(onSubmit)}
          >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{ width: "100%", p: 2, cursor: "pointer", }}
                    >
                                    <Image
                            alt="alt"
                            src={"/Thank.svg"}
                            // layout="fill"
                            // objectFit="cover"
                            quality={100}
                            width={456}
                            height={256}
                            // onLoadingComplete={() => setLoading(false)}
                        />
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <FormControl error={errors?.username?.type === "required"} fullWidth sx={{ maxWidth: 512, }} variant="outlined">
                                <InputLabel> <Typography sx={{ color: 'text.main' }}>Имя пользователя</Typography> </InputLabel>
                                <OutlinedInput
                                    sx={{ backgroundColor: 'background.main', width: "100%", }}
                                    label="Имя пользователя"
                                    type='text'

                                    // value={emailReset}
                                    // onChange={null}
                                    {...field}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton edge="end" size="large">
                                                <Tooltip title="Придумайте себе Имя пользователя, это ваше основное имя на просторах нашего портала." arrow>
                                                    <HelpIcon sx={{ color: 'text.main' }} />
                                                </Tooltip>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {errors?.username?.message === "username is a required field" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Обязательное поле </Typography>}
                            </FormControl>}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <FormControl error={errors?.email?.type === "required"} fullWidth sx={{ maxWidth: 512, }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password"> <Typography sx={{ color: 'text.main' }}>Адрес почты</Typography> </InputLabel>
                                <OutlinedInput
                                    sx={{ backgroundColor: 'background.main', width: "100%", }}
                                    label="Адрес почты"
                                    type='text'
                                    {...field}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton edge="end" size="large">
                                                <Tooltip title="Ваш адресс электронной почты" arrow>
                                                    <EmailIcon sx={{ color: 'text.main' }} />
                                                </Tooltip>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {authorizationStore.signup.error === "emailAlreadyUsed" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Почта уже используется </Typography>}
                                {errors?.email?.message === "email is a required field" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Обязательное поле </Typography>}
                                {errors?.email?.message === "email must be a valid email" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Ошибка валидации </Typography>}
                            </FormControl>}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <FormControl error={!!(errors?.password)} fullWidth sx={{ maxWidth: 512, }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password"> <Typography sx={{ color: 'text.main' }}>Пароль</Typography> </InputLabel>
                                <OutlinedInput
                                    sx={{ backgroundColor: 'background.main', width: "100%", }}
                                    label="Пароль"
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large">
                                                {showPassword ? <Visibility sx={{ color: 'text.main' }} /> : <VisibilityOff sx={{ color: 'text.main' }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                                {authorizationStore.signup.error === "serverError" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Ошибка сервера </Typography>}
                                {errors?.password?.message === "password must be at least 6 characters" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Минимальная длинна пароля - 6 символов </Typography>}
                                {errors?.password?.message === "password is a required field" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Обязательное поле </Typography>}
                            </FormControl>}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <FormControl error={!!(errors?.password)} fullWidth sx={{ maxWidth: 512, }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password"> <Typography sx={{ color: 'text.main' }}>Код-приглашение</Typography> </InputLabel>
                                <OutlinedInput
                                    sx={{ backgroundColor: 'background.main', width: "100%", }}
                                    label="Код-приглашение"
                                    type={'text'}
                                    {...field}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large">
                                                    <Tooltip title="Код-приглашение. Вы можете зарегистрироватся только если у вас есть код, который вы получили у пользователя платформы" arrow>
                                                        <VerifiedUserIcon sx={{ color: 'text.main' }}/>
                                                    </Tooltip>
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                                <Link
                                    sx={{ color: 'text.main', m: 1, cursor: 'pointer' }}
                                    onClick={() => {
                                        router.push({
                                            pathname: '/login',
                                        })
                                    }}
                                    underline="hover"
                                >
                                    Есть учётная запись? Войти
                                </Link>
                            </FormControl>}
                        />
                        <Button variant="outlined" size="large" type="submit" sx={{ color: "text.main",
                  bgcolor: "background.main",
                   border: `2px solid ${theme.palette.text.dark}`,
                    '&:hover': { border: `2px solid ${theme.palette.text.dark}` } }}>
                            Зарегистрироваться
                        </Button>
                    </Stack>
                </Box>
                <div>

                </div>

            </Stack>
        </>
    );
}))

export default Registration