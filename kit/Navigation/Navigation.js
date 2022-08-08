/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Slide, Button, Box, useMediaQuery } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { useSessionStorage, useBeforeUnload } from 'react-use';
import dynamic from 'next/dynamic';
import { useSnackbar } from 'notistack';
import { SidebarSecond } from './SidebarSecond';

import { configSwipe, sidebarVariantsRight, dragVariants } from './consts';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

const Navigation = inject(
  'rootStore',
  'userSt',
  'uiSt',
)(
  observer(
    ({
      rootStore,
      userSt,
      uiSt,
      haveRightToolbar = false,
      haveRightMenu = false,
      haveRightMenuMore = false,
      children,
    }) => {
      const router = useRouter();
      const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));

      const [prevPathname, setPrevPathname] = useSessionStorage('prevPathname');

      React.useEffect(() => {
        setPrevPathname(router.pathname);
      }, [router.pathname]);

      const { enqueueSnackbar, closeSnackbar } = useSnackbar();

      const action = (key) => (
        <Button
          onClick={() => {
            closeSnackbar(key);
            router.reload();
          }}
        >
          Перезагрузить страницу
        </Button>
      );

      React.useEffect(() => {
        if (!rootStore.socket?.connected) {
          rootStore.initSocket();
        }
        rootStore.socket.on('connect', () => {
          console.log('SIO connect', rootStore.socket.id);
        });
        rootStore.socket.on('disconnect', () => {
          console.log('SIO disconnect', rootStore.socket.id);
        });
        rootStore.socket.on('error', (error) => {
          enqueueSnackbar('Ошибка соединения', {
            persist: true,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            TransitionComponent: Slide,
            action,
          });
        });
      }, []);

      useBeforeUnload(() => {
        rootStore.socket.disconnect();
        rootStore.socket.off();
      });

      React.useEffect(() => {
        if (userSt.settings.id === null) {
          uiSt.setLoading('loading', true);
          userSt.getMainSettings();
        }
      }, []);

      React.useEffect(() => {
        if (userSt.settings.code === null) {
          userSt.getAllSettings();
        }
      }, []);

      const [hoverLeftName, setHoverLeftName] = React.useState('');

      React.useEffect(() => {
        if (router.pathname.includes('/home')) setHoverLeftName('/home');
        if (router.pathname.includes('/community')) setHoverLeftName('/community');
        if (router.pathname.includes('/settings')) setHoverLeftName('/settings');
      }, [router.pathname]);

      const handlers = useSwipeable({
        onSwipedLeft: (swipeEvent) => {
          if (
            uiSt.navigation.swipe === 'right' &&
            !swipeEvent.event.target.closest('#scroll-container-stories')
          )
            uiSt.setNavigation('swipe', 'center');
        },
        onSwipedRight: (swipeEvent) => {
          if (
            uiSt.navigation.swipe === 'center' &&
            !swipeEvent.event.target.closest('#scroll-container-stories')
          )
            uiSt.setNavigation('swipe', 'right');
        },
        ...configSwipe,
      });

      if (!mobile) {
        return (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              zIndex: 0,
              backgroundColor: 'primary.pale',
              // height: '100vh',
              overflow: 'hidden',
              // width: '100%',
            }}
          >
            <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
            <SidebarSecond hoverLeftName={hoverLeftName} />
            <Box
              sx={{
                zIndex: 0,
                height: '100vh',
                overflow: 'hidden',
              }}
            >
              {!(router.pathname.includes('/message') && !router.pathname.includes('chat')) && (
                <Scrollbars
                  renderThumbHorizontal={(props) => (
                    <div
                      {...props}
                      style={{ backgroundColor: '#cccccc', borderRadius: 8, width: 4 }}
                    />
                  )}
                  renderThumbVertical={(props) => (
                    <div
                      {...props}
                      style={{ backgroundColor: '#cccccc', borderRadius: 8, width: 4 }}
                    />
                  )}
                  universal
                  style={{ width: '100%', height: '100%' }}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                >
                  {children}
                </Scrollbars>
              )}
              {router.pathname.includes('message') ||
                (router.pathname.includes('chat') && children)}
            </Box>
          </Stack>
        );
      }

      if (mobile) {
        return (
          <Box
            sx={{
              zIndex: 0,
              backgroundColor: 'background.main',
              overflow: 'hidden',
            }}
            {...handlers}
          >
            <AnimatePresence exitBeforeEnter initial={false}>
              {uiSt.navigation.swipe === 'right' && (
                <Box
                  component={motion.div}
                  variants={sidebarVariantsRight}
                  animate="visible"
                  transition={{
                    delay: 0,
                    duration: 0.5,
                  }}
                  exit={{ x: -200, opacity: 0 }}
                  sx={{ zIndex: 100 }}
                >
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0,
                      duration: 0.5,
                    }}
                  >
                    <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
                    <SidebarSecond hoverLeftName={hoverLeftName} />
                  </Box>
                </Box>
              )}
            </AnimatePresence>
            <Box
              sx={{
                zIndex: 0,
                backgroundColor: 'background.main',
                filter:
                  uiSt.navigation.swipe === 'right' || uiSt.navigation.swipe === 'left'
                    ? 'brightness(40%)'
                    : 'none',
                overflow: 'hidden',
                width: `100vw`,
                ml: 0,
                mr: 0,
              }}
              component={motion.div}
              variants={dragVariants}
              initial={{ x: uiSt.navigation.swipe === 'right' ? 200 : 0 }}
              animate={() => {
                if (uiSt.navigation.swipe === 'center') return 'center';
                if (uiSt.navigation.swipe === 'right') return 'right';
                if (uiSt.navigation.swipe === 'bottom') return 'bottom';
                return null;
              }}
              transition={{
                delay: 0,
                duration: 0.5,
              }}
            >
              {!router.pathname.includes('/message') && (
                <Scrollbars
                  renderThumbHorizontal={(props) => (
                    <div
                      {...props}
                      style={{ backgroundColor: '#cccccc', borderRadius: 8, width: 4 }}
                    />
                  )}
                  renderThumbVertical={(props) => (
                    <div
                      {...props}
                      style={{ backgroundColor: '#cccccc', borderRadius: 8, width: 4 }}
                    />
                  )}
                  universal
                  style={{
                    width: '100vw',
                    height: 'calc(100vh - 48px)',
                    overflowY: 'hidden !important',
                  }}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                >
                  {children}
                </Scrollbars>
              )}
            </Box>
          </Box>
        );
      }
    },
  ),
);

export default Navigation;
