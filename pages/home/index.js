import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Divider, Box, Grid, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'
//import Background from './../components/OtherComponents/Background/Background'
//import QuiсkButtons from './../components/PagesComponents/Main/QuiсkButtons';
//import QuiсkWidgets from '../components/PagesComponents/Main/QuiсkWidgets';
// import Card7 from './../components/PagesComponents/Main/MainHelpApps/Card7';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';


const Main = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();

  return (
    (
      <>
      <Head>
        <title>
          Ξffect
        </title>
      </Head>
      {/* <Background /> */}
      <NavigationAll>

      </NavigationAll>
      </>
    )
  );
}))

export default Main