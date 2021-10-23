/* eslint-disable react-hooks/exhaustive-deps */

// React, Next, MobX imports 
import { AppBar, Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
// import SwipeableViews from 'react-swipeable-views';
// Компоненты
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';

const Messages = () => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            zIndex: 1,
          }}
        >
          
        </Grid>
      </NavigationAll>
    </>
  );
}

export default Messages