/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head"
import React from "react";
import { Grid, } from "@mui/material";
import { inject, observer } from "mobx-react"

import NavigationAll from "../../../components/OtherComponents/Navigation/NavigationAll"
// import Reports from "../../../components/PagesComponents/Managment/Moderation/Reports";
// import Content from "../../../components/PagesComponents/Managment/Moderation/Content";

const Moderation = inject()(observer(() => (
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
        }} />
      </NavigationAll>
    </>
  )))

export default Moderation