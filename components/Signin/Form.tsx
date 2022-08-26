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
  Box
} from '@mui/material';


// eslint-disable-next-line import/no-extraneous-dependencies
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import MyIcon from "../../kit/MyIcon";

const CustomButton = styled(ButtonUnstyled)`
  background-color: #445AFF;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  color: #FFFFFF;
  margin-top: -2px;


  &:hover {
    background-color: #697BFF;
  }

  &.${buttonUnstyledClasses.active} {

  }

  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }
`;

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
  handleShowErrorInfo: any,
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const {authorizationSt, handleShowErrorInfo} = props;

    const router: NextRouter = useRouter();

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
      console.log('onSubmit');
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


    return (
      <Stack
        height="100%"
        direction="column"
        justifyContent="space-between"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({field}) => (
              <TextFieldCustom
                variant="outlined"
                error={errorMessage.isEmailError}
                type="text"
                fullWidth
                placeholder="Электронная почта"
                helperText={errorMessage.email}
                {...field}
                sx={{
                  backgroundColor: '#fff',
                }}
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
                error={errorMessage.isPasswordError}
                fullWidth
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                helperText={errorMessage.password}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{mr: '7px', mt: '3px'}}
                    >
                      <Box
                        width="22px"
                        height="22px"
                        borderRadius="8px"
                        sx={{cursor: 'pointer'}}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <MyIcon name="eye-off"/>
                        ) : (
                          <MyIcon name="eye-on"/>
                        )}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Link
            underline="none"
            href="/"
            sx={{
              cursor: 'pointer',
              color: '#445AFF', // primary.dark
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '18px',
              letterSpacing: 0
            }}
            // paddingBottom="137px"
            onClick={() => router.push({pathname: '/resetpassword/email'})}
          >
            Восстановить пароль
          </Link>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            underline="none"
            sx={{
              cursor: 'pointer',
              color: '#445AFF', // primary.dark
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '20px',
              letterSpacing: 0
            }}
            onClick={() => router.push({pathname: '/signup'})}
          >
            Регистрация
          </Link>
          <CustomButton
            type="submit"
            variant="contained"
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
      </Stack>
    );
  }),
);

export default Form;
