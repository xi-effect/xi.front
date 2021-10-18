import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'

import { inject, observer } from 'mobx-react'
import Loading from './../components/OtherComponents/Loading/Loading';
import Header from './../components/PagesComponents/Landing/Header';
import CardsList from './../components/PagesComponents/Landing/CardList';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  ImageGrid: {
    position: "relative",
    backgroundColor: theme => theme.palette.blueGrey["3"],
    width: "100%",
    paddingTop: "41.8%",
    // display: "block",
    // position: "absolute",
    // top: 64,
    // left: 0,
    // right: 0,
  },
  ContentGrid: {
    width: '100%',
    height: 396,
    background: `linear-gradient(0deg, ${theme.palette.background["2"]} , #d391e3)`,
    //backgroundColor: theme => theme.palette.constant.landingBlue,
  },
  dividerDiv: {
    //position: "relative",
    backgroundColor: theme => theme.palette.blueGrey["3"],
    width: "100%",
    paddingTop: "41.8%",
  },
  Icon: {
    fontSize: 48,
    color: theme => theme.palette.constant.textWhite,
  }
}));


const Main = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const router = useRouter()
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const firstCard = React.useRef(null)

  const executeScroll = () => firstCard.current.scrollIntoView({behavior: "smooth"})

  return (
    <>
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
        className={classes.root}
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
            <IconButton onClick={executeScroll}>
              <ArrowDownwardIcon className={classes.Icon} />
            </IconButton>
          </Grid>
        </Grid>
        <div ref={firstCard}> </div>
        <CardsList />
      </Grid>
    </>
  );
}))

export default Main