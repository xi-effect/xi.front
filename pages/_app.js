/* eslint-disable import/no-relative-packages */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider, observer } from 'mobx-react';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import 'moment/locale/ru';

import { SnackbarProvider } from 'notistack';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';

import Loading from 'kit/Loading/Loading';
import createEmotionCache from '../store/createEmotionCache';
import { useStore } from '../store/rootStore';
import { getDesignTokens } from '../theme';

config.autoAddCss = false;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
// Binding events.

const MyApp = observer((props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const rootStore = useStore(pageProps.initialState);
  const theme = React.useMemo(
    () => createTheme(getDesignTokens('light' || rootStore.userSt.settings.darkTheme)), // Только светлая тема
    [rootStore.userSt.settings.darkTheme],
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=0.9, maximum-scale=0.9"
        />
      </Head>
      {/* MobX Provider */}
      <Provider
        rootStore={rootStore}
        uiSt={rootStore.uiSt}
        userSt={rootStore.userSt}
        homeSt={rootStore.homeSt}
        authorizationSt={rootStore.authorizationSt}
        // Community Stores
        communitySt={rootStore.communitySt}
        communityCreationSt={rootStore.communityCreationSt}
        communityChannelsSt={rootStore.communityChannelsSt}
        communitySettingsSt={rootStore.communitiesInvitesSt}
        // Communities Stores
        communitiesMenuSt={rootStore.communitiesMenuSt}
        communitiesInvitesSt={rootStore.communitiesInvitesSt}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loading />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            maxSnack={3}
            preventDuplicate
            dense
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
});

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
