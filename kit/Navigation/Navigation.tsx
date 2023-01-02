/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';

import { Slide, Button, useMediaQuery, Theme } from '@mui/material';
import { useSessionStorage, useBeforeUnload } from 'react-use';
import { useSnackbar } from 'notistack';
import { useStore } from 'store/connect';
import Desktop from './Desktop';
import Mobile from './Mobile';

type NavigationT = {
  children: React.ReactNode;
};

const Navigation = observer((props) => {
  const { children }: NavigationT = props;

  const rootStore = useStore();
  const { uiSt, userSt, profileSt } = rootStore;

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
    rootStore.socket?.disconnect();

    return false;
  });

  React.useEffect(() => {
    if (!rootStore.socket?.connected) {
      rootStore.initSocket();
    }

    checkSocket();
  }, []);

  React.useEffect(() => {
    if (profileSt?.profile.email === '') {
      uiSt.setLoading('loading', true);
      userSt?.getUser();
      profileSt?.getProfile();
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

