/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React, {useEffect, useState} from 'react';
import {useRouter, NextRouter} from 'next/router';
// import Image from 'next/image';

import {
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Box,
  Button,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {inject, observer} from 'mobx-react';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';

const MIN_PASS_LENGTH = 6;
const MAX_PASS_OR_EMAIL_LENGTH = 100;

const schema = yup
  .object({
    email: yup.string().email().max(MAX_PASS_OR_EMAIL_LENGTH).required(),
    password: yup.string().min(MIN_PASS_LENGTH).max(MAX_PASS_OR_EMAIL_LENGTH).required(),
  })
  .required();

type Props = {
  authorizationSt?: any;
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const {authorizationSt} = props;
    // @ts-ignore
    // const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    // @ts-ignore
    // const mobileImage: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const router: NextRouter = useRouter();

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const {
      control,
      handleSubmit,
      trigger,
      formState: {errors},
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      trigger();
      authorizationSt.clickEnterButton(data, trigger);
    };

    // @ts-ignore
    const [errorMessage, setErrorMessage] = useState({
      email: '',
      password: '',
      isEmailError: false,
      isPasswordError: false
    });

    useEffect(() => {

      let email = '';
      let password = '';

      if (authorizationSt.login.error === "User doesn't exist") {
        email = 'Пользователь с таким e-mail не найден';
      } else if (authorizationSt.login.error === "Wrong password") {
        password = 'Неверный Пароль';
      }else if (authorizationSt.login.error === "Server error") {
        [email, password] = 'Ошибка сервера';
      } else if (errors?.email?.type === "email") {
        email = 'Введите корректный e-mail';
      } else if (errors?.password?.type === "min") {
        password = `Минимальное число символов - ${MIN_PASS_LENGTH}`;
      }else if (errors?.password?.type === "max") {
        password = `Максимальное число символов - ${MAX_PASS_OR_EMAIL_LENGTH}`;
      }else if (errors?.password?.type === "required") {
        password = `Пароль не может быть пустым`;
      }

      setErrorMessage({
        email,
        password,
        isEmailError: !!email,
        isPasswordError: !!password
      });

    }, [errors, authorizationSt]);


    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          height: '100%',
        }}

        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          sx={{
            width: '100%'
          }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""

            render={({field}) => (
              <TextFieldCustom
                variant="outlined"
                error={errorMessage?.isEmailError}
                type="text"
                fullWidth
                placeholder="Электронная почта"
                helperText={errorMessage?.email}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({field}) => (
              <TextFieldCustom
                variant="outlined"
                error={errorMessage?.isPasswordError}
                fullWidth
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                helperText={errorMessage?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment sx={{mr: 0.5}} position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="large"
                      >
                        {!showPassword ? (
                          <Visibility sx={{color: 'gray.100'}}/>
                        ) : (
                          <VisibilityOff sx={{color: 'gray.100'}}/>
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
            justifyContent="flex-start"
            alignItems="center"
            sx={{width: '100%'}}
          >
            <Link
              underline="hover"
              sx={{
                cursor: 'pointer',
                color: 'primary.dark',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px'
              }}
              onClick={() => {
                router.push({
                  pathname: '/resetpassword/email',
                });
              }}
            >
              Восстановить пароль
            </Link>
          </Stack>
        </Stack>


        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: '100%'
          }}
        >
          <Link
            underline="hover"
            sx={{
              cursor: 'pointer',
              color: 'primary.dark',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px'
            }}
            onClick={() => {
              router.push({
                pathname: '/signup',
              });
            }}
          >
            Регистрация
          </Link>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: '120px',
              height: '48px',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              textTransform: 'none'
            }}
          >
            Войти
          </Button>
        </Stack>
      </Box>
    );
  }),
);

export default Form;
