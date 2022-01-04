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


const Support = inject(
  "rootStore",
)(
  observer(({ rootStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
      <>
        <Head>
          <title>Ξffect</title>
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
            overflow: 'auto',
            height: "100vh",
            bgcolor: 'background.main',
            // position: 'relative',
          }}
        >
          
        </Stack>
      </>
    );
  })
);

export default Support;
