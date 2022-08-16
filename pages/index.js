import React from 'react';
import Head from 'next/head';
import { Slide, Stack, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react';
import { motion } from 'framer-motion';

import CustomCookieShackbar from 'components/Landing/CustomCookieShackbar';

import { useSnackbar } from 'notistack';

import { useLocalStorage } from 'react-use';

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
          <title>Ξffect</title>
          <meta name="description" content="Всё, что нужно для вашего образования" />
        </Head>
        <Stack
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            zIndex: 1,
            margin: 0,
            overflow: 'auto',
            height: '100vh',
            bgcolor: 'background.main',
            position: 'relative',
          }}
        >
          <Typography variant='h4'>
            Мы переделываем Дизайн
          </Typography>
          <Typography variant='h5'>
            Опять...
          </Typography>
        </Stack>
      </>
    );
  }),
);

export default Main;
