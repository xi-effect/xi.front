/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import TextFieldCustom from 'kit/TextFieldCustom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface IStepTwoForm {
  control: Control<FieldValues, object> | undefined;
  errors: FieldErrors;
  prevStepHandler: () => void;
}

const StepOneForm: React.FC<IStepTwoForm> = ({ control, errors, prevStepHandler }) => {
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
              helperText={errors.email?.message ? 'Введите корректный e-mail' : ''}
              {...field}
              sx={{
                backgroundColor: '#fff',
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
              helperText={errors.password?.message ? 'Длина пароля от 6 до 100 символов' : ''}
              {...field}
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{ mr: 0.5 }} position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="large"
                    >
                      {!showPassword ? (
                        <Visibility sx={{ color: 'gray.100' }} />
                      ) : (
                        <VisibilityOff sx={{ color: 'gray.100' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#fff',
              }}
            />
          )}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link
          underline="hover"
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
    </>
  );
};

export default StepOneForm;
