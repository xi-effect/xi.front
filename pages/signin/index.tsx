import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { useSessionStorage } from 'react-use';
import Form from 'components/Signin/Form';
import XiLogo from 'kit/XiLogo';
import { Stack, Typography, Link, Divider, useMediaQuery } from '@mui/material';

const Tearms = () => (
  <>
    <Typography
      variant="caption"
      paddingTop="12px"
      paddingBottom="5px"
      sx={{
        color: 'gray.40',
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
        color: 'primary.main',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: 0,
      }}
      onClick={() => Router.replace('/signin')}
    >
      пользовательского соглашения
    </Link>
  </>
);

const Signin = inject(
  'uiSt',
  'userSt',
  'authorizationSt',
)(
  observer((props) => {
    const { uiSt, userSt, authorizationSt } = props;

    const [prevPathname] = useSessionStorage('prevPathname');

    const isMobile: boolean = useMediaQuery('(max-width: 472px)');

    useEffect(() => {
      if (prevPathname !== '/home') {
        uiSt.setLoading('loading', true);
        userSt.getMainSettings('login');
      }
    }, []);

    return (
      <>
        <Head>
          <title>xi.effect | вход</title>
        </Head>
        {!!authorizationSt.signin.error && (
          <Typography
            position="absolute"
            variant="body1"
            sx={{
              width: '311px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'error.pale',
              pt: '5px',
              m: 'auto',
              top: isMobile ? '4px' : '32px',
              left: 0,
              right: 0,
              color: 'error.dark',
              textAlign: 'center',
            }}
          >
            {authorizationSt.signin.error}
          </Typography>
        )}
        <Stack
          justifyContent={isMobile ? 'flex-start' : 'center'}
          alignItems="center"
          sx={{
            width: '100%',
            minHeight: '100vh',
            pt: isMobile ? '4px' : 0, // but need '96px' for Server Error
          }}
        >
          <Stack
            direction="column"
            padding={isMobile ? '0 20px 0 20px' : '32px'}
            sx={{
              width: isMobile ? '100%' : '420px',
              height: isMobile ? '395px' : '514px',
              borderRadius: '16px',
              border: isMobile ? 'none' : '1px solid #E6E6E6', // gray.10
            }}
            spacing={2}
            position="relative"
          >
            <Stack alignItems="center">
              <XiLogo width="142px" height="24px" />
            </Stack>
            <Typography
              variant="h5"
              sx={{
                pb: '16px',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              Вход в аккаунт
            </Typography>
            <Form {...props} />
            {!isMobile && (
              <Stack
                direction="column"
                alignItems="center"
                sx={{
                  position: 'absolute',
                  bottom: '-48px',
                  left: '0px',
                  width: '100%',
                }}
              >
                <Tearms />
              </Stack>
            )}
          </Stack>
          {isMobile && (
            <Stack
              direction="column"
              alignItems="center"
              sx={{
                position: 'absolute',
                bottom: '66px',
                p: '20px',
              }}
            >
              <Tearms />
            </Stack>
          )}
          {isMobile && (
            <Divider
              sx={{
                position: 'absolute',
                bottom: '8px',
                width: '134px',
                height: '5px',
                backgroundColor: 'gray.100',
                borderRadius: '100px',
              }}
            />
          )}
        </Stack>
      </>
    );
  }),
);

export default Signin;
