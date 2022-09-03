import React from 'react';
import Head from 'next/head';
import { Button, Box, Slide, Stack, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react';
import { motion } from 'framer-motion';

import CustomCookieShackbar from 'components/Landing/CustomCookieShackbar';

import { useSnackbar } from 'notistack';

import { useLocalStorage } from 'react-use';
import Image from 'next/image';
import Header from 'components/Landing/Header';
import { MouseParallax } from 'react-just-parallax';

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
            p: '16px 84px 64px 84px',
          }}
        >
          <Header />
          <Box
            sx={{
              position: 'relative',
              mt: '94px',
              width: '100%',
              maxWidth: '1430px',
            }}
          >
            <Typography
              component="h1"
              textAlign="center"
              sx={{
                fontWeight: 500,
                fontSize: '164px',
                lineHeight: '170px',
                zIndex: 1000,
              }}
            >
              Платформа для&#160;обучения
            </Typography>
            <MouseParallax zIndex={-1} isAbsolutelyPositioned>
              <Box
                sx={{
                  position: 'absolute',
                  top: '-66px',
                  left: '115px',
                  height: 210,
                  width: 210,
                  zIndex: -1,
                }}
              >
                <Image
                  style={{ zIndex: -1 }}
                  src="/assets/landing/star.svg"
                  width={210}
                  height={210}
                />
              </Box>
              {/* </MouseParallax>
            <MouseParallax> */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-84px',
                  right: '55px',
                  height: 210,
                  width: 210,
                  zIndex: -1,
                }}
              >
                <Image
                  style={{ zIndex: -1 }}
                  src="/assets/landing/triangle.svg"
                  width={210}
                  height={210}
                />
              </Box>
            </MouseParallax>
          </Box>
          <Typography
            component="h2"
            textAlign="center"
            sx={{
              mt: 4,
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '42px',
              zIndex: 1000,
            }}
          >
            Для школ, курсов, дополнительного образования
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: '120px',
              width: '400px',
              height: '80px',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '32px',
              zIndex: 1000,
            }}
          >
            Войти
          </Button>
        </Stack>
      </>
    );
  }),
);

export default Main;
