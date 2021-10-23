import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Accordion, AccordionSummary, Box, useTheme, Typography, AccordionDetails, Grid } from '@mui/material';


import { inject, observer } from 'mobx-react'
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import UserAccount from '../../components/PagesComponents/Settings/UserAccount';
import Castomize from './../../components/PagesComponents/Settings/Castomize';

const Settings = inject('rootStore')(observer(({ rootStore }) => {
  const theme = useTheme();


  return (
    <>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      <NavigationAll>
        <Box sx={{ width: "100%", }}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="center"
            sx={{
              marginTop: 4,
              paddingLeft: 1,
              paddingRight: 1,
              width: "100%",
            }}
          >
            <Grid sx={{
              width: "100%",
              maxWidth: 1200,
            }}>
              {/* <Accordion sx={{ width: "100%", backgroundColor: 'background.1' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography >Учётная запись</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <UserAccount />
                </AccordionDetails>
              </Accordion> */}
              <Accordion sx={{ width: "100%", backgroundColor: 'background.1' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography >Внешний вид</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Castomize />
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </NavigationAll>
    </>
  );
}))

export default Settings