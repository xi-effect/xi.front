/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { observer } from 'mobx-react';
import {
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
  InputAdornment,
  Slide,
} from '@mui/material';
import { Close } from '@xieffect/base.icons.close';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { useSnackbar } from 'notistack';
import { useStore } from 'store/connect';

const Crypto = require('crypto-js');

type FormValues = {
  password: string;
  email: string;
};

const schema = yup
  .object({
    password: yup.string().required().min(6).max(100).required(),
    email: yup.string().required().email().max(100).required(),
  })
  .required();

const EmailChangeDialog = observer((props) => {
  const rootStore = useStore();
  const {
    uiSt: { setDialogs, dialogs },
  } = rootStore;

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (newData) => {
    const { password, email } = newData;
    setEmailError(false);
    setPasswordError(false);
    rootStore
      .fetchData(`${rootStore.url}/email-change/`, 'POST', {
        password: Crypto.SHA384(password).toString(),
        'new-email': email,
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.a === 'Success') {
            enqueueSnackbar('Мы отправили вам письмо на новую почту', {
              variant: 'info',
              autoHideDuration: 5000,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              TransitionComponent: Slide,
            });
            setDialogs('emailChange', false);
          } else if (data.a === 'Email in use') {
            setEmailError(true);
          } else if (data.a === 'Wrong password') {
            setPasswordError(true);
          }
        }
        trigger();
      });
  };

  return (
    <Dialog
      open={dialogs.emailChange ?? false}
      onClose={() => {
        reset();
        setDialogs('emailChange', false);
      }}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          width: '420px',
          height: '376px',
          borderRadius: '16px',
          border: '1px solid #E6E6E6',
          bgcolor: 'grayscale.0',
          boxShadow: 'none',
          position: 'relative',
        },
      }}
    >
      <IconButton
        sx={{ color: 'text.secondary', position: 'absolute', top: '12px', right: '12px' }}
        onClick={() => {
          reset();
          setDialogs('emailChange', false);
        }}
      >
        <Close />
      </IconButton>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          p: 4,
          height: '100%',
          width: '100%',
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '24px', lineHeight: '32px' }}>
          Изменить почту
        </Typography>
        <Typography sx={{ mt: '24px', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
          Введите почту и пароль
        </Typography>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors?.email?.message || passwordError}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              placeholder="Текущий пароль"
              helperText={passwordError && 'Неверный пароль!'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...field}
              sx={{
                mt: '16px',
                backgroundColor: 'grayscale.0',
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors.password?.message}
              fullWidth
              placeholder="Новый адрес почты"
              type="email"
              {...field}
              sx={{
                mt: '16px',
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: '32px',
            width: '356px',
            height: '48px',
            boxShadow: 'none',
            color: 'grayscale.0',
            '&:hover': {
              boxShadow: 'none',
              color: 'grayscale.0',
            },
          }}
        >
          Изменить почту
        </Button>
      </Stack>
    </Dialog>
  );
});

export default EmailChangeDialog;
