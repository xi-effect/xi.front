/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Slide, Button, Box, useMediaQuery, Theme } from '@mui/material';
import { useSessionStorage, useBeforeUnload } from 'react-use';
import dynamic from 'next/dynamic';
import { useSnackbar } from 'notistack';
import { SidebarSecond } from './SidebarSecond';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type NavigationT = {
  rootStore?: any;
  profileSt?: any;
  uiSt?: any;
  children: React.ReactNode;
};

const Navigation = inject(
  'rootStore',
  'profileSt',
  'uiSt',
)(
  observer((props: NavigationT) => {
    const { rootStore, profileSt, uiSt, children } = props;

    const router = useRouter();
    const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

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
        console.info('SIO connect', rootStore.socket.id);
      });
      rootStore.socket.on('disconnect', () => {
        console.info('SIO disconnect', rootStore.socket.id);
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

    React.useEffect(() => {
      if (!rootStore.socketTest?.connected) {
        rootStore.initSocketTest();
      }
      rootStore.socketTest.on('connectTest', () => {
        console.info('SIO connectTest', rootStore.socketTest.id);
      });
      rootStore.socketTest.on('disconnectTest', () => {
        console.info('SIO disconnectTest', rootStore.socketTest.id);
      });
      rootStore.socketTest.on('errorTest', (error) => {
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
    }, [rootStore.socketTest?.connected]);

    // @ts-ignore
    useBeforeUnload(() => {
      rootStore.socketTest.disconnect();
      rootStore.socketTest.off();
    });

    // @ts-ignore
    useBeforeUnload(() => {
      rootStore.socket.disconnect();
      rootStore.socket.off();
    });

    React.useEffect(() => {
      if (profileSt.settings.id === null) {
        uiSt.setLoading('loading', true);
        profileSt.getMainSettings();
      }
    }, []);

    React.useEffect(() => {
      if (profileSt.settings.code === null) {
        profileSt.getAllSettings();
      }
    }, []);

    if (mobile) {
      return <Mobile>{children}</Mobile>;
    }

    if (!mobile) {
      return <Desktop>{children}</Desktop>;
    }

    return <Desktop>{children}</Desktop>;
  }),
);

export default Navigation;
