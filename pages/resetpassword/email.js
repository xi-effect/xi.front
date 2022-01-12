import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Stack,
  Input,
  Link,
  useMediaQuery,
  useTheme,
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
import EmailIcon from "@mui/icons-material/Email";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion";

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const PassResetEmail = inject(
  "authorizationStore"
)(
  observer(({ authorizationStore }) => {
    const theme = useTheme();
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      authorizationStore.clickPasswordResetButton(data);
    };

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
            sx={{
              height: mobile ? "100px" : "140px",
              p: mobile ? "20px" : "40px",
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="baseline"
            >
              <Typography
                component={"h1"}
                onClick={() => {
                  router.push({
                    pathname: "/",
                  });
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
                component={"h1"}
                onClick={() => {
                  router.push({
                    pathname: "/",
                  });
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
              position: 'relative',
              width: 'calc(100% - 32px)',
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
                position: 'absolute',
                top: '0px',
                right: '-156px',
                zIndex: -1,
              }}
            >
              <Image
                alt="alt"
                src={"/landing/blob3.svg"}
                quality={100}
                width={256}
                height={256}
              />
            </Box>}
            {!mobile && <Box
              sx={{
                position: 'absolute',
                bottom: '0px',
                left: '-156px',
                zIndex: -1,
              }}
            >
              <Image
                alt="alt"
                src={"/landing/blob2.svg"}
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
                    src={"/auth/ResetPassword.svg"}
                    quality={100}
                    width={456}
                    height={256}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl
                        error={errors?.email?.type === "required"}
                        fullWidth
                        sx={{ maxWidth: 512, mt: 1 }}
                        variant="outlined"
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
                            <InputAdornment position="end">
                              <IconButton edge="end" size="large">
                                <Tooltip
                                  title="Ваш адресс электронной почты"
                                  arrow
                                >
                                  <EmailIcon sx={{ color: "text.secondary" }} />
                                </Tooltip>
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors?.email?.message ===
                          "email is a required field" && (
                            <Typography
                              varinat="subtitle1"
                              sx={{ mt: 1, ml: 1 }}
                              color="error"
                            >
                              {" "}
                              Обязательное поле{" "}
                            </Typography>
                          )}
                        {errors?.email?.message ===
                          "email must be a valid email" && (
                            <Typography
                              varinat="subtitle1"
                              sx={{ mt: 1, ml: 1 }}
                              color="error"
                            >
                              {" "}
                              Ошибка валидации{" "}
                            </Typography>
                          )}
                        <Link
                          sx={{
                            color: "text.secondary",
                            m: 1,
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            router.push({
                              pathname: "/login",
                            });
                          }}
                          underline="hover"
                        >
                          на страницу входа
                        </Link>
                      </FormControl>
                    )}
                  />
                  {authorizationStore.passwordReset.errorEmailNotFounedReset && (
                    <Typography variant="subtitle1">
                      Пользователя с таким адресом электронной почты не существует
                    </Typography>
                  )}
                  {!authorizationStore.passwordReset.emailResetOk && (
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
                          width: mobile ? "220px" : "220px",
                          height: mobile ? "40px" : "50px",
                          color: "text.primary",
                          bgcolor: "secondary.main",
                          borderRadius: mobile ? "62px" : "88px",
                          "&:hover": {
                            bgcolor: "secondary.main",
                          },
                          mt: 2,
                          boxShadow: 12,
                        },
                      }}
                    >
                      Отправить письмо
                    </Button>
                  )}
                  {authorizationStore.passwordReset.emailResetOk && (
                    <Typography variant="subtitle1">
                      Письмо отправлено. С этой страницы можно безопасно уходить
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Paper>
          </Box>
          <div></div>
        </Stack>
      </>
    );
  })
);

export default PassResetEmail;
