/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { Box, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const schema = yup
  .object({
    code: yup.string().length(35).required(),
    username: yup.string().min(1).max(100).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(6).max(100).required(),
  })
  .required();

interface ISignupForm {
  authorizationSt?: any;
}

type SignupFormValues = {
  code: string;
  username: string;
  email: string;
  password: string;
};

const SignupForm: React.FC<ISignupForm> = inject('authorizationSt')(
  observer(({ authorizationSt }) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    const {
      control,
      handleSubmit,
      trigger,
      formState: { errors, touchedFields },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const nextStepHandler = () => {
      if (activeStep < 1) {
        trigger(Object.keys(touchedFields)).then((res) => {
          if (res) {
            setActiveStep((prev) => prev + 1);
          }
        });
      }
    };

    const prevStepHandler = () => {
      if (activeStep > 0) {
        setActiveStep((prev) => prev - 1);
      }
    };

    const onSubmitHandler: SubmitHandler<SignupFormValues> = (data) => {
      console.log(errors);
      trigger().then((res) => {
        if (res) {
          authorizationSt.clickRegistrationButton(data);
        }
      });
    };

    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{
          height: '100%',
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          justifySelf: 'flex-end',
        }}
      >
        <Box>
          <Stack spacing="16px">
            {activeStep === 0 && (
              <>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="outlined"
                      error={!!errors.username?.message}
                      type="text"
                      fullWidth
                      placeholder="Имя пользователя"
                      helperText={errors.username?.message ? 'Обязательное поле' : ''}
                      {...field}
                      sx={{
                        backgroundColor: '#fff',
                      }}
                    />
                  )}
                />
                <Controller
                  name="code"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="outlined"
                      error={!!errors.code?.message}
                      type="text"
                      fullWidth
                      placeholder="Код-приглашение"
                      helperText={errors.code?.message ? 'Длина кода должна быть 35 символов' : ''}
                      {...field}
                      sx={{
                        backgroundColor: '#fff',
                      }}
                    />
                  )}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="outlined"
                      error={!!errors.email?.message}
                      type="email"
                      fullWidth
                      placeholder="Электронная почта"
                      helperText={errors.email?.message ? 'Введите корректный e-mail' : ''}
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
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="outlined"
                      error={!!errors.password?.message}
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      placeholder="Придумайте пароль"
                      helperText={
                        errors.password?.message ? 'Длина пароля от 6 до 100 символов' : ''
                      }
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="large"
                            >
                              {!showPassword ? (
                                <Visibility sx={{ color: 'gray.100' }} />
                              ) : (
                                <VisibilityOff sx={{ color: 'gray.100' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        backgroundColor: '#fff',
                      }}
                    />
                  )}
                />
              </>
            )}
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {activeStep === 0 && (
            <>
              <Link
                underline="hover"
                sx={{
                  cursor: 'pointer',
                  color: 'primary.dark',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
                onClick={() => {
                  router.push({
                    pathname: '/signin',
                  });
                }}
              >
                Ко входу
              </Link>
              <Button
                onClick={nextStepHandler}
                variant="contained"
                sx={{
                  width: '120px',
                  height: '48px',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '22px',
                  textTransform: 'none',
                }}
              >
                Далее
              </Button>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Link
                underline="hover"
                sx={{
                  cursor: 'pointer',
                  color: 'primary.dark',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
                onClick={() => prevStepHandler()}
              >
                Назад
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
                  textTransform: 'none',
                }}
              >
                Далее
              </Button>
            </>
          )}
        </Box>
      </Box>
    );
  }),
);

export default SignupForm;
