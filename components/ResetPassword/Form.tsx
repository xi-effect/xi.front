/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Link, Stack, Typography } from '@mui/material';
import TextFieldCustom from 'kit/TextFieldCustom';
import { useRouter } from 'next/router';

const schema = yup
  .object({
    email: yup.string().email().max(100).required(),
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

const Form: React.FC<ISignupForm> = inject('authorizationSt')(
  observer(({ authorizationSt }) => {
    const router = useRouter();

    const {
      control,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmitHandler: SubmitHandler<SignupFormValues> = (data) => {
      trigger().then((res) => {
        if (res) {
          authorizationSt.clickPasswordResetButton(data);
        }
      });
    };

    return (
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        justifyContent="space-between"
        height="100%"
        position="relative"
      >
        <Stack spacing="16px">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                error={!!errors.email || authorizationSt.passwordReset.emailNotFound}
                type="email"
                fullWidth
                placeholder="Электронная почта"
                helperText={authorizationSt.passwordReset.emailNotFound ? "Не удалось найти аккаунт" : ""}
                {...field}
                sx={{
                  backgroundColor: '#fff',
                }}
              />
            )}
          />
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '16px',
            }}
          >
            Введите адрес, привязанный к аккаунту
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link
            underline="none"
            aria-label="Войти"
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/signin')}
          >
            Войти
          </Link>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '120px',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              textTransform: 'none',
            }}
          >
            Далее
          </Button>
        </Stack>
      </Stack>
    );
  }),
);

export default Form;
