/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import clsx from 'clsx';
import { Grid, Box, AppBar, useMediaQuery, Tabs, Typography, Tab, useTheme } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import SwipeableViews from 'react-swipeable-views';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'

import Pages from '../../components/PagesComponents/Knowledge/Pages';
import Modules from '../../components/PagesComponents/Knowledge/Modules';
//import Moderate from '../../components/PagesComponents/Knowledge/Moderate';
//import Other from '../../garbage/Other';

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    height: "4px",
    backgroundColor: '#1976d2',
  },
}))(Tabs);

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
        <Box p={0.5}>
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


const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    zIndex: 1,
  },
  appBar: {
    left: 72,
    backgroundColor: theme => theme.palette.blueGrey["0"]
  },
  appBarMod: {
    left: 0,
  },
  tab: {
    borderBottom: "5px solid #fff",
  },
  tabLabel: {
    fontSize: "14px",
    color: theme => theme.palette.primary.contrastText,
  },
  tabPanel: {
    height: "100vh",
  },
  SwipeableViews: {
    marginTop: 48,
    width: '100%',
  }
}));

const Knowledge = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();
  const classes = useStyles(theme);


  React.useEffect(() => {
    if (sessionStorage.getItem('KnowledgeTab') === "Pages") return setValue(0)
    if (sessionStorage.getItem('KnowledgeTab') === "Modules") return setValue(1)
    if (sessionStorage.getItem('KnowledgeTab') === "Others") return setValue(2)
  });

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
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.main}>
          <AppBar className={clsx(classes.appBar, { [classes.appBarMod]: useMediaQuery(theme.breakpoints.only('xs')) })} position="fixed" color="default">
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
            >
              <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Pages")} label={<Typography className={classes.tabLabel}>Страницы</Typography>} {...a11yProps(0)} />
              <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<Typography className={classes.tabLabel}>Модули</Typography>} {...a11yProps(1)} />
              {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
              {/* <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Others")} label={<Typography className={classes.tabLabel}><MoreHorizIcon /></Typography>} {...a11yProps(2)} /> */}
            </AntTabs>
          </AppBar>
          <SwipeableViews
            className={classes.SwipeableViews}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Pages />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Modules />

              {/* <Modules /> */}
            </TabPanel>

            {/* <TabPanel value={value} index={2} dir={theme.direction}> */}
            {/* <Moderate/> */}
            {/* </TabPanel> */}
            {/* <TabPanel value={value} index={2} dir={theme.direction}> */}
            {/* <Other /> */}
            {/* </TabPanel> */}
          </SwipeableViews>
        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Knowledge