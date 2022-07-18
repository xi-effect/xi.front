import Head from "next/head";

import { useRouter } from "next/router";
import { Stack, useMediaQuery, Paper, InputLabel, InputAdornment, IconButton, FormControl, Typography, Box, Button, Input } from "@mui/material";
import React from "react";
import { inject, observer } from "mobx-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import XiLogo from "kit/XiLogo";

const schema = yup.object({
    password: yup.string().min(6).max(100).required(),
}).required();


const PasswordReset = inject("authorizationSt")(observer(({ authorizationSt }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));

    const router = useRouter();

    const { id } = router.query;

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        authorizationSt.saveNewPassword(id, data);
    };

    return (
        <>
            <Head>
                <title>Ξ Авторизация</title>
            </Head>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "background.main",
                }}
            >

                <Stack
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
                            top: "0px",
                            right: "-156px",
                            zIndex: -1,
                        }}
                    >
                        <Image
                            alt="alt"
                            src="/assets/landing/blob3.svg"
                            quality={100}
                            width={256}
                            height={256}
                        />
                    </Box>}
                    {!mobile && <Box
                        sx={{
                            position: "absolute",
                            bottom: "0px",
                            left: "-156px",
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
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={3}
                                sx={{ width: "100%", p: 2, }}
                            >
                                <Image
                                    alt="alt"
                                    src="/assets/auth/ResetPassword.svg"
                                    quality={100}
                                    width={400}
                                    height={400}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <FormControl error={errors?.password?.type === "required"} fullWidth sx={{ maxWidth: 512, }} >
                                        <InputLabel htmlFor="outlined-adornment-password"> <Typography sx={{ color: "text.main" }}>Пароль</Typography> </InputLabel>
                                        <Input
                                            sx={{ backgroundColor: "background.2", width: "100%", }}
                                            label="Адрес почты"
                                            type={showPassword ? "text" : "password"}

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
                                                        {showPassword ? <Visibility sx={{ color: "text.main" }} /> : <VisibilityOff sx={{ color: "text.main" }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {errors?.password?.message === "password must be at least 6 characters" && <Typography variant="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Минимальная длинна пароля - 6 символов </Typography>}
                                        {errors?.password?.message === "password is a required field" && <Typography variant="subtitle1" sx={{ mt: 1, ml: 1, }} color="error"> Обязательное поле </Typography>}
                                    </FormControl>}
                                />
                                {!authorizationSt.passwordReset.emailResetOk && <Button
                                    variant="outlined"
                                    size="large"
                                    type="submit"
                                    sx={{
                                        "&.MuiButton-root": {
                                            fontFamily: "Open Sans, sans-serif",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                            lineHeight: "25px",
                                            width: mobile ? "140px" : "280px",
                                            height: mobile ? "40px" : "50px",
                                            color: "text.primary",
                                            bgcolor: "secondary.main",
                                            borderRadius: mobile ? "62px" : "88px",
                                            "&:hover": {
                                                bgcolor: "secondary.main",
                                            },
                                            mt: 2,
                                            boxShadow: 12,
                                            marginTop: "2%"
                                        }
                                    }}
                                >
                                    Сохранить новый пароль
                                </Button>}
                                {authorizationSt.passwordReset.emailResetOk && <Typography variant="subtitle1"> Пароль успешно сохранён. С этой страницы можно безопасно уходить  </Typography>}
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
                <div />
            </Stack>
        </>
    );
}));

export default PasswordReset;