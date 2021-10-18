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
import AuthorCard from '../../components/PagesComponents/Managment/Managment/AuthorCard';
import ModerationCard from '../../components/PagesComponents/Managment/Managment/ModerationCard';


const PREFIX = 'Managment';

const classes = {
  main: `${PREFIX}-main`,
  appBar: `${PREFIX}-appBar`,
  tab: `${PREFIX}-tab`,
  tabLabel: `${PREFIX}-tabLabel`,
  tabPanel: `${PREFIX}-tabPanel`,
  SwipeableViews: `${PREFIX}-SwipeableViews`,
  buttonAuthor: `${PREFIX}-buttonAuthor`,
  labelAuthor: `${PREFIX}-labelAuthor`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.main}`]: {
    width: '100%',
    zIndex: 1,
  },

  [`& .${classes.appBar}`]: {
    left: 72,
    [theme => theme.breakpoints.only('xs')]: {
      left: 0,
    },
    backgroundColor: theme => theme.palette.blueGrey["0"]
  },

  [`& .${classes.tab}`]: {
    borderBottom: "5px solid #fff",
  },

  [`& .${classes.tabLabel}`]: {
    fontSize: "14px",
    color: theme => theme.palette.primary.contrastText,
  },

  [`& .${classes.tabPanel}`]: {
    height: "100vh",
  },

  [`& .${classes.SwipeableViews}`]: {
    marginTop: 48,
  },

  [`& .${classes.buttonAuthor}`]: {
    marginTop: 12,
    color: theme => theme.palette.primary.contrastText,
    border: theme => `1px solid ${theme.palette.primary.contrastText}`,
  },

  [`& .${classes.labelAuthor}`]: {
    marginTop: 12,
    color: theme => theme.palette.primary.contrastText,
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



const Managment = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();


  //const { enqueueSnackbar } = useSnackbar();

  const [role, setRole] = React.useState({ author: null, moderator: null })
  React.useEffect(() => {
    rootStore.fetchDataScr(`${rootStore.url}/settings/roles/`, "GET")
      .then((data) => {
        setRole(data)
        console.log("role", role)
      });
    //store.getNewCourses()
  }, []);

  const becomeAuther = () => {
    rootStore.fetchDataScr(`${rootStore.url}/authors/permit/`, "GET")
      .then((data) => {
        if (data.a) return setRole([...role, author = "current"])
        if (!data.a) {
          //enqueueSnackbar('Вы не можете стать автором', { variant: 'error' });
        }
      });
  }

  return (
    (<Root>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid container className={classes.main}>
          <AuthorCard />
          <ModerationCard />
          <ModerationCard />

        </Grid>
      </NavigationAll>
    </Root>)
  );
}))

export default Managment