import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from "next/image";
import clsx from 'clsx';
import { Grid, Stack, Input, Link, useMediaQuery, TextField, useTheme, InputLabel, InputAdornment, Tooltip, IconButton, FormControl, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, Paper } from '@mui/material';
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

import { motion } from "framer-motion"

const schema = yup.object({
    email: yup.string().email().required(),
}).required();


const PassResetEmail = inject('rootStore', 'uiStore', 'authorizationStore')(observer(({ rootStore, uiStore, authorizationStore }) => {
    const theme = useTheme();
    const router = useRouter()
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    console.log("errors", errors)
    const onSubmit = (data) => {
        authorizationStore.clickPasswordResetButton(data)
    }



    return (
        <>
            <Head>
                <title>Ξ Смена пароля</title>
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
                <Box
                    sx={{
                    position: "fixed",
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden",
                    zIndex: "-1",
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
                </Box>
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
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                        sx={{ width: "100%", p: 2 }}
                    >
                        <Image
                            alt="alt"
                            src={"/Mail.svg"}
                            quality={100}
                            width={456}
                            height={256}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <FormControl error={errors?.email?.type === "required"} fullWidth sx={{ maxWidth: 512, mt: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password"> <Typography sx={{ color: 'text.main' }}>Адрес почты</Typography> </InputLabel>
                                <OutlinedInput
                                    sx={{ backgroundColor: 'background.main', width: "100%", }}
                                    label="Адрес почты"
                                    type='text'

                                    // value={emailReset}
                                    // onChange={null}
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
                                {errors?.email?.message === "email is a required field" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Обязательное поле </Typography>}
                                {errors?.email?.message === "email must be a valid email" && <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Ошибка валидации </Typography>}
                                <Link
                                    sx={{ color: 'text.main', m: 1, cursor: 'pointer' }}
                                    onClick={() => {
                                        router.push({
                                            pathname: '/login',
                                        })
                                    }}
                                    underline="hover"
                                >
                                    на страницу входа
                                </Link>
                            </FormControl>}
                        />
                        {authorizationStore.passwordReset.errorEmailNotFounedReset && <Typography variant="subtitle1" > Пользователя с таким адресом электронной почты не существует</Typography>}
                        {!authorizationStore.passwordReset.emailResetOk &&
                         <Button
                            variant="outlined"
                            size="large"
                            type="submit"
                            sx={{
                            mt: 4,
                            color: "text.main",
                            bgcolor: "background.main",
                            border: `2px solid ${theme.palette.text.dark}`,
                            "&:hover": { border: `2px solid ${theme.palette.text.dark}` },
                            }}
                        >
                            Отправить письмо
                        </Button>}
                        {authorizationStore.passwordReset.emailResetOk && <Typography variant="subtitle1"> Письмо отправлено. С этой страницы можно безопасно уходить  </Typography>}
                    </Stack>
                </Box>
                <div>

                </div>

            </Stack>
        </>
    );
}))

export default PassResetEmail;