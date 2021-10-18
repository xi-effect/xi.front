import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Accordion, AccordionSummary, useTheme, Typography, AccordionDetails, Grid } from '@mui/material';


import { inject, observer } from 'mobx-react'
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAccount from '../../components/PagesComponents/Settings/UserAccount';
import Castomize from './../../components/PagesComponents/Settings/Castomize';

const PREFIX = 'Settings';

const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  gridMain: `${PREFIX}-gridMain`,
  heading: `${PREFIX}-heading`,
  accordion: `${PREFIX}-accordion`,
  icon: `${PREFIX}-icon`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    width: "100%",
  },

  [`& .${classes.main}`]: {
    marginTop: 32,
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
  },

  [`& .${classes.gridMain}`]: {
    width: "100%",
    maxWidth: 1200,
  },

  [`& .${classes.heading}`]: {
    fontSize: theme => theme.typography.pxToRem(15),
    fontWeight: theme => theme.typography.fontWeightRegular,
    color: theme => theme.palette.primary.contrastText,
  },

  [`& .${classes.accordion}`]: {
    width: "100%",
    backgroundColor: theme => theme.palette.blueGrey["4"]
  },

  [`& .${classes.icon}`]: {
    color: theme => theme.palette.primary.contrastText,
    fontSize: 36,
  }
}));

const Settings = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();


  return (
    (<Root>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <div className={classes.root}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="center" className={classes.main}>
            <Grid className={classes.gridMain}>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Учётная запись</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <UserAccount />
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Внешний вид</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Castomize />
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>

      </NavigationAll>
    </Root>)
  );
}))

export default Settings