/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Stack,
  Input,
  Link,
  useMediaQuery,
  InputLabel,
  InputAdornment,
  Tooltip,
  IconButton,
  FormControl,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";

import React from "react";
import { inject, observer } from "mobx-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion"

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })
  .required();


const Login = inject(
  "authorizationSt"
)(
  observer(({ authorizationSt }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("dl"));

    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    console.log("errors", errors);
    const onSubmit = (data) => authorizationSt.clickEnterButton(data);

    return (
      <>
        <Head>
          <title>Ξffect | Вход</title>
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
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="baseline"
            >
              <Typography
                component="h1"
                onClick={() => {
                  router.push({
                    pathname: "/",
                  })
                }}

                variant="Roboto500XiLabel"
                sx={{
                  mt: "1px",
                  cursor: "pointer",
                  color: "secondary.main",
                  fontSize: {
                    sm: "28px",
                    md: "34px",
                    lg: "40px",
                  },
                }}
              >
                Ξ
              </Typography>
              <Typography
                component="h1"
                onClick={() => {
                  router.push({
                    pathname: "/",
                  })
                }}

                variant="IBMPlexMono500XiLabelEnd"
                sx={{
                  "&.MuiTypography-root": {
                    cursor: "pointer",
                    color: "secondary.main",
                  },
                  fontSize: {
                    sm: "28px",
                    md: "34px",
                    lg: "40px",
                  },
                }}
              >
                ffect
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              position: "relative",
              width: "calc(100% - 32px)",
              maxWidth: 512,
              zIndex: 0,
              // mt: mobile ? "2px" : -32,
              // mt: 10,
              // ml: mobile ? "16px" : "100px",
              // mr: mobile ? "16px" : "100px",
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
                src="/assets/landing/blob1.svg"
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
                src="/assets/landing/blob3.svg"
                quality={100}
                width={256}
                height={256}
              />
            </Box>}
            <Paper
              elevation={24}
              sx={{
                zIndex: 500,
                // mt: mobile ? "2px" : -32,
                // mt: 10,
                // ml: mobile ? "16px" : "100px",
                // mr: mobile ? "16px" : "100px",
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
                    src="/assets/auth/Login.svg"
                    quality={100}
                    width={456}
                    height={456}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl
                        error={
                          errors?.email?.type === "required" ||
                          authorizationSt.login.error === "User doesn't exist"
                        }
                        fullWidth
                        sx={{
                          mt: 2,
                          pl: 1,
                          pr: 1,
                        }}
                      >
                        <InputLabel>
                          <Typography sx={{ color: "text.primary" }}>
                            Адрес почты
                          </Typography>
                        </InputLabel>
                        <Input
                          sx={{ width: "100%" }}
                          label="Адрес почты"
                          type="text"
                          {...field}
                          endAdornment={
                            <InputAdornment sx={{ mr: 2 }} position="end">
                              <IconButton edge="end" size="large">
                                <Tooltip title="Ваш адресс электронной почты" arrow>
                                  <EmailIcon sx={{ color: "text.secondary" }} />
                                </Tooltip>
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  />
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                    sx={{ width: "100%", minHeight: 16, mb: 1.2 }}
                  >
                    {authorizationSt.login.error === "User doesn't exist" && (
                      <Typography
                        variant="subtitle1"
                        sx={{ mt: 1, ml: 1 }}
                        color="error"
                      >
                        Пользователь не найден
                      </Typography>
                    )}
                  </Stack>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl
                        error={
                          errors?.password?.type === "min" ||
                          errors?.password?.type === "required" ||
                          authorizationSt.login.error === "Wrong password"
                        }
                        fullWidth
                        sx={{
                          mt: -2,
                          pl: 1,
                          pr: 1,
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          <Typography sx={{ color: "text.primary" }}>
                            Пароль
                          </Typography>
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
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <Visibility sx={{ color: "text.secondary" }} />
                                ) : (
                                  <VisibilityOff sx={{ color: "text.secondary" }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  />
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                    sx={{ width: "100%", minHeight: 4, mb: 1.2 }}
                  >
                    {authorizationSt.login.error === "Wrong password" && (
                      <Typography
                        variant="subtitle1"
                        sx={{ mt: 1, ml: 1 }}
                        color="error"
                      >
                        Неверный Пароль
                      </Typography>
                    )}
                    {authorizationSt.login.error === "Server error" && (
                      <Typography
                        variant="subtitle1"
                        sx={{ mt: 1, ml: 1 }}
                        color="error"
                      >
                        Ошибка сервера
                      </Typography>
                    )}
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: "100%" }}
                  >
                    <Link
                      sx={{ color: "text.secondary", ml: 1.5, fontWeight: 500, cursor: "pointer" }}
                      onClick={() => {
                        router.push({
                          pathname: "/registration",
                        });
                      }}
                      underline="hover"
                    >
                      Регистрация
                    </Link>
                    <Typography component="span" sx={{ color: "text.secondary", cursor: "pointer", fontWeight: 500, }} >
                      /
                    </Typography>
                    <Link
                      sx={{ color: "text.secondary", m: 1, fontWeight: 500, cursor: "pointer" }}
                      onClick={() => {
                        router.push({
                          pathname: "/resetpassword/email",
                        });
                      }}
                      underline="hover"
                    >
                      Смена пароля
                    </Link>
                  </Stack>
                  <Button
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
                        width: mobile ? "140px" : "160px",
                        height: mobile ? "40px" : "50px",
                        color: "text.primary",
                        bgcolor: "secondary.main",
                        borderRadius: mobile ? "62px" : "88px",
                        "&:hover": {
                          bgcolor: "secondary.main",
                        },
                        mt: 2,
                        boxShadow: 12,
                      }
                    }}
                  >
                    Войти
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Box>

          <div />
        </Stack >
      </>
    );
  })
);

export default Login;
