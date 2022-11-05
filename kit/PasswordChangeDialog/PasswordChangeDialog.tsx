/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button,
  Dialog,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
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
import UISt from 'store/ui/uiSt';
import RootStore from 'store/rootStore';

const Crypto = require('crypto-js');

type FormValues = {
  password: string;
  newPassword: string;
  newPasswordAgain: string;
};

const schema = yup
  .object({
    password: yup.string().min(6).max(100).required(),
    newPassword: yup.string().min(6).max(100).required(),
    newPasswordAgain: yup.string().min(6).max(100).required(),
  })
  .required();

type PasswordChangeDialogPropsT = {
  uiSt: UISt;
  rootStore: RootStore;
};

const PasswordChangeDialog = inject(
  'rootStore',
  'uiSt',
)(
  observer((props) => {
    const { uiSt, rootStore }: PasswordChangeDialogPropsT = props;

    const { dialogs, setDialogs } = uiSt;
    const { enqueueSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordNew, setShowPasswordNew] = React.useState(false);
    const [showPasswordNewAgain, setShowPasswordNewAgain] = React.useState(false);

    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    const {
      control,
      handleSubmit,
      trigger,
      reset,
      formState: { errors },
    } = useForm<FormValues>({
      resolver: yupResolver(schema),
    });

    console.log('errors', errors);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const onSubmit = (newData) => {
      const { password, newPassword, newPasswordAgain } = newData;

      setPasswordError(null);

      if (newPassword !== newPasswordAgain) {
        setPasswordError('Пароли не совпадают');
        return;
      }

      rootStore
        .fetchData(`${rootStore.url}/password-change/`, 'POST', {
          password: Crypto.SHA384(password).toString(),
          'new-password': Crypto.SHA384(newPassword).toString(),
        })
        .then((data) => {
          if (data !== undefined) {
            if (data.a === 'Success') {
              // userId //"Success"
              setDialogs('passwordChange', false);
              enqueueSnackbar('Пароль успешно изменён', {
                variant: 'info',
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                TransitionComponent: Slide,
              });
            } else {
              setPasswordError('Ошибка сервера');
            }
          }
          trigger();
        });
    };

    return (
      <Dialog
        open={dialogs.passwordChange ?? false}
        onClose={() => {
          reset();
          setDialogs('passwordChange', false);
        }}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: '420px',
            height: '448px',
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
            setDialogs('passwordChange', false);
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
            Изменить пароль
          </Typography>
          <Typography sx={{ mt: '24px', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
            Введите текущий пароли и новый
          </Typography>
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
                placeholder="Текущий пароль"
                // helperText={getEmailError()}
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
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                error={!!errors.newPassword?.message}
                type={showPasswordNew ? 'text' : 'password'}
                fullWidth
                placeholder="Новый пароль"
                // helperText={getEmailError()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPasswordNew(!showPasswordNew)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPasswordNew ? <Visibility /> : <VisibilityOff />}
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
            name="newPasswordAgain"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                error={!!errors.newPasswordAgain?.message || !!passwordError}
                fullWidth
                placeholder="Подтверждение нового пароля"
                type={showPasswordNewAgain ? 'text' : 'password'}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPasswordNewAgain(!showPasswordNewAgain)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPasswordNewAgain ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            Изменить
          </Button>
        </Stack>
      </Dialog>
    );
  }),
);

export default PasswordChangeDialog;
