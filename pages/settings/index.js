import Head from 'next/head'
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Accordion, AccordionSummary, Button, useMediaQuery, Box, Stack, Tooltip, useTheme, Typography, AccordionDetails, Grid, IconButton } from '@mui/material';


import { inject, observer } from 'mobx-react'
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import UserAccount from '../../components/PagesComponents/Settings/UserAccount';
import Castomize from './../../components/PagesComponents/Settings/Castomize';
import LogoutIcon from '@mui/icons-material/Logout';
import UserAvatar from '../../components/PagesComponents/Settings/UserAvatar';
import CustomAvatar from '../../components/OtherComponents/Avatar/CustomAvatar';

const Settings = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));

  return (
    <>
      <Head>
        <title>
          Ξffect
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
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-end"
              sx={{
                width: '100%',
                height: 256,
                maxWidth: 1200,
              }}
            >
              {/* <Typography variant="h6" sx={{ pl: 1 }}> {settingsStore.settings.username} </Typography> */}
              <CustomAvatar avatar={settingsStore.settings.avatar} viewBox={{ x: '-175', y: '-100', width: '1256', height: '1256' }} />
              {!mobile && <Button sx={{ ml: "auto", mr: 1, mb: 1.2, }} onClick={() => settingsStore.saveNewSettimgs()} color="inherit">
                Сохранить изменения
              </Button>}
              {mobile && <Tooltip title="Сохранить изменения">
                <IconButton sx={{ ml: "auto", mr: 1, mb: 1, }} onClick={() => settingsStore.saveNewSettimgs()} color="inherit">
                  <SaveIcon />
                </IconButton>
              </Tooltip>}
              <Tooltip title="Выйти">
                <IconButton sx={{ m: 1 }} onClick={() => settingsStore.logout()} color="error">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Grid sx={{
              width: "100%",
              maxWidth: 1200,
            }}>
              <Accordion sx={{ width: "100%", backgroundColor: 'background.1' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography >Настройка Аватара</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <UserAccount /> */}
                  <UserAvatar />
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ width: "100%", backgroundColor: 'background.1' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Внешний вид приложения</Typography>
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