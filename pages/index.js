import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


import { inject, observer } from 'mobx-react'
import Loading from './../components/OtherComponents/Loading/Loading';
import Header from './../components/PagesComponents/Landing/Header';
import CardsList from './../components/PagesComponents/Landing/CardList';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const PREFIX = 'Main';

const classes = {
  ImageGrid: `${PREFIX}-ImageGrid`,
  ContentGrid: `${PREFIX}-ContentGrid`,
  dividerDiv: `${PREFIX}-dividerDiv`,
  Icon: `${PREFIX}-Icon`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.ImageGrid}`]: {
    position: "relative",
    backgroundColor: theme.palette.blueGrey["3"],
    width: "100%",
    paddingTop: "41.8%",
    // display: "block",
    // position: "absolute",
    // top: 64,
    // left: 0,
    // right: 0,
  },

  [`& .${classes.ContentGrid}`]: {
    width: '100%',
    height: 396,
    background: `linear-gradient(0deg, ${theme.palette.background["2"]} , #d391e3)`,
    //backgroundColor:  theme.palette.constant.landingBlue,
  },

  [`& .${classes.dividerDiv}`]: {
    //position: "relative",
    backgroundColor:  theme.palette.blueGrey["3"],
    width: "100%",
    paddingTop: "41.8%",
  },

  [`& .${classes.Icon}`]: {
    fontSize: 48,
    color:  theme.palette.constant.textWhite,
  }
}));


const Main = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
  const theme = useTheme();

  const router = useRouter()
  const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const firstCard = React.useRef(null)

  const executeScroll = () => firstCard.current.scrollIntoView({ behavior: "smooth" })

  return (
    <Root>
      <Head>
        <title>
          Ξffect
        </title>
      </Head>
      {/* <Background /> */}
      {uiStore.loading["/"] && <Loading />}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Header />
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.ImageGrid}>
          <Image
            className={classes.Image}
            // alt={alt}
            alt="alt"
            src={"/backgroundImg.jpg"}
            layout="fill"
            objectFit="cover"
            quality={100}

            onLoad={() =>
              uiStore.setLoading("/")
            }
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 0, }}
          className={classes.ContentGrid}>
          <Grid
            item
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >
            <IconButton onClick={executeScroll} size="large">
              <ArrowDownwardIcon className={classes.Icon} />
            </IconButton>
          </Grid>
        </Grid>
        <div ref={firstCard}> </div>
        <CardsList />
      </Grid>
    </Root>
  );
}))

export default Main