/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head"
import { styled } from "@mui/material/styles";
import Image from "next/image"
import Link from "next/link"
import Router from "next/router"
import React from "react";
import { Grid, Box, AppBar, Tabs, Button, Typography, useTheme, Tab } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import SwipeableViews from "react-swipeable-views";
import { inject, observer } from "mobx-react"

import NavigationAll from "../../../components/OtherComponents/Navigation/NavigationAll"
// import Reports from "../../../components/PagesComponents/Managment/Moderation/Reports";
// import Content from "../../../components/PagesComponents/Managment/Moderation/Content";

const Moderation = inject("store")(observer(({ store }) => {
  const theme = useTheme();


  return (
    <>
      <Head>
        <title>
          Ξffect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid container direction="column" sx={{
          width: "100%",
          zIndex: 1,
        }}>

        </Grid>
      </NavigationAll>
    </>
  );
}))

export default Moderation