import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Router from 'next/router'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, useMediaQuery, Link, Button, Grid, Paper, useTheme, Typography } from '@mui/material';

import Image from 'next/image'
import Loading from './../../components/OtherComponents/Loading/Loading';

import { inject, observer } from 'mobx-react'


const PREFIX = 'Schools';

const classes = {
  main: `${PREFIX}-main`,
  NavigationGrid: `${PREFIX}-NavigationGrid`,
  ImageGrid: `${PREFIX}-ImageGrid`,
  mainLabel: `${PREFIX}-mainLabel`,
  mainLabelMobile: `${PREFIX}-mainLabelMobile`,
  ContentGrid1: `${PREFIX}-ContentGrid1`,
  ContentGrid2: `${PREFIX}-ContentGrid2`,
  Link: `${PREFIX}-Link`,
  LinkMobile: `${PREFIX}-LinkMobile`,
  enterButton: `${PREFIX}-enterButton`,
  enterButtonMobile: `${PREFIX}-enterButtonMobile`,
  dividerDiv: `${PREFIX}-dividerDiv`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.main}`]: {
    width: '100%',
    height: '100%',
  },

  [`& .${classes.NavigationGrid}`]: {
    height: 64,
    backgroundColor: theme => theme.palette.constant.landingBlue,
  },

  [`& .${classes.ImageGrid}`]: {
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

  [`& .${classes.mainLabel}`]: {
    cursor: "default",
    fontWeight: "bold",
    color: "#fff",
    //marginTop: 8,
    marginLeft: 16,
  },

  [`& .${classes.mainLabelMobile}`]: {
    fontSize: 26,
  },

  [`& .${classes.ContentGrid1}`]: {
    width: '100%',
    height: 312,
    backgroundColor: theme => theme.palette.constant.landingBlue,
  },

  [`& .${classes.ContentGrid2}`]: {
    width: '100%',
    height: 312,
    backgroundColor: theme => theme.palette.constant.landingPink,
  },

  [`& .${classes.Link}`]: {
    fontSize: 20,
    margin: 8,
    cursor: "pointer",
    color: theme => theme.palette.constant.textWhite,
  },

  [`& .${classes.LinkMobile}`]: {
    fontSize: 12,
  },

  [`& .${classes.enterButton}`]: {
    //cursor: "default",
    fontWeight: "bold",
    color: theme => theme.palette.constant.textWhite,
    fontSize: 24,
    marginRight: 8,
    // borderRadius: 32,
    // padding: 12,
  },

  [`& .${classes.enterButtonMobile}`]: {
    fontSize: 18,
  },

  [`& .${classes.dividerDiv}`]: {
    //position: "relative",
    backgroundColor: theme => theme.palette.blueGrey["3"],
    width: "100%",
    paddingTop: "41.8%",
  }
}));

const Schools = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
  const theme = useTheme();

  const router = useRouter()
  const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


  return (
    (<Root>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background /> */}
      {uiStore.loading["/"] && <Loading />}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        className={classes.main}
      >
        {/* <ScientistsComponent
        src={"/scientists/leonardoDaVinci.png"}
        height={256}
        width={256}
        top={128}
        left={-24}
        /> */}
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.NavigationGrid}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: 1200, height: 64, }}
          >
            <Grid item>
              <Typography onClick={() => {
                router.push({
                  pathname: '/',
                })
              }}
                className={clsx(classes.mainLabel, { [classes.mainLabelMobile]: mobile })} variant="h3"
              >
                Ξffect
              </Typography>
            </Grid>
            <Grid item>
              {!mobile && <>
                <Link
                  className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
                  onClick={() => {
                    router.push({
                      pathname: '/students',
                    })
                  }}
                  underline="hover"
                >
                  Ученикам
                </Link>
                <Link
                  className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
                  onClick={() => {
                    router.push({
                      pathname: '/teachers',
                    })
                  }}
                  underline="hover"
                >
                  Преподавателям
                </Link>
                <Link
                  className={clsx(classes.Link, { [classes.LinkMobile]: mobile })}
                  onClick={() => {
                    router.push({
                      pathname: '/schools',
                    })
                  }}
                  underline="hover"
                >
                  Школам
                </Link>
              </>}
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  router.push({
                    pathname: '/main',
                  })
                }}
                className={clsx(classes.enterButton, { [classes.enterButtonMobile]: mobile })}
              >
                Войти
              </Button>
            </Grid>
          </Grid>
        </Grid>
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
            //layout="responsive"
            //objectFit="cover"
            //quality={100}
            //objectFit="fill"
            //width={3440}
            //height={1440}
            onLoad={() =>
              uiStore.setLoading("/")
            }
          />
        </Grid>
        {/* <div className={classes.dividerDiv}>
        </div> */}
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 0, }}
          className={classes.ContentGrid1}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >

          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 0, }}
          className={classes.ContentGrid2}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >

          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 0, }}
          className={classes.ContentGrid1}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >

          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 0, }}
          className={classes.ContentGrid2}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >

          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 0, }}
          className={classes.ContentGrid1}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >

          </Grid>
        </Grid>
      </Grid>
    </Root>)
  );
}))

export default Schools