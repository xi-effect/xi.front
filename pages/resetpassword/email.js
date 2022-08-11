import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import Image from 'next/image';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const PassResetEmail = inject('authorizationSt')(
  observer(({ authorizationSt }) => {
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      authorizationSt.clickPasswordResetButton(data);
    };

    return (
      <>
        <Head>
          <title>Ξ Смена пароля</title>
        </Head>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 0,
              bgcolor: '#FFF',
              boxSizing: 'border-box',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '24px',
            }}
          >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                direction="column"
                spacing={0}
                sx={{
                  boxSizing: 'border-box',
                  height: mobile ? '650px' : '856px',
                  width: mobile ? '375px' : '520px',
                  pl: 2,
                  pr: 2,
                  pb: 4.2,
                  pt: 4.2,
                  mt: 0,
                }}
              >
                <Box display="flex" justifyContent="center">
                  <Image src="/assets/auth/xi.effect.svg" alt="alt" width={130} height={32} />
                </Box>

                <Typography
                  variant="root"
                  sx={{
                    fontFamily: 'Golos Text VF, sans-serif',
                    fontStyle: 'normal',
                    fontSize: 32,
                    fontWeight: 600,
                    textAlign: 'center',
                    marginTop: 5.6,
                    alignItems: 'center',
                    color: '#000000',
                  }}
                >
                  Восстановление
                </Typography>

                <Typography
                  variant="root"
                  sx={{
                    fontFamily: 'Golos Text VF, sans-serif',
                    fontStyle: 'normal',
                    fontSize: 24,
                    fontWeight: 400,
                    textAlign: 'center',
                    marginTop: 1.6,
                    alignItems: 'center',
                    lineHeight: '32px',
                    color: '#000000',
                    opacity: 0.6,
                  }}
                >
                  {!authorizationSt.passwordReset.emailResetOk && 'Введите адрес'}
                  {authorizationSt.passwordReset.emailResetOk && 'Письмо с восстановлением'}
                </Typography>

                <Typography
                  variant="root"
                  sx={{
                    fontFamily: 'Golos Text VF, sans-serif',
                    fontStyle: 'normal',
                    fontSize: 24,
                    fontWeight: 400,
                    textAlign: 'center',
                    alignItems: 'center',
                    lineHeight: '32px',
                    color: '#000000',
                    opacity: 0.6,
                  }}
                >
                  {!authorizationSt.passwordReset.emailResetOk && 'электронной почты'}
                  {authorizationSt.passwordReset.emailResetOk && 'отправлено на вашу почту'}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-around"
                  sx={{
                    width: mobile ? '350px' : '436px',
                    m: 'auto',
                    mt: 3.2,
                    borderRadius: '8px',
                  }}
                >
                  {!authorizationSt.passwordReset.emailResetOk && (
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl
                          error={errors?.email?.type === 'required'}
                          fullWidth
                          sx={{ maxWidth: 512 }}
                          variant="outlined"
                        >
                          <InputLabel>
                            <Box
                              sx={{
                                color: 'black',
                                fontSize: '24px',
                                opacity: 0.4,
                                ml: '20px',
                                mt: '22px',
                              }}
                            >
                              Электронная почта
                            </Box>
                          </InputLabel>
                          <Input
                            sx={{
                              width: mobile ? '320px' : '436px',
                              height: '72px',
                              border: '1px solid rgba(0, 0, 0, 0.2)',
                              borderRadius: '8px',
                              ml: 'auto',
                              mr: 'auto',
                              color: 'black',
                              lineHeight: '32px',
                            }}
                            label="Адрес почты"
                            type="text"
                            {...field}
                          />

                          {errors?.email?.message === 'email is a required field' && (
                            <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1 }} color="error">
                              {' '}
                              Обязательное поле{' '}
                            </Typography>
                          )}
                          {errors?.email?.message === 'email must be a valid email' && (
                            <Typography varinat="subtitle1" sx={{ mt: 1, ml: 1 }} color="error">
                              {' '}
                              Ошибка валидации{' '}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  )}
                  {authorizationSt.passwordReset.emailResetOk && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: '43px' }}
                    >
                      <Image
                        src="/assets/auth/Frame12passOk.svg"
                        alt="alt"
                        width={200}
                        height={200}
                        alignItems="center"
                      />
                    </Box>
                  )}

                  {authorizationSt.passwordReset.errorEmailNotFounedReset && (
                    <Typography variant="subtitle1" color="error">
                      Мы не нашли такой почты
                    </Typography>
                  )}
                </Box>
                {authorizationSt.passwordReset.emailResetOk && (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Image
                      src="/assets/auth/Frame12passOk.svg"
                      alt="alt"
                      width={200}
                      height={200}
                      alignItems="center"
                    />
                  </Box>
                )}

                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  sx={{
                    '&.MuiButton-root': {
                      fontFamily: 'Golos Text VF, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '24px',
                      lineHeight: '25px',
                      width: mobile ? '320px' : '436px',
                      height: mobile ? '50px' : '72px',
                      color: '#FFFFFF',
                      bgcolor: '#000000',
                      '&:hover': {
                        bgcolor: 'gray',
                      },
                      ml: 'auto',
                      mr: 'auto',
                      borderRadius: '8px',
                    },
                  }}
                >
                  {authorizationSt.passwordReset.emailResetOk && 'Войти'}
                  {!authorizationSt.passwordReset.emailResetOk && 'Далее'}
                </Button>

                <Button
                  onClick={() => {
                    router.push({
                      pathname: '/signin',
                    });
                  }}
                  underline="hover"
                  variant="outlined"
                  size="large"
                  type="submit"
                  sx={{
                    '&.MuiButton-root': {
                      fontFamily: 'Golos Text VF, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '24px',
                      lineHeight: '25px',
                      width: mobile ? '320px' : '436px',
                      height: mobile ? '50px' : '72px',
                      color: '#000000',
                      bgcolor: '#FFFFFF',
                      ml: 'auto',
                      mr: 'auto',
                      borderRadius: '8px',
                      border: 0,
                    },
                  }}
                >
                  {!authorizationSt.passwordReset.emailResetOk && 'Отмена'}
                  {authorizationSt.passwordReset.emailResetOk && 'Отправить заново (4:99)'}
                </Button>

                {authorizationSt.passwordReset.emailResetOk && (
                  <Typography variant="subtitle1">
                    Письмо отправлено. С этой страницы можно безопасно уходить
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </>
    );
  }),
);

export default PassResetEmail;
