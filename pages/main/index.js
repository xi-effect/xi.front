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
import NavigationAll from './../../components/OtherComponents/Navigation/NavigationAll';

const PREFIX = 'Main';

const classes = {
  main: `${PREFIX}-main`,
  space: `${PREFIX}-space`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.main}`]: {
    width: '100%',
    //minHeight: '100vh',
    zIndex: 1,
  },

  [`& .${classes.space}`]: {
    width: '100%',
    height: "100px",
    //backgroundColor: theme => theme.palette.blueGrey["5"]
  }
}));

const Main = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();

  return (
    (<Root>
      <Head>
        <title>
          Ξffect
        </title>
      </Head>
      {/* <Background /> */}
      <NavigationAll>
        <Grid container className={classes.main}>
          <Box className={classes.space}>

          </Box>
        </Grid>
      </NavigationAll>
    </Root>)
  );
}))

export default Main