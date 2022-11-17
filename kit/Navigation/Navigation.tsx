/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Slide, Button, useMediaQuery, Theme } from '@mui/material';
import { useSessionStorage, useBeforeUnload } from 'react-use';
import { useSnackbar } from 'notistack';
import ProfileSt from 'store/user/profileSt';
import UISt from 'store/ui/uiSt';
import RootStore from 'store/rootStore';
import Desktop from './Desktop';
import Mobile from './Mobile';

type NavigationT = {
  rootStore: RootStore;
  profileSt: ProfileSt;
  uiSt: UISt;
  children: React.ReactNode;
};

const Navigation = inject(
  'rootStore',
  'profileSt',
  'uiSt',
)(
  observer((props) => {
    const { rootStore, profileSt, uiSt, children }: NavigationT = props;

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
      if (profileSt.settings.id === null) {
        uiSt.setLoading('loading', true);
        profileSt.getMainSettings(null);
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
