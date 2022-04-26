import Head from "next/head";
import React from "react";
import { Stack, Grid } from "@mui/material";
import { inject, observer } from "mobx-react";
import Navigation from "components/OtherComponents/Navigation/Navigation";
import Stories from "components/PagesComponents/Home/Stories";
import TaskForDay from "components/PagesComponents/Home/TaskForDay";
import UpcomingTasks from 'components/PagesComponents/Home/UpcomingTasks';

const Home = inject()(observer(() => (
  (
    <>
      <Head>
        <title>
          Ξffect | Главная
        </title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          sx={{
            maxWidth: "100%",
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
              }}
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <TaskForDay />
            </Grid>
            <UpcomingTasks />
          </Grid>
        </Stack>
      </Navigation>
    </>
  )
)));

export default Home;