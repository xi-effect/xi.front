/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { useStore } from 'store/connect';

import { Slide, Button, useMediaQuery, Theme } from '@mui/material';
import { useSessionStorage, useBeforeUnload } from 'react-use';
import { useSnackbar } from 'notistack';
import Desktop from './Desktop';
import Mobile from './Mobile';

type NavigationT = {
  children: React.ReactNode;
};

const Navigation = observer(({ children }: NavigationT) => {
  const rootStore = useStore();
  const { uiSt, userSt } = rootStore;

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

  const checkSocket = () => {
    rootStore.socket?.on('connect', () => {
      console.info('SIO connect', rootStore.socket?.id);
    });
    rootStore.socket?.on('disconnect', () => {
      console.info('SIO disconnect', rootStore.socket?.id);
    });
    rootStore.socket?.on('error', () => {
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
  };

  useBeforeUnload(() => {
    rootStore.socket?.off();
    rootStore.socketTest?.off();
    rootStore.socket?.disconnect();
    rootStore.socketTest?.disconnect();

    return false;
  });

  React.useEffect(() => {
    if (!rootStore.socket?.connected) {
      rootStore.initSocket();
    }

    checkSocket();
  }, []);

  React.useEffect(() => {
    if (!rootStore.socketTest?.connected) {
      rootStore.initSocketTest();
    }

    checkSocket();
  }, [rootStore.socketTest?.connected]);

  React.useEffect(() => {
    if (userSt.user.id === null) {
      uiSt.setLoading('loading', true);
      userSt.getUser();
    }
  }, []);

  if (mobile) {
    return <Mobile>{children}</Mobile>;
  }

  if (!mobile) {
    return <Desktop>{children}</Desktop>;
  }

  return <Desktop>{children}</Desktop>;
});

export default Navigation;
