/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Button, useTheme, Typography, Tab } from '@mui/material';


// import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'


const Managment = inject('rootStore')(observer(({ rootStore }) => {
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
        <Grid container sx={{
          width: '100%',
          zIndex: 1,
        }}>

        </Grid>
      </NavigationAll>
    </>
  );
}))

export default Managment