import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React from "react";
import Loading from "./../components/OtherComponents/Loading/Loading";
import CardsList from "./../components/PagesComponents/Landing/CardList";
import Header from "./../components/PagesComponents/Landing/Header";

const Main = inject(
  "rootStore",
  "uiStore"
)(
  observer(({ rootStore, uiStore }) => {
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        {/* <Background /> */}
        {/* {loading && <Loading />} */}
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Header />
          <Image
              alt="alt"
              src={"/landing.svg"}
              layout="fill"
              objectFit="cover"
              quality={100}
              // onLoadingComplete={() => setLoading(false)}
            />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{zIndex: 1, mt: '10%', }}
            >
              <Image
                alt="alt"
                src={"/Something.svg"}
                // layout="fill"
                // objectFit="cover"
                quality={100}
                width={256}
                height={232}
                // onLoadingComplete={() => setLoading(false)}
              />
              <Typography variant="h6">
                Сайт устал, мы устраняем неполадки
              </Typography>
            </Stack>
        </Grid>
      </>
    );
  })
);

export default Main;
