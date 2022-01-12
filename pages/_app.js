//import '../styles/globals.css'
import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import { useRouter } from 'next/router'
import { Provider } from 'mobx-react'
import { useStore } from '../store/rootStore'
import { inject, observer } from 'mobx-react'
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '../theme'
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../store/createEmotionCache';
import 'moment/locale/ru';

import { SnackbarProvider } from 'notistack';

import Router from 'next/router';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
import "../styles/globals.css"

import PlausibleProvider from 'next-plausible'

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Loading from '../components/OtherComponents/Loading/Loading';
//Binding events. 
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const MyApp = (observer((props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter()

  const rootStore = useStore(pageProps.initialState)
  // console.log("darkMode", rootStore.settingsStore.settings.darkTheme)
  const theme = React.useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(rootStore.settingsStore.settings.darkTheme))), [rootStore.settingsStore.settings.darkTheme])
  // console.log("theme", theme)
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* <title>
          Ξ Effect
        </title> */}
        <meta name="Keywords" content="Образованиие, Эффект, Кси Эффект, Xi Effect, Effect" />
        <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=0.9" />
        <meta name="yandex-verification" content="879d56b8525183be" />
        <meta name="google-site-verification" content="Z9F9qlZZKDIV30WIUVOkQOJa89Nbg9bOiqUaZz-XJiY" />
        <meta
          name="description"
          content="Всё, что нужно для вашего Образования."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
      </Head>
      {/* <Context.Provider value={{ files, selectFiles }}> */}
      <Provider
        store={rootStore}
        rootStore={rootStore}
        uiStore={rootStore.uiStore}
        homeStore={rootStore.homeStore}
        knowledgeStore={rootStore.knowledgeStore}
        managmentStore={rootStore.managmentStore}
        settingsStore={rootStore.settingsStore}
        contentStore={rootStore.contentStore}
        authorizationStore={rootStore.authorizationStore}
        profileStore={rootStore.profileStore}
        messageStore={rootStore.messageStore}
        communityStore={rootStore.communityStore}
      >
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {/* <SnackbarProvider
                autoHideDuration={800}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                maxSnack={3}> */}
            {/* <MenuLayout> */}
            <CssBaseline />
            <Loading />
            <PlausibleProvider
              domain={"xieffect.ru"}
              // selfHosted
            >
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
            </PlausibleProvider>
            {/* </MenuLayout> */}
            {/* </SnackbarProvider> */}
          </ThemeProvider>

        </StyledEngineProvider>
      </Provider>
      {/* </Context.Provider> */}
    </CacheProvider>
  );
}))

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};