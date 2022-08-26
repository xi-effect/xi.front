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
  Link,
  Divider,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from '@mui/material';

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

const Signin = inject(
  'uiSt',
  'userSt',
)(
  observer((props) => {
    const {uiSt, userSt} = props;
    const router: NextRouter = useRouter();

    const [prevPathname] = useSessionStorage('prevPathname');

    const isMobile: boolean = useMediaQuery('(max-width: 472px)');

    useEffect(() => {
      console.log(prevPathname);
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
    console.log(isMobile);
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
                top: isMobile ? '4px' : '32px',
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
            justifyContent={isMobile ? "flex-start" : "center"}
            alignItems="center"
            sx={{
              width: '100%',
              minHeight: '100vh',
              pt: isMobile ? '4px': 0 // but need '96px' for Server Error
            }}
          >
            <Stack
              direction="column"
              padding={isMobile ? "0 20px 0 20px" : "30px 31px 31px 32px"}
              sx={{
                width: isMobile ? '100%' : '420px',
                height: isMobile ? '395px' : '514px',
                borderRadius: '16px',
                border: isMobile ? 'none' : '1px solid #E6E6E6', // gray.10
              }}
            >
              <Stack
                alignItems="center"
              >
                {isMobile ? !errors.isError && <XiLogo/> : <XiLogo/>}
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  pt: isMobile ? `${errors.isError ?  35 : 9}px` : '9px',
                  pb: '33px',
                  ml: '-3px',
                  textAlign: 'center'
                }}
              >
                Вход в аккаунт
              </Typography>
              <Form {...props} handleShowErrorInfo={handleShowErrorInfo} />
            </Stack>
            <Stack
              position={isMobile ? "absolute" : "inherit"}
              bottom="4px"
              direction="column"
              alignItems="center"
              sx={{
              }}
            >
              <Typography
                variant="caption"
                paddingTop="12px"
                paddingBottom="5px"
                sx={{
                  color: '#999999' // gray.40
                }}
              >
                Нажимая «Войти», вы принимаете условия
              </Typography>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="none"
                sx={{
                  cursor: 'pointer',
                  mt: '-4px',
                  color: '#697BFF', // primary.main
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '16px',
                  letterSpacing: 0
                }}
                onClick={() => router.replace('/signup')}
              >
                пользовательского соглашения
              </Link>
              {isMobile
                && <Divider
                  sx={{
                    mt: '53px',
                    width: '134px',
                    height: '5px',
                    backgroundColor: '#000000', // gray.100
                    borderRadius: '100px',
                  }}
                />
              }
            </Stack>
          </Stack>
        </ThemeProvider>
      </>
    );
  }),
);

export default Signin;
