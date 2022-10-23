import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { Close } from '@xieffect/base.icons.close';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';

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
  userSt?: any;
  uiSt?: any;
};

const PasswordChangeDialog = inject('uiSt')(
  observer(({ uiSt }: PasswordChangeDialogPropsT) => {
    const { dialogs, setDialogs } = uiSt;

    const {
      control,
      handleSubmit,
      trigger,
      // formState: { errors },
    } = useForm<FormValues>({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      trigger();
      console.log('data', data);
    };

    return (
      <Dialog
        open={dialogs.passwordChange ?? false}
        onClose={() => setDialogs('passwordChange', false)}
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
          onClick={() => setDialogs('passwordChange', false)}
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
            Введите текущий и новый пароли
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                // error={!!errors.email?.message || !!errorEmail}
                type="password"
                fullWidth
                placeholder="Текущий пароль"
                // helperText={getEmailError()}
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
                // error={!!errors.email?.message || !!errorEmail}
                type="password"
                fullWidth
                placeholder="Новый пароль"
                // helperText={getEmailError()}
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
                // error={!!errors.password?.message || !!errorPassword}
                fullWidth
                placeholder="Подтверждение нового пароля"
                type="password"
                // helperText={getPasswordError()}
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