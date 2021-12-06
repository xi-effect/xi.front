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
      }, 3000);
    }, [])

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        {/* <Background /> */}
        <Stack
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <Header />
          <MainLabel />
          <Grid
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.5 }}
            sx={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
              zIndex: "-1",
            }}
          >
            <Image
              alt="alt"
              src={"/svg/BackgroundWaves.svg"}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </Grid>
          <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ zIndex: 1, mt: '10%', }}
          >
            <Image
              alt="alt"
              src={"/svg/Something.svg"}
              quality={100}
              width={256}
              height={232}
            />
            <Typography sx={{ cursor: "default" }} variant="h6">
              Сайт устал, мы устраняем неполадки
            </Typography>
          </Stack>
        </Stack>
      </>
    );
  })
);

export default Main;
