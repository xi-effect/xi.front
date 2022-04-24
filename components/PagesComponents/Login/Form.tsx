/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import Image from 'next/image';

import {
  Stack,
  Link,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { motion } from 'framer-motion';
import { inject, observer } from 'mobx-react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';

const schema = yup
  .object({
    email: yup.string().email().max(100).required(),
    password: yup.string().min(6).max(100).required(),
  })
  .required();

type Props = {
  authorizationSt?: any;
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const { authorizationSt } = props;
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    const router: NextRouter = useRouter();

    // React.useEffect(() => {
    //   console.log('authorizationSt');
    // }, [authorizationSt]);

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const {
      control,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      trigger();
      authorizationSt.clickEnterButton(data, trigger);
    };

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          position: 'relative',
          width: 'calc(100% - 32px)',
          maxWidth: 512,
          zIndex: 0,
        }}>
        {!mobile && (
          <Box
            sx={{
              position: 'absolute',
              top: '0px',
              right: '-156px',
              zIndex: -1,
            }}>
            <Image
              alt="alt"
              src="/assets/landing/blob1.svg"
              quality={100}
              width={256}
              height={256}
            />
          </Box>
        )}
        {!mobile && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '0px',
              left: '-156px',
              zIndex: -1,
            }}>
            <Image
              alt="alt"
              src="/assets/landing/blob3.svg"
              quality={100}
              width={256}
              height={256}
            />
          </Box>
        )}
        <Typography variant="h3">Вход</Typography>
        <Paper
          elevation={24}
          sx={{
            mt: 4,
            zIndex: 500,
            bgcolor: 'grey.800',
            borderRadius: '20px',
          }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100%' }}>
              <Image
                alt="alt"
                src="/assets/auth/Login.svg"
                quality={100}
                width={512}
                height={512}
              />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ width: '100%', maxWidth: '386px', mt: '-32px', pr: 1, pl: 1 }}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="filled"
                      error={
                        errors?.email?.type === 'email' ||
                        authorizationSt.login.error === "User doesn't exist"
                      }
                      type="text"
                      fullWidth
                      label="Адрес почты"
                      helperText={
                        authorizationSt.login.error === "User doesn't exist" &&
                        'Пользователь не найден'
                      }
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="filled"
                      error={
                        errors?.password?.type === 'min' ||
                        errors?.password?.type === 'required' ||
                        authorizationSt.login.error === 'Wrong password'
                      }
                      fullWidth
                      label="Пароль"
                      type={showPassword ? 'text' : 'password'}
                      helperText={`${
                        authorizationSt.login.error === 'Wrong password' ? 'Неверный Пароль' : ''
                      }${authorizationSt.login.error === 'Server error' ? 'Ошибка сервера' : ''}`}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="large">
                              {showPassword ? (
                                <Visibility sx={{ color: 'text.secondary' }} />
                              ) : (
                                <VisibilityOff sx={{ color: 'text.secondary' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...field}
                    />
                  )}
                />
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ width: '100%' }}>
                  <Link
                    sx={{ color: 'text.secondary', fontWeight: 500, cursor: 'pointer' }}
                    onClick={() => {
                      router.push({
                        pathname: '/resetpassword/email',
                      });
                    }}
                    underline="hover">
                    восстановить пароль
                  </Link>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: '100%', pt: 2, pb: 4 }}>
                  <Button
                    // variant="outlined"
                    size="large"
                    onClick={() => {
                      router.push({
                        pathname: '/registration',
                      });
                    }}
                    sx={{
                      '&.MuiButton-root': {
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        lineHeight: '26px',
                        letterSpacing: '0.46000000834465027px',
                        width: mobile ? '140px' : '140px',
                        height: mobile ? '42px' : '42px',
                        color: 'text.primary',
                        borderRadius: mobile ? '62px' : '88px',
                        // border: `2px solid #53BF80`,
                      },
                    }}>
                    РЕГИСТРАЦИЯ
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{
                      '&.MuiButton-root': {
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        lineHeight: '26px',
                        letterSpacing: '0.46000000834465027px',
                        width: mobile ? '196px' : '196px',
                        height: mobile ? '42px' : '42px',
                        color: 'text.primary',
                        bgcolor: 'secondary.main',
                        borderRadius: mobile ? '62px' : '88px',
                        '&:hover': {
                          bgcolor: 'secondary.dark',
                        },
                        boxShadow: 2,
                      },
                    }}>
                    ВОЙТИ
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    );
  }),
);

export default Form;
