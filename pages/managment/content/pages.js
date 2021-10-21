/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Button, Typography, Tab, useTheme } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../../components/OtherComponents/Navigation/NavigationAll'


const ContentPages = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid container direction="column"
          sx={{
            width: '100%',
            zIndex: 1,
          }}
        >

        </Grid>
      </NavigationAll>
    </>
  );
}))

export default ContentPages