import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { Button, Stack, Link, InputAdornment, Box } from '@mui/material';

import { Eyeoff } from '@xieffect/base.icons.eyeoff';
import { Eyeon } from '@xieffect/base.icons.eyeon';
import { useStore } from 'store/connect';
import { getLastCodeFromURL } from 'utils/getLastCodeFromURL';

const schema = yup
  .object({
    password: yup.string().min(6).max(100).required(),
    passwordAgain: yup.string().min(6).max(100).required(),
  })
  .required();

type SignupFormValues = {
  password: string;
  passwordAgain: string;
};

const Form = observer(() => {
  const rootStore = useStore();
  const { authorizationSt } = rootStore;
  const router: NextRouter = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState<boolean>(false);
  const [passwordsError, setPasswordsError] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<SignupFormValues> = (data) => {
    const id = getLastCodeFromURL();
    setPasswordsError(false);
    trigger();
    if (data.password !== data.passwordAgain) {
      setPasswordsError(true);
    } else {
      authorizationSt.saveNewPassword(id, { password: data.password });
    }
  };

  const getPasswordError = () => {
    if (errors.passwordAgain?.message) return 'Неправильный пароль';
    if (passwordsError) return 'Пароли не совпадают';
    return '';
  };

  return (
    <Stack
      height="100%"
      direction="column"
      justifyContent="space-between"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Stack direction="column" spacing={2}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors.password?.message}
              fullWidth
              placeholder="Пароль"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.password?.message ? 'Неправильный пароль' : ''}
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
        <Controller
          name="passwordAgain"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors.passwordAgain?.message}
              fullWidth
              placeholder="Подтверждение пароля"
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
                      onClick={() => setShowPasswordAgain(!showPasswordAgain)}
                    >
                      {!showPasswordAgain ? <Eyeoff /> : <Eyeon />}
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
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
          onClick={() => router.push('/')}
        >
          Войти
        </Link>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: '160px',
            height: '48px',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
            textTransform: 'capitalize',
          }}
        >
          Сохранить
        </Button>
      </Stack>
    </Stack>
  );
});

export default Form;
