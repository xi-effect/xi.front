/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Link, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import SignupForm from 'components/Signup/Form';
import Image from 'next/image';

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
      Нажимая «Регистрация», вы принимаете условия
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
      onClick={() => Router.replace('/signup')}
    >
      пользовательского соглашения
    </Link>
  </>
);

const Signup = inject()(
  observer(() => {
    const router = useRouter();

    const isMobile = useMediaQuery('(max-width: 472px)');

    const [activeStep, setActiveStep] = useState<number>(0);

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
            position="relative"
          >
            <Stack
              alignItems="center"
              sx={{
                height: '24px',
                width: '100%',
              }}
            >
              <Image onClick={() => router.push('/')} src="/logo.svg" height={24} width={100} />
            </Stack>
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
            <SignupForm activeStep={activeStep} setActiveStep={setActiveStep} />
            {!isMobile && activeStep === 1 && (
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
          {isMobile && activeStep === 1 && (
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

export default Signup;
