import React from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Box,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import { motion } from "framer-motion"
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
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
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
            position: 'relative',
          }}
        >
          {!mobile && <>
            <Box
              sx={{
                position: 'absolute',
                top: 700,
                right: 10,
              }}
            >
              <Image
                alt="alt"
                src={"/landing/blob1.svg"}
                quality={100}
                width={512}
                height={512}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 500,
                left: 10,
              }}
            >
              <Image
                alt="alt"
                src={"/landing/blob2.svg"}
                quality={100}
                width={512}
                height={512}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 1800,
                right: 40,
              }}
            >
              <Image
                alt="alt"
                src={"/landing/blob4.svg"}
                quality={100}
                width={512}
                height={512}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 2500,
                left: 20,
              }}
            >
              <Image
                alt="alt"
                src={"/landing/blob3.svg"}
                quality={100}
                width={512}
                height={512}
              />
            </Box>
          </>}

          <Stack
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
