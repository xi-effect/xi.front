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

import { Scrollbars } from 'react-custom-scrollbars-2';

import Loading from "./../components/OtherComponents/Loading/Loading";
import Header from "./../components/PagesComponents/Landing/Header";
import MainLabel from "./../components/PagesComponents/Landing/MainLabel";
import WhyLabel from "../components/PagesComponents/Landing/WhyLabel";
import EffectFor from "../components/PagesComponents/Landing/EffectFor";
import Footer from "../components/PagesComponents/Landing/Footer";


const Main = inject(
  "rootStore",
  "uiStore"
)(
  observer(({ rootStore, uiStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    // React.useEffect(() => {
    //   if (uiStore.load.landing) uiStore.setLoading("loading", true)
    //   setTimeout(() => {
    //     uiStore.setLoading("loading", false)
    //     uiStore.setLoading("landing", false)
    //   }, 1500);
    // }, [])

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        {/* <Background /> */}
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            // transition: '0.8s',
            zIndex: 1,
            margin: 0,
            overflow: 'auto',
            // width: `100vw`,
            height: "100vh",
            bgcolor: 'background.main',
          }}
        >
          <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              maxWidth: 1920,
              height: "100%",
            }}
          >
            <Header />
            <MainLabel />
            <WhyLabel />
            <EffectFor />
            <Footer />
          </Stack>
        </Stack>
      </>
    );
  })
);

export default Main;
