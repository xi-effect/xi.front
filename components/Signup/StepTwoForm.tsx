import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Button, Box, InputAdornment, Link, Stack } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import TextFieldCustom from 'kit/TextFieldCustom';

import MyIcon from 'kit/MyIcon';

interface IStepTwoForm {
  control: Control<FieldValues, object> | undefined;
  errors: FieldErrors;
  prevStepHandler: () => void;
  authorizationSt?: any;
}

const StepOneForm: React.FC<IStepTwoForm> = inject('authorizationSt')(
  observer(({ authorizationSt, control, errors, prevStepHandler }) => {
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
                  backgroundColor: 'gray.0',
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
                        {!showPassword ? <MyIcon name="eyeoff" /> : <MyIcon name="eyeon" />}
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'gray.0',
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
  }),
);

export default StepOneForm;
