/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import SignupForm from 'components/Signup/SignupForm';

const Signup = inject()(
  observer(() => (
    <>
      <Head>
        <title>Ξffect | Регистрация</title>
      </Head>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            border: '1px solid #E6E6E6',
            borderRadius: '16px',
            padding: '38px 32px 32px 32px',
            height: '514px',
            width: '420px',
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
              <Box
                sx={{
                  margin: '0 auto',
                  // TODO: remove 3 rows when logo is ready
                  width: '90px',
                  height: '13px',
                  fontSize: '11px',
                }}
              >
                logo placeholder
              </Box>
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
  )),
);

export default Signup;
