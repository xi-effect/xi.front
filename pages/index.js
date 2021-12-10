import React from "react";

import Head from "next/head";
import Image from "next/image";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Container,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import { motion } from "framer-motion"

import Loading from "./../components/OtherComponents/Loading/Loading";
import CardsList from "./../components/PagesComponents/Landing/CardList";
import Header from "./../components/PagesComponents/Landing/Header";
import MainLabel from "./../components/PagesComponents/Landing/MainLabel";


const Main = inject(
  "rootStore",
  "uiStore"
)(
  observer(({ rootStore, uiStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));

    React.useEffect(() => {
      if (uiStore.load.landing) uiStore.setLoading("loading", true)
      setTimeout(() => {
        uiStore.setLoading("loading", false)
        uiStore.setLoading("landing", false)
      }, 1500);
    }, [])

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        {/* <Background /> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            width: "100vw",
            minHeight: "100vh",
            bgcolor: '#F8FAFF'
          }}
        >
          <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              maxWidth: 1920,
              pl: 2,
              pr: 2,
              width: '100%',
              // minHeight: "100vh",
            }}
          >
            <Header />
            <MainLabel />
          </Stack>
        </Stack>
      </>
    );
  })
);

export default Main;
