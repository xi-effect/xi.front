/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import {
  Stack,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { motion } from 'framer-motion';
import { inject, observer } from 'mobx-react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import GreenButton from 'kit/GreenButton';

const schema = yup
  .object({
    code: yup.string().length(35).required(),
    username: yup.string().min(1).max(100).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(6).max(100).required(),
    passwordagain: yup.string().min(6).max(100).required(),
  })
  .required();

type Props = {
  authorizationSt?: any;
};

const steps = [
  { type: ['code'], label: 'Код' },
  { type: ['username', 'email'], label: 'Имя и Почта' },
  { type: ['password', 'passwordagain'], label: 'Пароль' },
];

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 24,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(117,203,153) 0%, rgb(83,191,128) 50%, rgb(58,133,89) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(117,203,153) 0%, rgb(83,191,128) 50%, rgb(58,133,89) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

// @ts-ignore
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 24,
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(117,203,153) 0%, rgb(83,191,128) 50%, rgb(58,133,89) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(127,157,223) 0%, rgb(95,133,216) 50%, rgb(66,93,151) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: '1',
    2: '2',
    3: '3',
  };

  return (
    // @ts-ignore
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const { authorizationSt } = props;
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));
    // @ts-ignore
    const mobileBob: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    const router = useRouter();

    const {
      control,
      handleSubmit,
      trigger,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const [passwordError, setPasswordError] = React.useState<boolean>(false);

    const onSubmit = (data: any) => {
      console.log('submit');
      setPasswordError(false);
      // @ts-ignore
      if (data.password !== data.passwordagain) {
        setPasswordError(true);
      } else {
        authorizationSt.clickRegistrationButton(data, trigger);
      }
    };

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [showCode, setShowCode] = React.useState<boolean>(true);

    const handleNextStep = (e) => {
      e.preventDefault();
      setActiveStep(activeStep + 1);
    };

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordAgain, setShowPasswordAgain] = React.useState<boolean>(false);

    React.useEffect(() => {
      if (router.query.invite) setValue('code', router.query.invite);
    }, [router.query, setValue]);

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          position: 'relative',
          width: mobile ? '340px' : '512px',
          zIndex: 0,
        }}>
        {!mobileBob && (
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
        {!mobileBob && (
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
        <Typography component="h1" variant="h4">
          Регистрация
        </Typography>
        <Paper
          elevation={24}
          sx={{
            mt: 4,
            zIndex: 500,
            width: mobile ? '340px' : '512px',
            bgcolor: 'grey.800',
            borderRadius: '20px',
          }}>
          <Box
            component="form"
            sx={{ height: mobile ? '570px' : '700px' }}
            onSubmit={handleSubmit(onSubmit)}>
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100%', height: '100%' }}>
              <Box
                sx={{
                  pt: 2,
                  width: mobileBob ? 126 : 256,
                  height: mobileBob ? 126 : 256,
                }}>
                <Image
                  alt="alt"
                  src="/assets/auth/MobileLogin.svg"
                  quality={100}
                  width={mobileBob ? 126 : 256}
                  height={mobileBob ? 126 : 256}
                />
              </Box>
              <Box sx={{ pt: 2 }}>
                <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                  {steps.map((item, index) => (
                    <Step key={index.toString()}>
                      <StepLabel
                        StepIconComponent={ColorlibStepIcon}
                        error={
                          item.type.some((key) => key in errors) || (passwordError && index === 2)
                        }
                        sx={{
                          minWidth: mobile ? 90 : 140,
                        }}>
                        {item.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Stack
                sx={{ mt: 1, p: 1, width: '100%', height: '100%' }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                {activeStep === 0 && (
                  <>
                    <Typography textAlign="center">
                      {' '}
                      Введите код-приглашение или удостоверьтесь, что он введён, если вы перешли по
                      ссылке-приглашению{' '}
                    </Typography>
                    <Controller
                      name="code"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextFieldCustom
                          variant="filled"
                          error={!!errors?.code}
                          type={showCode ? 'text' : 'password'}
                          fullWidth
                          label="Код-приглашение"
                          helperText={errors?.code && 'обязательное поле'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment sx={{ mr: 0.5 }} position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowCode((prev) => !prev)}
                                  edge="end"
                                  size="large">
                                  {showCode ? (
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
                    <Typography textAlign="center">
                      {' '}
                      Получить код-приглашение можно у уже зарегистрированного пользователя{' '}
                    </Typography>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <Typography textAlign="center">
                      {' '}
                      Придумайте имя, которое будет использоваться как ваше на платформе, а также
                      введите адрес почты{' '}
                    </Typography>
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextFieldCustom
                          variant="filled"
                          error={!!errors?.username}
                          type="text"
                          fullWidth
                          label="Имя пользователя"
                          helperText={`${
                            errors?.username?.type === 'min' ? 'Минимальная длина - 1 символ' : ''
                          }
                          ${
                            errors?.username?.type === 'max'
                              ? 'Максимальная длина - 100 символов'
                              : ''
                          }
                          `}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextFieldCustom
                          variant="filled"
                          error={!!errors?.email}
                          type="text"
                          fullWidth
                          label="Адрес почты"
                          helperText={`${
                            errors?.email?.type === 'required' || errors?.email?.type === 'email'
                              ? 'Невалидно маске почты'
                              : ''
                          }
                          ${
                            errors?.email?.type === 'max' ? 'Максимальная длина - 100 символов' : ''
                          }
                          `}
                          {...field}
                        />
                      )}
                    />
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <Typography textAlign="center"> Придумайте пароль </Typography>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextFieldCustom
                          variant="filled"
                          error={!!errors?.password || passwordError}
                          type={showPassword ? 'text' : 'password'}
                          fullWidth
                          label="Пароль"
                          helperText={`${
                            errors?.password?.type === 'min' ? 'Минимальная длина - 6 символ' : ''
                          }
                          ${
                            errors?.password?.type === 'max'
                              ? 'Максимальная длина - 100 символов'
                              : ''
                          }
                          `}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment sx={{ mr: 0.5 }} position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword((prev) => !prev)}
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
                    <Controller
                      name="passwordagain"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextFieldCustom
                          variant="filled"
                          error={!!errors?.passwordagain || passwordError}
                          type={showPasswordAgain ? 'text' : 'password'}
                          fullWidth
                          label="Пароль повторно"
                          helperText={`${
                            errors?.passwordagain?.type === 'min'
                              ? 'Минимальная длина - 6 символ'
                              : ''
                          }
                          ${
                            errors?.passwordagain?.type === 'max'
                              ? 'Максимальная длина - 100 символов'
                              : ''
                          }
                          ${passwordError ? 'Пароли не совпадают' : ''}
                          `}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment sx={{ mr: 0.5 }} position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPasswordAgain((prev) => !prev)}
                                  edge="end"
                                  size="large">
                                  {showPasswordAgain ? (
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
                  </>
                )}
              </Stack>
              <Stack
                sx={{
                  p: 2,
                  // mt: 'auto',
                }}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                <Button
                  color="inherit"
                  size="large"
                  disabled={activeStep === 0}
                  onClick={() => {
                    setActiveStep((prev) => prev - 1);
                  }}
                  sx={{
                    width: mobile ? '112px' : '140px',
                    height: mobile ? '42px' : '42px',
                    borderRadius: mobile ? '62px' : '88px',
                  }}>
                  Назад
                </Button>
                <GreenButton
                  variant="contained"
                  size="large"
                  onClick={(e) => {
                    if (activeStep !== 2) handleNextStep(e);
                  }}
                  type={activeStep === 2 ? 'submit' : 'button'}
                  sx={{
                    width: mobile ? '146px' : '196px',
                    height: mobile ? '42px' : '42px',
                    borderRadius: mobile ? '62px' : '88px',
                    boxShadow: 2,
                  }}>
                  {activeStep === 2 ? 'Завершить' : 'Вперёд'}
                </GreenButton>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    );
  }),
);

export default Form;
