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

import Toolbar from '../../../components/PagesComponents/Managment/Content/Pages/Toolbar';
import DataList from '../../../components/PagesComponents/Managment/Content/Pages/DataList';
import DialogPageCreation from '../../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation';

const ContentPages = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();
  const [dialogPageCreation, setDialogPageCreation] = React.useState(false)


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
            p: 2,
          }}
        >
          <Grid>
            <Typography variant="h5"> Управление контентом </Typography>
          </Grid>
          <Grid sx={{ marginTop: 2, }}>
            <Toolbar setDialogPageCreation={setDialogPageCreation} />
          </Grid>
          <DialogPageCreation dialogPageCreation={dialogPageCreation} setDialogPageCreation={setDialogPageCreation} />
          <DataList />
        </Grid>
      </NavigationAll>
    </>
  );
}))

export default ContentPages