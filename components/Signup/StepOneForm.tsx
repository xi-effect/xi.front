import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Button, Link, Stack } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import TextFieldCustom from 'kit/TextFieldCustom';

interface IStepOneForm {
  control: Control<FieldValues, object> | undefined;
  errors: FieldErrors;
  nextStepHandler: () => void;
  authorizationSt?: any;
}

const StepOneForm: React.FC<IStepOneForm> = inject('authorizationSt')(
  observer(({ authorizationSt, control, errors, nextStepHandler }) => {
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
                {...field}
                sx={{
                  backgroundColor: 'grayscale.0',
                  borderRadius: '8px',
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
                error={!!errors.code?.message || !!authorizationSt.signup.error}
                type="text"
                fullWidth
                placeholder="Код-приглашение"
                helperText={authorizationSt.signup.error}
                {...field}
                sx={{
                  backgroundColor: 'grayscale.0',
                  borderRadius: '8px',
                }}
              />
            )}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link
            underline="none"
            aria-label="Войти"
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={() => router.push('/')}
          >
            Войти
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
        </Stack>
      </>
    );
  }),
);

export default StepOneForm;
