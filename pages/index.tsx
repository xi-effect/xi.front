import React, { useEffect } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { useSessionStorage } from 'react-use';
import Form from 'components/Signin/Form';
import XiLogo from 'kit/XiLogo';
import { Stack, Typography, Link, Divider, useMediaQuery } from '@mui/material';
import LayoutPages from 'kit/LayoutPages';
import UiSt from 'store/ui/uiSt';
import profileSt from 'store/user/profileSt';
import AuthorizationSt from 'store/user/authorizationSt';

type SigninT = {
  uiSt: UiSt;
  profileSt: profileSt;
  authorizationSt: AuthorizationSt;
};

const Tearms = () => (
  <>
    <Typography
      variant="caption"
      paddingTop="12px"
      paddingBottom="5px"
      sx={{
        color: 'grayscale.40',
      }}
    >
      Нажимая «Войти», вы принимаете условия
    </Typography>
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
      onClick={() => Router.replace('/')}
    >
      пользовательского соглашения
    </Link>
  </>
);

const Signin = inject(
  'uiSt',
  'profileSt',
  'authorizationSt',
)(
  observer((props: SigninT) => {
    const { uiSt, profileSt, authorizationSt }: SigninT = props;

    const [prevPathname] = useSessionStorage('prevPathname');

    const isMobile: boolean = useMediaQuery('(max-width: 472px)');

    useEffect(() => {
      if (prevPathname !== '/home' && prevPathname !== '/signup') {
        uiSt.setLoading('loading', true);
        profileSt.getMainSettings('login');
      }
    }, []);

    return (
      <LayoutPages title="вход">
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
            minHeight: isMobile ? 'calc(100vh - 96px)' : '100vh',
            height: '100%',
          }}
        >
          <Stack
            direction="column"
            padding={isMobile ? '16px 20px 0 20px' : '32px'}
            spacing={2}
            sx={{
              width: isMobile ? '100%' : '420px',
              height: isMobile ? '395px' : '514px',
              borderRadius: '16px',
              border: isMobile ? 'none' : '1px solid #E6E6E6', // grayscale.10
              position: 'relative',
            }}
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
        </Stack>
        {isMobile && (
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              width: '100%',
              height: '96px',
            }}
          >
            <Tearms />
            <Divider
              sx={{
                mt: 4,
                width: '134px',
                height: '5px',
                backgroundColor: 'grayscale.100',
                borderRadius: '100px',
              }}
            />
          </Stack>
        )}
      </LayoutPages>
    );
  }),
);

export default Signin;
