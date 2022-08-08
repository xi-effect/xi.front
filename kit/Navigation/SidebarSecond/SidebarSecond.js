import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Paper, Box } from '@mui/material';

import MenuCommunity from './Community';
import MenuSettingsComp from './SettingsComp';
// import MenuHomeComp from "./Home";

import Home from '../SidebarSecondHeaders/Home';
import Community from '../SidebarSecondHeaders/Community';
import Settings from '../SidebarSecondHeaders/Settings';

const SidebarSecond = inject()(
  observer(() => {
    const router = useRouter();

    return (
      <Paper
        sx={{
          zIndex: 20,
          mt: '8px',
          p: 0,
          width: 236,
          borderTopRightRadius: '4px',
          borderTopLeftRadius: '4px',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          backgroundColor: 'gray.0',
          height: 'calc(100vh - 8px)',
        }}
      >
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
          <Box
            sx={{
              width: '100%',
              height: '52px',
              zIndex: 100,
              p: 0,
              borderBottom: '1px solid #ECEFFF',
            }}
          >
            {router.pathname.includes('/home') && <Home />}
            {router.pathname.includes('/community') && <Community />}
            {router.pathname.includes('/settings') && <Settings />}
          </Box>
          <Box
            sx={{
              width: '100%',
              height: 'calc(100vh - 56px)',
              zIndex: 100,
            }}
          >
            {/* {router.pathname.includes("/home") && <MenuHomeComp />} */}
            {router.pathname.includes('/community') && <MenuCommunity />}
            {router.pathname.includes('/settings') && <MenuSettingsComp />}
          </Box>
        </Stack>
      </Paper>
    );
  }),
);

export default SidebarSecond;
