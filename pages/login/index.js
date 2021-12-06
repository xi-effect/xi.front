import Head from "next/head";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Grid,
  Stack,
  Input,
  Link,
  useMediaQuery,
  TextField,
  useTheme,
  InputLabel,
  InputAdornment,
  Tooltip,
  IconButton,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Switch,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { Link as LinkUI } from "@mui/material";
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
  "rootStore",
  "uiStore",
  "authorizationStore"
)(
  observer(({ rootStore, authorizationStore, uiStore }) => {
    const theme = useTheme();

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
    const onSubmit = (data) => authorizationStore.clickEnterButton(data);

    React.useEffect(() => {
      if (uiStore.load.login) uiStore.setLoading("loading", true)
      setTimeout(() => {
        uiStore.setLoading("loading", false)
        uiStore.setLoading("login", false)
      }, 3000);
    }, [])

    return (
      <>
        <Head>
          <title>Ξ Вход</title>
        </Head>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "background.1",
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
              src={"/svg/BackgroundWaves.svg"}
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
            spacing={1}
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
            sx={{ zIndex: 2, p: 1, borderRadius: 16, width: "100%", mt: -20, maxWidth: 512 }}
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
                src={"/svg/Secure.svg"}
                // layout="fill"
                // objectFit="cover"
                quality={100}
                width={456}
                height={256}
              // onLoadingComplete={() => setLoading(false)}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    error={
                      errors?.email?.type === "required" ||
                      authorizationStore.login.error === "User doesn't exist"
                    }
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      <Typography sx={{ color: "text.main" }}>
                        Адрес почты
                      </Typography>
                    </InputLabel>
                    <OutlinedInput
                      sx={{ backgroundColor: "background.main", width: "100%" }}
                      label="Адрес почты"
                      type="text"
                      // value={emailReset}
                      // onChange={null}
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton edge="end" size="large">
                            <Tooltip title="Ваш адресс электронной почты" arrow>
                              <EmailIcon sx={{ color: "text.main" }} />
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
                {authorizationStore.login.error === "User doesn't exist" && (
                  <Typography
                    varinat="subtitle1"
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
                      authorizationStore.login.error === "Wrong password"
                    }
                    fullWidth
                    sx={{ maxWidth: 512 }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      <Typography sx={{ color: "text.main" }}>
                        Пароль
                      </Typography>
                    </InputLabel>
                    <OutlinedInput
                      sx={{ backgroundColor: "background.main", width: "100%" }}
                      label="Пароль"
                      type={showPassword ? "text" : "password"}
                      // value={emailReset}
                      // onChange={null}
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? (
                                <Visibility sx={{ color: "text.main" }} />
                              ) : (
                                <VisibilityOff sx={{ color: "text.main" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
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
                {authorizationStore.login.error === "Wrong password" && (
                  <Typography
                    varinat="subtitle1"
                    sx={{ mt: 1, ml: 1 }}
                    color="error"
                  >
                    Неверный Пароль
                  </Typography>
                )}
                {authorizationStore.login.error === "Server error" && (
                  <Typography
                    varinat="subtitle1"
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
                  sx={{ color: "text.main", m: 1, cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "/registration",
                    });
                  }}
                  underline="hover"
                >
                  Регистрация
                </Link>
                {"/"}
                <Link
                  sx={{ color: "text.main", m: 1, cursor: "pointer" }}
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
                  mt: 4,
                  color: "text.main",
                  bgcolor: "background.main",
                  border: `2px solid ${theme.palette.text.dark}`,
                  "&:hover": { border: `2px solid ${theme.palette.text.dark}` },
                }}
              >
                Войти
              </Button>
            </Stack>
          </Box>
          <div></div>
        </Stack>
      </>
    );
  })
);

export default Login;
