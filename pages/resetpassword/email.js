import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import ResetPasswordForm from 'components/ResetPassword/Form';
import Image from 'next/image';

const PassResetEmail = inject('authorizationSt')(
  observer(() => {
    const router = useRouter();

    const isMobile = useMediaQuery('(max-width: 472px)');

    return (
      <>
        <Head>
          <title>xi.effect | восстановление пароля</title>
        </Head>
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
              Восстановление
            </Typography>
            <ResetPasswordForm />
          </Stack>
        </Stack>
      </>
    );
  }),
);

export default PassResetEmail;
