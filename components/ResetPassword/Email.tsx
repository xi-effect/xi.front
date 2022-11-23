import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { Button, Stack, Link, Typography } from '@mui/material';
import { useStore } from 'store/connect';

const schema = yup
  .object({
    email: yup.string().email().max(100).required(),
  })
  .required();

type SignupFormValues = {
  email: string;
};

const Email = observer(() => {
  const rootStore = useStore();
  const { authorizationSt } = rootStore;
  const { passwordReset } = authorizationSt;
  const router: NextRouter = useRouter();

  const [email, setEmail] = React.useState('');

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<SignupFormValues> = (data) => {
    trigger();
    setEmail(data.email);
    authorizationSt.clickPasswordResetButton(data);
  };

  return (
    <Stack
      height="100%"
      direction="column"
      justifyContent="space-between"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems={passwordReset.emailResetOk ? 'flex-start' : 'center'}
        spacing={2}
      >
        {!passwordReset.emailResetOk && (
          <>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextFieldCustom
                  variant="outlined"
                  error={!!errors.email?.message}
                  fullWidth
                  placeholder="Электронная почта"
                  type="email"
                  helperText={passwordReset.emailNotFound ? 'Не удалось найти аккаунт' : ''}
                  {...field}
                />
              )}
            />
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '16px',
                color: 'grayscale.40',
                width: '100%',
                textAlign: !passwordReset.emailResetOk ? 'left' : 'center',
              }}
            >
              Введите адрес, привязанный к аккаунту
            </Typography>
          </>
        )}
        {passwordReset.emailResetOk && email && (
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: 'grayscale.100',
            }}
          >
            {`Ссылка на восстановление пароля отправлена на ${email}`}
          </Typography>
        )}
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
          onClick={() =>
            passwordReset.emailResetOk
              ? authorizationSt.setPasswordReset('emailResetOk', false)
              : router.push('/')
          }
        >
          {passwordReset.emailResetOk ? 'Отправить еще раз' : ' Войти'}
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
          {passwordReset.emailResetOk ? 'Войти' : 'Отправить'}
        </Button>
      </Stack>
    </Stack>
  );
});

export default Email;
