/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */

/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import { Stack, Typography, Box } from '@mui/material';

import React from 'react';
import { inject, observer } from 'mobx-react';

import { useSessionStorage } from 'react-use';

// import Header from 'components/Signin/Header';
// import Form from 'components/Signin/Form';
import Form from 'components/Signin/newForm';
import XiLogo from "../../kit/XiLogoNew";

const Signin = inject(
  'uiSt',
  'userSt',
)(
  observer((props) => {
    const { uiSt, userSt } = props;

    const [prevPathname, setPrevPathname] = useSessionStorage('prevPathname');

    React.useEffect(() => {
      if (prevPathname !== '/home') {
        uiSt.setLoading('loading', true);
        userSt.getMainSettings('login');
      }
    }, []);

    return (
      <>
        <Head>
          <title>Ξffect | Вход</title>
        </Head>
        <Stack
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            bgcolor: "#FFFFFF",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '420px',
              height: '514px',
              borderRadius: '20px',
              bgcolor: "#FFFFFF",
              border: '1px solid #E6E6E6'
            }}
          >
            <Stack
              display="flex"
              direction="column"
              alignItems="center"
              sx={{
                mt: '30px'
              }}
            >
              <XiLogo/>
              <Typography
                component="h1"
                variant="h5"
                marginTop="14px"
                sx={{
                  color: '#000000',
                  fontWeight:600,
                  fontSize: '24px',
                  lineHeight: '32px'
                }}
              >
                Вход в аккаунт
              </Typography>
            </Stack>
            <Stack>
              <Typography
                component="div"
                sx={{
                  width: '356px',
                  height: '345px',
                  mb: '32px'
                }}
              >
                <Form />
              </Typography>
            </Stack>

          </Box>
        </Stack>
      </>
    );
  }),
);

export default Signin;

// backgroundColor: 'background.main',

