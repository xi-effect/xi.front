/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from "next/head"
import { useRouter } from "next/router"
import Image from "next/image";
import { Stack, Input, Link, useMediaQuery, InputLabel, InputAdornment, Tooltip, IconButton, FormControl, Typography, Box, Button, Paper } from "@mui/material";

import React from "react"
import { inject, observer } from "mobx-react"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion"

import XiLogo from "../../kit/XiLogo";

const schema = yup.object({
    username: yup.string().max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
    invite: yup.string().required(),
}).required();

const Registration = inject("authorizationSt")(observer(({ authorizationSt }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);
    
    const { control, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => authorizationSt.clickRegistrationButton(data);

    React.useEffect(() => {
        if (router.query.invite) setValue("invite", router.query.invite)
    }, [router.query, setValue]);

    return (
        <>
            <Head>
                <title>Ξffect | Регистрация</title>
            </Head>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: "100vh",
                    backgroundColor: "background.main",
                }}
            >
                <Stack
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ height: mobile ? "100px" : "140px", p: mobile ? "20px" : "40px", width: "100%", }}
                >
                    <XiLogo />
                </Stack>
                <Box
                    sx={{
                        position: "relative",
                        width: "calc(100% - 32px)",
                        maxWidth: 512,
                        zIndex: 0,
                        bgcolor: "grey.800",
                        borderRadius: "20px",
                    }}
                >
                    {!mobile && <Box
                        sx={{
                            position: "absolute",
                            top: "50px",
                            left: "-156px",
                            zIndex: -1,
                        }}
                    >
                        <Image
                            alt="alt"
                            src="/assets/landing/blob4.svg"
                            quality={100}
                            width={256}
                            height={256}
                        />
                    </Box>}
                    {!mobile && <Box
                        sx={{
                            position: "absolute",
                            bottom: "50px",
                            right: "-156px",
                            zIndex: -1,
                        }}
                    >
                        <Image
                            alt="alt"
                            src="/assets/landing/blob2.svg"
                            quality={100}
                            width={256}
                            height={256}
                        />
                    </Box>}
                    <Paper
                        elevation={24}
                        sx={{
                            zIndex: 500,
                            bgcolor: "grey.800",
                            borderRadius: "20px",
                        }}
                    >
                        <Box
                            component="form"
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
                                sx={{ width: "100%", pl: 2, pr: 2, pb: 2, mt: 0, }}
                            >
                                <Image
                                    alt="alt"
                                    src="/assets/auth/MobileLogin.svg"
                                    quality={100}
                                    width={456}
                                    height={456}
                                />
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>
                                        <FormControl
                                            error={errors?.username?.type === "required" || errors?.username?.message === "username is a required field"}
                                            fullWidth
                                            sx={{
                                                mt: 2,
                                                pl: 1,
                                                pr: 1,
                                            }}
                                        >
                                            <InputLabel>
                                                <Typography sx={{ color: "text.primary" }}>Имя пользователя</Typography>
                                            </InputLabel>
                                            <Input
                                                sx={{ width: "100%" }}
                                                label="Имя пользователя"
                                                type="text"
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment sx={{ mr: 2 }} position="end">
                                                        <IconButton edge="end" size="large">
                                                            <Tooltip title="Придумайте себе Имя пользователя, это ваше основное имя на просторах нашего портала." arrow>
                                                                <HelpIcon sx={{ color: "text.secondary" }} />
                                                            </Tooltip>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>}
                                />
                                <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                    sx={{ width: "100%", minHeight: 16, mb: 1.2 }}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>
                                        <FormControl
                                            error={errors?.email?.type === "required" || errors?.email?.message === "email is a required field" || errors?.email?.message === "email must be a valid email"}
                                            fullWidth
                                            sx={{
                                                mt: -2,
                                                pl: 1,
                                                pr: 1,
                                            }}
                                        >
                                            <InputLabel>
                                                <Typography sx={{ color: "text.primary" }}>Адрес почты</Typography>
                                            </InputLabel>
                                            <Input
                                                sx={{ width: "100%", }}
                                                label="Адрес почты"
                                                type="text"
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment sx={{ mr: 2 }} position="end">
                                                        <IconButton edge="end" size="large">
                                                            <Tooltip title="Ваш адресс электронной почты" arrow>
                                                                <EmailIcon sx={{ color: "text.main" }} />
                                                            </Tooltip>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>}
                                />
                                <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                    sx={{ width: "100%", minHeight: 16, mb: 1.2 }}
                                >
                                    {authorizationSt.signup.error === "emailAlreadyUsed" && (
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mt: 1, ml: 1 }}
                                            color="error"
                                        >
                                            Почта уже используется
                                        </Typography>
                                    )}
                                </Stack>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>
                                        <FormControl error={!!(errors?.password) || errors?.password?.message === "password must be at least 6 characters" || errors?.password?.message === "password is a required field"}
                                            fullWidth
                                            sx={{
                                                mt: -2,
                                                pl: 1,
                                                pr: 1,
                                            }}
                                        >
                                            <InputLabel>
                                                <Typography sx={{ color: "text.primary" }}>Пароль</Typography>
                                            </InputLabel>
                                            <Input
                                                sx={{ width: "100%", }}
                                                label="Пароль"
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment sx={{ mr: 2 }} position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                            size="large">
                                                            {showPassword ? <Visibility sx={{ color: "text.secondary" }} /> : <VisibilityOff sx={{ color: "text.secondary" }} />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }

                                            />
                                        </FormControl>}
                                />
                                <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={1}
                                    sx={{ width: "100%", minHeight: 16, mb: 1.2 }}
                                >
                                    {authorizationSt.signup.error === "serverError" && (
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mt: 1, ml: 1 }}
                                            color="error"
                                        >
                                            Ошибка сервера
                                        </Typography>
                                    )}
                                </Stack>
                                <Controller
                                    name="invite"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) =>
                                        <FormControl
                                            error={!!(errors?.invite)}
                                            fullWidth
                                            sx={{
                                                mt: -2,
                                                pl: 1,
                                                pr: 1,
                                            }}
                                        >
                                            <InputLabel>
                                                <Typography sx={{ color: "text.primary" }}>Код-приглашение</Typography>
                                            </InputLabel>
                                            <Input
                                                sx={{ width: "100%", }}
                                                label="Код-приглашение"
                                                type="text"
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment sx={{ mr: 2 }} position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                            size="large">
                                                            <Tooltip title="Код-приглашение. Вы можете зарегистрироватся только если у вас есть код, который вы получили у пользователя платформы" arrow>
                                                                <VerifiedUserIcon sx={{ color: "text.secondary" }} />
                                                            </Tooltip>
                                                        </IconButton>
                                                    </InputAdornment>
                                                }

                                            />
                                        </FormControl>}
                                />
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ width: "100%", mt: 2, }}
                                >
                                    <Link
                                        sx={{ color: "text.secondary", ml: 1.5, fontWeight: 500, cursor: "pointer" }}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/login",
                                            });
                                        }}
                                        underline="hover"
                                    >
                                        Есть учётная запись? Войти

                                    </Link>
                                </Stack>
                                <Button
                                    size="large"
                                    type="submit"
                                    sx={{
                                        "&.MuiButton-root": {
                                            fontFamily: "Open Sans, sans-serif",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                            lineHeight: "25px",
                                            width: mobile ? "220px" : "260px",
                                            height: mobile ? "40px" : "50px",
                                            color: "text.primary",
                                            bgcolor: "secondary.main",
                                            borderRadius: mobile ? "62px" : "88px",
                                            "&:hover": {
                                                bgcolor: "secondary.main",
                                            },
                                            mt: 4,
                                            mb: 2,
                                            boxShadow: 12,
                                        }
                                    }}
                                >
                                    Зарегистрироваться
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
                <div />

            </Stack>
        </>
    );
}))

export default Registration;