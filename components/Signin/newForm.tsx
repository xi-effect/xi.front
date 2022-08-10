/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {useRouter, NextRouter} from 'next/router';
// import Image from 'next/image';

import {
  Stack,
  Link,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import {motion} from 'framer-motion';
import {inject, observer} from 'mobx-react';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
// import {createTheme, ThemeProvider} from "@mui/material/styles";
// import Header from "./Header";



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
                error={
                  errors?.email?.type === 'email' ||
                  authorizationSt.login.error === "User doesn't exist"
                }
                type="text"
                fullWidth
                placeholder="Электронная почта"
                helperText={`
                      ${
                  authorizationSt.login.error === "User doesn't exist"
                    ? 'Пользователь с таким e-mail не найден'
                    : ''
                }
                      ${errors?.email?.type === 'email' ? 'Введите корректный e-mail' : ''}
                      `}
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
                error={
                  errors?.password?.type === 'min' ||
                  errors?.password?.type === 'required' ||
                  authorizationSt.login.error === 'Wrong password'
                }
                fullWidth
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                helperText={`
                      ${errors?.password?.type === 'min' ? 'Минимальное число символов - 6' : ''}
                      ${
                  errors?.password?.type === 'max' ? 'Максимальное число символов - 100' : ''
                } 
                      ${
                  authorizationSt.login.error === 'Wrong password' && !errors?.password?.type
                    ? 'Неверный Пароль'
                    : ''
                } 
                      ${
                  authorizationSt.login.error === 'Server error' && !errors?.password?.type
                    ? 'Ошибка сервера'
                    : ''
                }
                      `}
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
