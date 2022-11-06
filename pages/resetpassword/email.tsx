import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { observer } from 'mobx-react';
import Form from 'components/ResetPassword/Email';
import Image from 'next/image';
import LayoutPages from 'kit/LayoutPages';
import { useStore } from 'store/connect';

const PassResetEmail = observer(() => {
  const rootStore = useStore();
  const { authorizationSt } = rootStore;
  const { passwordReset } = authorizationSt;
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width: 472px)');

  return (
    <LayoutPages title="восстановление пароля">
      <Stack
        justifyContent={isMobile ? 'flex-start' : 'center'}
        alignItems="center"
        width="100%"
        minHeight="100vh"
      >
        <Stack
          direction="column"
          border={isMobile ? 'none' : '1px solid #E6E6E6'}
          borderRadius="16px"
          padding={`${isMobile ? '65px' : '38px'} 32px 32px 32px`}
          height="514px"
          width={isMobile ? '100%' : '420px'}
          spacing={2}
        >
          <Image onClick={() => router.push('/')} src="/logo.svg" height={24} width={100} />
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{
              pb: '16px',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {passwordReset.emailResetOk ? 'Письмо отправлено' : 'Восстановление'}
          </Typography>
          <Form />
        </Stack>
      </Stack>
    </LayoutPages>
  );
});

export default PassResetEmail;
