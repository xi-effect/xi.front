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


const Main = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const firstCard = React.useRef(null)

  const executeScroll = () => firstCard.current.scrollIntoView({ behavior: "smooth" })

  return (
    <>
      <Head>
        <title>
          Ξffect
        </title>
      </Head>
      {/* <Background /> */}
      {loading && <Loading />}
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
          sx={{
            position: "relative",
            backgroundColor: 'background.1',
            width: "100%",
            paddingTop: "41.8%",
          }}>
          <Image
            alt="alt"
            src={"/backgroundImg.jpg"}
            layout="fill"
            objectFit="cover"
            quality={100}

            onLoad={() =>
              setLoading(false)
            }
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            height: "396px",
            background: `linear-gradient(0deg, ${theme.palette.background["2"]} , #d391e3)`,
          }}
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ maxWidth: 1200, }}
          >
            <IconButton onClick={executeScroll} size="large">
              <ArrowDownwardIcon sx={{
                fontSize: 48,
                color: 'constant.textWhite',
              }} />
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