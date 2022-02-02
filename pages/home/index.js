import Head from "next/head"
import { styled } from "@mui/material/styles";
import Link from "next/link"
import Router from "next/router"
import React from "react";
import { Divider, Stack, Box, Grid, useTheme } from "@mui/material";


import { inject, observer } from "mobx-react"
//import Background from "./../components/OtherComponents/Background/Background"
//import QuiсkButtons from "./../components/PagesComponents/Main/QuiсkButtons";
//import QuiсkWidgets from "../components/PagesComponents/Main/QuiсkWidgets";
// import Card7 from "./../components/PagesComponents/Main/MainHelpApps/Card7";
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";
import Stories from "../../components/PagesComponents/Home/Stories";
import TaskForDay from "../../components/PagesComponents/Home/TaskForDay";


const Home = inject("rootStore")(observer(({ rootStore }) => {
  const theme = useTheme();

  return (
    (
      <>
        <Head>
          <title>
            Ξffect | Главная
          </title>
          <meta name="robots" content="noindex" />
        </Head>
        {/* <Background /> */}
        <NavigationAll>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
            sx={{
              maxWidth: "100%",
              // height: "100%",
              pt: 1,
              ml: 0,
              mr: 0,
              pb: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Stories />
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                mt: 2,
                height: "100%",
                pb: 20,
              }}
            >
              <Grid
                ax={12}
                xs={12}
                sm={12}
                md={12}
                dl={12}
                lg={12}
                gx={6}
                xl={4}
                item
                sx={{
                  p: 1,
                  transition: "0.8s",
                  width: "100%",
                  // height: 400,
                  // maxHeight: "100%"
                }}
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <TaskForDay />
              </Grid>
            </Grid>
          </Stack>
        </NavigationAll>
      </>
    )
  );
}))

export default Home