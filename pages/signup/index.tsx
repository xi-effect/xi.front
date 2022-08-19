/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import SignupForm from 'components/Signup/SignupForm';
import Image from 'next/image';

const Signup = inject()(
  observer(() => {
    const router = useRouter();

    const isMobile = useMediaQuery('(max-width: 472px)');

    return (
      <>
        <Head>
          <title>xi.effect | регистрация</title>
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
              Регистрация
            </Typography>
            <SignupForm />
          </Stack>
        </Stack>
      </>
    );
  }),
);

export default Signup;
