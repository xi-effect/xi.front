import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Typography, Button, Box, InputAdornment, Link, Stack } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import TextFieldCustom from 'kit/TextFieldCustom';
import { useStore } from 'store/connect';

import { Eyeoff } from '@xieffect/base.icons.eyeoff';
import { Eyeon } from '@xieffect/base.icons.eyeon';

interface IStepTwoForm {
  control: Control<FieldValues, object> | undefined;
  errors: FieldErrors;
  prevStepHandler: () => void;
}

const StepOneForm = observer(({ control, errors, prevStepHandler }: IStepTwoForm) => {
  const rootStore = useStore();
  const { authorizationSt } = rootStore;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <Stack spacing="16px">
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
              helperText={errors.email?.message ? 'Некорректный email' : ''}
              {...field}
              sx={{
                backgroundColor: 'grayscale.0',
                borderRadius: '8px',
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
              helperText={errors.password?.message ? 'Используйте минимум 6 символов' : ''}
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
              sx={{
                backgroundColor: 'grayscale.0',
                borderRadius: '8px',
              }}
            />
          )}
        />
        <Typography
          color="error"
          sx={{
            fontSize: '14px',
            pt: '8px',
          }}
        >
          {authorizationSt.signup.error}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link
          underline="none"
          aria-label="Назад"
          sx={{ cursor: 'pointer' }}
          onClick={() => prevStepHandler()}
        >
          Назад
        </Link>
        <Button
          variant="contained"
          type="submit"
          sx={{
            height: '48px',
            width: '180px',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'none',
          }}
        >
          Регистрация
        </Button>
      </Stack>
    </>
  );
});

export default StepOneForm;
