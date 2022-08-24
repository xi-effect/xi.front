import React, { useEffect, useState } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import {
  Stack,
  Link,
  InputAdornment,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


// eslint-disable-next-line import/no-extraneous-dependencies
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';

const MIN_PASS_LENGTH = 6;
const MAX_PASS_OR_EMAIL_LENGTH = 100;

const schema = yup
  .object({
    email: yup.string().email().max(MAX_PASS_OR_EMAIL_LENGTH).required(),
    password: yup.string().required().min(MIN_PASS_LENGTH).max(MAX_PASS_OR_EMAIL_LENGTH),
  })
  .required();

type Props = {
  authorizationSt: any;
  handleShowErrorInfo: any
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const {authorizationSt, handleShowErrorInfo} = props;

    const router: NextRouter = useRouter();
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const [showPassword, setShowPassword] = useState<boolean>(false);

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
      setErrorMessage(() => ({
        email: '',
        password: '',
        isEmailError: false,
        isPasswordError: false
      }));

      handleShowErrorInfo({
        isServerError: false,
        message: ''
      });

      if (errors.email || errors.password) {

        if (errors.email?.type === 'required') {
          setErrorMessage(prevState => ({
            ...prevState,
            email: '',
            isEmailError: true
          }));
        } else if (errors.email?.type) {
          setErrorMessage(prevState => ({
            ...prevState,
            email: 'Некорректный email',
            isEmailError: true
          }));
        }

        if (errors.password?.type === 'required') {
          setErrorMessage(prevState => ({
            ...prevState,
            password: '',
            isPasswordError: true
          }));
        } else if (!errors.email?.type && (errors.password?.type === 'min' || errors.password?.type === 'max')) {
          setErrorMessage(prevState => ({
            ...prevState,
            password: '',
            isPasswordError: true
          }));
        }

      } else if (authorizationSt.login.error) {

        switch (authorizationSt.login.error) {
          case `User doesn't exist`:
            setErrorMessage(prevState => ({
              ...prevState,
              email: 'Не удалось найти аккаунт',
              password: '',
              isEmailError: true,
              isPasswordError: false
            }));
            break;

          case 'Wrong password':
            setErrorMessage(prevState => ({
              ...prevState,
              password: 'Неправильный пароль',
              isPasswordError: true
            }));
            break;

          case 'Server error':
            handleShowErrorInfo({
              isServerError: true,
              message: 'Ошибка сервера, попробуйте позже'
            });
            break;

          default:
            break;
        }
      }
    }, [errors, authorizationSt]);

    const CustomButton = styled(ButtonUnstyled)`
      background-color: #445AFF;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      border: none;
      color: #FFFFFF;
      &:hover {
        background-color: #697BFF;
      }

      &.${buttonUnstyledClasses.active} {
          
      }

      &.${buttonUnstyledClasses.focusVisible} {
        outline: none;
      }
    `;

    return (
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          width: mobile ? '335px' : '356px',
          height: mobile ? '263px' : '313px',
          mb: mobile ? 0: '32px'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          sx={{
            width: '100%'
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <TextFieldCustom
                variant="outlined"
                error={errorMessage.isEmailError}
                type="text"
                fullWidth
                placeholder="Электронная почта"
                helperText={errorMessage.email}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field}) => (
              <TextFieldCustom
                variant="outlined"
                error={errorMessage.isPasswordError}
                fullWidth
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                helperText={errorMessage.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                    >
                      <Box
                        width="22px"
                        height="22px"
                        borderRadius="8px"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                      {!showPassword ? (
                        <VisibilityOffOutlinedIcon
                          sx={{ fontSize: 22, color: '#000000' }}/> // gray.100
                      ) : (
                        <RemoveRedEyeOutlinedIcon
                          sx={{ fontSize: 22, color: '#000000' }}/> // gray.100
                      )}
                      </Box>
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
              href="/"
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push({pathname: '/resetpassword/email'})}
            >
              <Typography
                variant="body2"
                sx={{color: '#445AFF'}} // primary.dark
              >
                Восстановить пароль
              </Typography>
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
            href="/"
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push({ pathname: '/signup' })}
          >
            <Typography
              variant="subtitle1"
              sx={{color: '#445AFF'}} // primary.dark
            >
              Регистрация
            </Typography>
          </Link>
          <CustomButton
            type="submit"
            sx={{
              width: '120px',
              height: '48px',
              borderRadius: '8px',
              fontFamily: 'Golos',
              fontWeight: 500,
              fontSize: 18,
              lineHeight: '22px',
            }}
          >
            Войти
          </CustomButton>
        </Stack>
      </Box>
    );
  }),
);

export default Form;
