/* eslint-disable react-hooks/exhaustive-deps */

// React, Next, MobX imports 
import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import clsx from 'clsx';


import { Grid, Box, AppBar, useMediaQuery, Tabs, Typography, Tab, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

// import SwipeableViews from 'react-swipeable-views';


// Компоненты
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
import Pages from '../../components/PagesComponents/Knowledge/Pages';
import Modules from '../../components/PagesComponents/Knowledge/Modules';


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
        <Box sx={{ width: '100%', marginTop: 8 }}>
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


const Knowledge = () => {
  const theme = useTheme();


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
          {/*  */}
          <AppBar
            sx={{
              left: useMediaQuery(theme => theme.breakpoints.only('xs')) ? 0 : 200,
              backgroundColor: 'background.1',
            }}
            position="fixed"
            color="default"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
              sx={{
                '& .MuiTabs-indicator': {
                  height: "4px",
                },
              }}
            >
              <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Pages")} label={<Typography sx={{ color: 'text.main' }}>Страницы</Typography>} {...a11yProps(0)} />
              <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<Typography sx={{ color: 'text.main' }}>Модули</Typography>} {...a11yProps(1)} />
              {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
              {/* <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Others")} label={<Typography className={classes.tabLabel}><MoreHorizIcon /></Typography>} {...a11yProps(2)} /> */}
            </Tabs>
          </AppBar>
          {/* <SwipeableViews
            sx={{ width: '100%', marginTop: 6, }}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          > */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Pages />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Modules />
          </TabPanel>
          {/* </SwipeableViews> */}
        </Grid>
      </NavigationAll>
    </>
  );
}

export default Knowledge