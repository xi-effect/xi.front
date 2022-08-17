/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
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
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: `${isMobile ? 'flex-start' : 'center'}`,
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              border: `${isMobile ? 'none' : '1px solid #E6E6E6'}`,
              borderRadius: '16px',
              padding: '0px 32px 32px 32px',
              paddingTop: `${isMobile ? '65px' : '38px'}`,
              height: '514px',
              width: `${isMobile ? '100%' : '420px'}`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box>
                <Link onClick={() => router.push('/')} sx={{ cursor: 'pointer' }}>
                  <Box
                    sx={{
                      margin: '0 auto',
                      // TODO: remove 3 rows and add logo when is ready
                      width: '90px',
                      height: '13px',
                      fontSize: '11px',
                    }}
                  >
                    logo placeholder
                  </Box>
                </Link>
                <Typography
                  component="h1"
                  variant="h5"
                  marginTop="21px"
                  sx={{
                    textAlign: 'center',
                    fontSize: '24px',
                    lineHeight: '32px',
                    fontWeight: '600',
                  }}
                >
                  Регистрация
                </Typography>
              </Box>
              <SignupForm />
            </Box>
          </Box>
        </Box>
      </>
    );
  }),
);

export default Signup;
