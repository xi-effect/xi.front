/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Link, Stack } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import TextFieldCustom from 'kit/TextFieldCustom';

interface IStepOneForm {
  control: Control<FieldValues, object> | undefined;
  errors: FieldErrors;
  nextStepHandler: () => void;
}

const StepOneForm: React.FC<IStepOneForm> = ({ control, errors, nextStepHandler }) => {
  const router = useRouter();

  return (
    <>
      <Stack spacing="16px">
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors.username?.message}
              type="text"
              fullWidth
              placeholder="Имя пользователя"
              helperText={errors.username?.message ? 'Обязательное поле' : ''}
              {...field}
              sx={{
                backgroundColor: '#fff',
              }}
            />
          )}
        />
        <Controller
          name="code"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors.code?.message}
              type="text"
              fullWidth
              placeholder="Код-приглашение"
              helperText={errors.code?.message ? 'Обязательное поле' : ''}
              {...field}
              sx={{
                backgroundColor: '#fff',
              }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          underline="hover"
          sx={{
            cursor: 'pointer',
            color: 'primary.dark',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
          }}
          onClick={() => router.push('/signin')}
        >
          Ко входу
        </Link>
        <Button
          onClick={nextStepHandler}
          variant="contained"
          sx={{
            width: '120px',
            height: '48px',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'none',
          }}
        >
          Далее
        </Button>
      </Box>
    </>
  );
};

export default StepOneForm;
