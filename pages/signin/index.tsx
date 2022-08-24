import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { useSessionStorage } from 'react-use';
import Form from 'components/Signin/Form';
import XiLogo from 'kit/XiLogoNew';

import {
  Stack,
  Typography,
  Box,
  Link,
  Divider,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from '@mui/material';

const Signin = inject(
  'uiSt',
  'userSt',
)(
  observer((props) => {
    const {uiSt, userSt} = props;
    const router: NextRouter = useRouter();

    const [prevPathname] = useSessionStorage('prevPathname');

    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));

    useEffect(() => {
      if (prevPathname !== '/home') {
        uiSt.setLoading('loading', true);
        userSt.getMainSettings('login');
      }
    }, []);

    const [errors, setErrors] = useState({
      isError: false,
      message: ''
    });

    const handleShowErrorInfo = (errorsHandle) => {
      setErrors(() => ({
        isError: errorsHandle.isServerError,
        message: errorsHandle.message
      }));
    };

    const theme = createTheme({
      typography: {
        h5: {
          fontFamily: 'Golos',
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '32px',
          letterSpacing: 0
        },
        subtitle1: {
          fontFamily: 'Golos',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '20px',
          letterSpacing: 0
        },
        body1: {
          fontFamily: 'Golos',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '20px',
          letterSpacing: 0
        },
        body2: {
          fontFamily: 'Golos',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '18px',
          letterSpacing: 0
        },
        caption: {
          fontFamily: 'Golos',
          fontWeight: 400,
          fontSize: 12,
          lineHeight: '16px',
          letterSpacing: 0
        },
      }
    });

    return (
      <>
        <Head>
          <title>xi.effect | Вход</title>
        </Head>
        <ThemeProvider theme={theme}>
          {errors.isError
            && <Typography
              position="absolute"
              variant="body1"
              sx={{
                width: '311px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FEEAEA', // error.pale
                pt: '5px',
                m: 'auto',
                top: mobile ? '4px' : '32px',
                left: 0,
                right: 0,
                color: 'error.dark',
                textAlign: 'center'
              }}
            >
              {errors.message}
            </Typography>
          }
          <Stack
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: '100%',
              height: '100%',
              minHeight: mobile ? 0 : '100vh',
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                width: mobile ? '375px' : '420px',
                height: mobile ? '373px' : '492px',
                borderRadius: mobile ? 'none' : '20px',
                border: mobile ? 'none' : '1px solid #E6E6E6', // gray.10
                mt: mobile ? '4px': `${errors.isError ? 96 : 0}px`
              }}
            >
              <Stack
                display="flex"
                direction="column"
                alignItems="center"
                sx={{
                  mt: mobile ? 0 : '36px'
                }}
              >
                {mobile && !errors.isError && <XiLogo/> || !mobile && <XiLogo/>}
                <Typography
                  variant="h5"
                  sx={{
                    pt: mobile && errors.isError ? '47px' : '16px',
                  }}
                >
                  Вход в аккаунт
                </Typography>
              </Stack>
              <Stack>
                <Form {...props} handleShowErrorInfo={handleShowErrorInfo}/>
              </Stack>
            </Box>
            <Stack
              display="flex"
              direction="column"
              alignItems="center"
              sx={{
                position: mobile ? 'absolute' : 'inherit',
                width: '420px',
                height: mobile ? '85px' : '32px',
                mt: mobile ? 0 : '12px',
                bottom: '8px'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#999999' // gray.40
                }}
              >
                Нажимая «Войти», вы принимаете условия
              </Typography>
              <Link
                underline="hover"
                href="/"
                sx={{
                  cursor: 'pointer',
                  mt: '-4px'
                }}
                onClick={() => router.push({pathname: ''})}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#697BFF', // primary.main
                  }}
                >
                  пользовательского соглашения </Typography>
              </Link>
              {mobile && <Divider
                sx={{
                  mt: '53px',
                  width: '134px',
                  height: '5px',
                  backgroundColor: '#000000', // gray.100
                  borderRadius: '100px',
                }}
              />}

            </Stack>
          </Stack>
        </ThemeProvider>
      </>
    );
  }),
);

export default Signin;
