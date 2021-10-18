/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Button, Typography, useTheme, Tab } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import SwipeableViews from 'react-swipeable-views';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../../components/OtherComponents/Navigation/NavigationAll'
import Reports from '../../../components/PagesComponents/Managment/Moderation/Reports';
import Content from '../../../components/PagesComponents/Managment/Moderation/Content';



const PREFIX = 'Moderation';

const classes = {
  Box: `${PREFIX}-Box`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.Box}`]: {
    color: theme => theme.palette.primary.contrastText,
  }
}));



function AntTabs() {
  return ({
    [`& .${classes.root}`]: {
      borderBottom: '0px solid #e8e8e8',
    },

    [`& .${classes.indicator}`]: {
      height: "4px",
      backgroundColor: '#1976d2',
    }
  });
}(Tabs);


//   newFunction();

// function newFunction() {
//   {
//     theme;
//   }
//   ({
//     [`& .${classes.Box}`]: {
//       color: theme => theme.palette.primary.contrastText,
//     }
//   });;
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme()


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.Box} p={3}>
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



const Moderation = inject('store')(observer(({ store }) => {
  const theme = useTheme();



  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    (<Root>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid container direction="column" className={classes.main}>
          <AppBar className={classes.appBar} position="fixed" color="default">
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
            >
              <Tab label={<Typography className={classes.tabLabel}>Жалобы</Typography>} {...a11yProps(0)} />
              <Tab label={<Typography className={classes.tabLabel}>Контент</Typography>} {...a11yProps(1)} />
              {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
              <Tab label={<Typography className={classes.tabLabel}><MoreHorizIcon /></Typography>} {...a11yProps(2)} />
            </AntTabs>
          </AppBar>
          <SwipeableViews
            className={classes.SwipeableViews}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Reports />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Content />
            </TabPanel>
            {/* <TabPanel value={value} index={2} dir={theme.direction}> */}
            {/* <Moderate/> */}
            {/* </TabPanel> */}
            <TabPanel value={value} index={2} dir={theme.direction}>
              {/* <Other /> */}
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </NavigationAll>
    </Root>)
  );
}))

export default Moderation