import React from 'react';
import Head from 'next/head';
import { Slide, Stack, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react';
import { motion } from 'framer-motion';

import CustomCookieShackbar from 'components/Landing/CustomCookieShackbar';

import { useSnackbar } from 'notistack';

import { useLocalStorage } from 'react-use';

import Header from 'components/Landing/Header';
import NavBar from 'components/Landing/NavBar';
import Buttons from 'components/Landing/Buttons';


const Main = inject(
  'rootStore',
  'uiSt',
)(
  observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    const [valueLS] = useLocalStorage('cookies-agree');

    React.useEffect(() => {
      if (!valueLS) {
        setTimeout(() => {
          enqueueSnackbar('', {
            content: <CustomCookieShackbar />,
            autoHideDuration: 20000,
            persist: true,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            TransitionComponent: Slide,
          });
        }, 2000);
      }
    }, []);

    return (
      <>
        <Head>
          <title>xi.effect</title>
          <meta name="description" content="Всё, что нужно для вашего образования" />
        </Head>
        <Stack
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            zIndex: 1,
            margin: 0,
            overflow: 'auto',
            height: '100vh',
            bgcolor: 'primary.pale',
            position: 'relative',
            p: '112px 100px 64px 100px',
          }}
        >
          <Header />
          <Stack
            sx={{ mt: 8, height: '100%', width: '100%' }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Stack
              sx={{
                position: 'relative',
                height: '100%',
                width: '50%',
              }}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '98px',
                  lineHeight: '110px',
                  maxWidth: 848,
                  height: '220px',
                }}
              >
                Платформа для&#160;обучения
              </Typography>
              <Buttons />
              <Stack
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  height: '32px',
                  width: '100%',
                }}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
              >
                <NavBar />
              </Stack>
            </Stack>
            <Stack
              sx={{
                position: 'relative',
                height: '100%',
                width: '50%',
              }}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '42px',
                  width: '558px',
                  mt: '120px',
                }}
              >
                Для&#160;школ,&#160;курсов, дополнительного&#160;образования
              </Typography>
              <Stack
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  width: '100%',
                }}
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '24px',
                  }}
                >
                  Бета-тестирование
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '32px',
                    lineHeight: '32px',
                  }}
                >
                  5 ноября 2022
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }),
);

export default Main;
