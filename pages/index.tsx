import React from 'react';
import Head from 'next/head';
import {
  Divider,
  Button,
  Box,
  Slide,
  Stack,
  Typography,
  Theme,
  useMediaQuery,
} from '@mui/material';

import { inject, observer } from 'mobx-react';
import { motion } from 'framer-motion';
import { useRouter, NextRouter } from 'next/router';
import CustomCookieShackbar from 'components/Landing/CustomCookieShackbar';

import { useSnackbar } from 'notistack';

import { useLocalStorage } from 'react-use';
import Image from 'next/image';
import Header from 'components/Landing/Header';
import { MouseParallax } from 'react-just-parallax';
import {
  t1MarginTop,
  t1MaxWidth,
  tFontSize,
  tLineHeight,
  image1Top,
  image1Left,
  imageSize,
  image2Right,
  buttonLineHeight,
  buttonFontSize,
  buttonHeight,
  buttonMarginTop,
  buttonWidth,
  image2Bottom,
  t2FontSize,
  t2LineHeight,
} from 'components/Landing/consts';

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

    const mobile1920: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1920));
    const mobile1336: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1336));
    const mobile1000: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1000));
    const mobilesm: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const getDeviceWidth = () => {
      if (mobilesm) return 'min480';
      if (mobile1000) return 'min1000';
      if (mobile1336) return 'min1336';
      if (mobile1920) return 'min1920';
      return 'max1920';
    };

    const deviceWidth = getDeviceWidth();
    const router: NextRouter = useRouter();

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
            minHeight: mobilesm ? 'calc(100vh - 14px)' : '100vh',
            height: '100%',
            bgcolor: 'primary.pale',
            position: 'relative',
            p: mobile1336 ? '20px 16px 20px 16px' : '16px 84px 64px 84px',
          }}
        >
          <Header />
          <Box
            sx={{
              position: 'relative',
              mt: t1MarginTop[deviceWidth],
              width: '100%',
              maxWidth: t1MaxWidth[deviceWidth],
            }}
          >
            <Typography
              component="h1"
              textAlign="center"
              sx={{
                fontWeight: 500,
                fontSize: tFontSize[deviceWidth],
                lineHeight: tLineHeight[deviceWidth],
                zIndex: 1000,
                cursor: 'default',
              }}
            >
              Платформа
              <br />
              для&#160;обучения
            </Typography>
            <MouseParallax zIndex={-1} isAbsolutelyPositioned shouldResetPosition strength={0.1}>
              <Box
                sx={{
                  position: 'absolute',
                  top: image1Top[deviceWidth],
                  left: image1Left[deviceWidth],
                  height: imageSize[deviceWidth],
                  width: imageSize[deviceWidth],
                  zIndex: -1,
                }}
              >
                <Image
                  style={{ zIndex: -1 }}
                  src="/assets/landing/star.svg"
                  width={imageSize[deviceWidth]}
                  height={imageSize[deviceWidth]}
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: image2Bottom[deviceWidth],
                  right: image2Right[deviceWidth],
                  height: imageSize[deviceWidth],
                  width: imageSize[deviceWidth],
                  zIndex: -1,
                }}
              >
                <Image
                  style={{ zIndex: -1 }}
                  src="/assets/landing/triangle.svg"
                  width={imageSize[deviceWidth]}
                  height={imageSize[deviceWidth]}
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
              fontSize: t2FontSize[deviceWidth],
              lineHeight: t2LineHeight[deviceWidth],
              cursor: 'default',
            }}
          >
            Для школ, курсов, {mobilesm && <br />} дополнительного образования
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/signin')}
            sx={{
              mt: buttonMarginTop[deviceWidth],
              maxWidth: buttonWidth[deviceWidth],
              width: '100%',
              height: buttonHeight[deviceWidth],
              fontWeight: 500,
              fontSize: buttonFontSize[deviceWidth],
              lineHeight: buttonLineHeight[deviceWidth],
              borderRadius: mobilesm ? '8px' : '12px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            Войти
          </Button>
        </Stack>
        {mobilesm && (
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              width: '100%',
              height: '14px',
            }}
          >
            <Divider
              sx={{
                width: '134px',
                height: '5px',
                backgroundColor: 'gray.100',
                borderRadius: '100px',
              }}
            />
          </Stack>
        )}
      </>
    );
  }),
);

export default Main;
