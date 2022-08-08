import React from 'react';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContentText,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { inject, observer } from 'mobx-react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { useSnackbar } from 'notistack';

const Crypto = require('crypto-js');

const schema = yup
  .object({
    password: yup.string().min(6).max(100).required(),
    newEmail: yup.string().email().max(100).required(),
  })
  .required();

const DialogChangeEmail = inject('rootStore')(
  observer(({ rootStore, openEmailChangeDialog, setOpenEmailChangeDialog }) => {
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
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (newData) => {
      setEmailError(false);
      setPasswordError(false);
      rootStore
        .fetchData(`${rootStore.url}/email-change/`, 'POST', {
          password: Crypto.SHA384(newData.password).toString(),
          'new-email': newData.newEmail,
        })
        .then((data) => {
          if (data !== undefined) {
            if (data.a === 'Success') {
              setOpenEmailChangeDialog(false);
              enqueueSnackbar('Мы отправили вам письмо на новую почту', {
                variant: 'info',
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                TransitionComponent: Slide,
              });
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
        open={openEmailChangeDialog}
        onClose={() => {
          reset();
          setOpenEmailChangeDialog(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Изменение адреса электронной почты </DialogTitle>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: 2,
          }}
        >
          <DialogContentText>
            Чтобы изменить адрес электронной почты, введите сначала текущий пароль, а затем введите
            новый адрес электронной почты. Мы отправим письмо-подтверждение на новый адрес
            электроной почты. Откройте письмо и перейдите по ссылке.
          </DialogContentText>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextFieldCustom
                  variant="filled"
                  error={errors?.email?.password || passwordError}
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  label="Пароль"
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
                />
              )}
            />
            <Controller
              name="newEmail"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextFieldCustom
                  variant="filled"
                  error={errors?.email?.type === 'newEmail' || emailError}
                  type="text"
                  fullWidth
                  label="Новый адрес почты"
                  helperText={emailError && 'Эта почта уже используется!'}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{
              pt: 2,
            }}
          >
            <Button color="inherit" onClick={() => setOpenEmailChangeDialog(false)}>
              отмена
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Готово
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  }),
);

export default DialogChangeEmail;
