/* eslint-disable react/forbid-prop-types */
// import "../styles/globals.css"
import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import Router from "next/router"
import { Provider, observer } from "mobx-react"

import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import "moment/locale/ru";

import { SnackbarProvider } from "notistack";

import "../styles/globals.css"
import 'draft-js/dist/Draft.css';

import NProgress from "nprogress"; // nprogress module
import createEmotionCache from "../store/createEmotionCache";
import { useStore } from "../store/rootStore"
import { getDesignTokens } from "../theme"
import "nprogress/nprogress.css"; // styles of nprogress
import Loading from "../components/OtherComponents/Loading/Loading";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
// Binding events. 
NProgress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


const MyApp = (observer((props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const rootStore = useStore(pageProps.initialState)
  // console.log("darkMode", rootStore.settingsStore.settings.darkTheme)
  const theme = React.useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(rootStore.settingsStore.settings.darkTheme))), [rootStore.settingsStore.settings.darkTheme])
  // console.log("theme", theme)
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=0.9" />
      </Head>
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
            <CssBaseline />
            <Loading />
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              maxSnack={3}
              preventDuplicate
              dense
            >
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </CacheProvider>
  );
}))

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};