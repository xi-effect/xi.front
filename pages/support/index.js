import React from "react";
import Head from "next/head";
import { Stack } from "@mui/material";
import { inject, observer } from "mobx-react";
import { motion } from "framer-motion";
import FAQ from "components/PagesComponents/Support/FAQ";
import Header from "components/PagesComponents/Landing/Header";
import Footer from "components/PagesComponents/Landing/Footer";

const Support = inject()(
  observer(() => (
    <>
      <Head>
        <title>Ξffect | Поддержка</title>
      </Head>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          zIndex: 1,
          margin: 0,
          overflow: "auto",
          height: "100vh",
          bgcolor: "background.main",
        }}
      >
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
          <FAQ />
          <Footer />
        </Stack>
      </Stack>
    </>
  ))
);

export default Support;
