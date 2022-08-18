/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Box, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import SignupForm from 'components/Signup/SignupForm';

const Signup = inject()(
  observer(() => {
    const router = useRouter();

    const isMobile = useMediaQuery('(max-width: 472px)');

    return (
      <>
        <Head>
          <title>xi.effect | Регистрация</title>
        </Head>
        <Stack
          justifyContent={isMobile ? 'flex-start' : 'center'}
          alignItems="center"
          width="100%"
          minHeight="100vh"
        >
          <Box
            border={isMobile ? 'none' : '1px solid #E6E6E6'}
            borderRadius="16px"
            padding={`${isMobile ? '65px' : '38px'} 32px 32px 32px`}
            height="514px"
            width={isMobile ? '100%' : '420px'}
          >
            <Stack height="100%" spacing="32px">
              <Box>
                <Link onClick={() => router.push('/')} sx={{ cursor: 'pointer' }}>
                  <Box margin="0 auto" width="90px" height="13px" fontSize="11px">
                    logo placeholder
                  </Box>
                </Link>
                <Typography
                  component="h1"
                  variant="h5"
                  marginTop="21px"
                  textAlign="center"
                  fontWeight="600"
                >
                  Регистрация
                </Typography>
              </Box>
              <SignupForm />
            </Stack>
          </Box>
        </Stack>
      </>
    );
  }),
);

export default Signup;
