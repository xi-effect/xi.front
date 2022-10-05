import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { Button, Stack, Link, InputAdornment, Box } from '@mui/material';

import { Eyeoff } from '@xieffect/base.icons.eyeoff';
import { Eyeon } from '@xieffect/base.icons.eyeon';

import AuthorizationSt from '../../store/user/authorizationSt';

type FormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().max(100).required(),
    password: yup.string().required().min(6).max(100),
  })
  .required();

type Props = {
  authorizationSt: AuthorizationSt;
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const { authorizationSt } = props;
    const { signin } = authorizationSt;
    const { errorEmail, errorPassword } = signin;

    const router: NextRouter = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
      control,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm<FormValues>({
      resolver: yupResolver(schema),
    });

    console.log('errors', errors);

    const onSubmit = (data) => {
      trigger();
      authorizationSt.clickSigninButton(data, trigger);
    };

    const getEmailError = () => {
      if (errors.email?.message) return 'Некорректный email';
      if (errorEmail) return 'Не удалось найти аккаунт';
      return null;
    };

    const getPasswordError = () => {
      if (errors.email || errorPassword) return 'Неправильный пароль';
      return null;
    };

    return (
      <Stack
        height="100%"
        direction="column"
        justifyContent="space-between"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="column" spacing={2}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                error={!!errors.email?.message || !!errorEmail}
                type="email"
                fullWidth
                placeholder="Электронная почта"
                helperText={getEmailError()}
                {...field}
                sx={{
                  backgroundColor: 'gray.0',
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
                error={!!errors.password?.message || !!errorPassword}
                fullWidth
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                helperText={getPasswordError()}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: '7px' }}>
                      <Box
                        width="24px"
                        height="24px"
                        borderRadius="8px"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? <Eyeoff /> : <Eyeon />}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Link
            underline="none"
            sx={{
              cursor: 'pointer',
              color: 'primary.dark',
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '18px',
              letterSpacing: 0,
            }}
            onClick={() => router.push('/resetpassword/email')}
          >
            Восстановить пароль
          </Link>
        </Stack>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Link
            underline="none"
            sx={{
              cursor: 'pointer',
              color: 'primary.dark',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '20px',
              letterSpacing: 0,
            }}
            onClick={() => router.push('/signup')}
          >
            Регистрация
          </Link>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '120px',
              height: '48px',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: 18,
              lineHeight: '22px',
              textTransform: 'capitalize',
            }}
          >
            Войти
          </Button>
        </Stack>
      </Stack>
    );
  }),
);

export default Form;
