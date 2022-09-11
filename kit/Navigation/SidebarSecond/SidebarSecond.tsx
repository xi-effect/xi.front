import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Paper, Box } from '@mui/material';

import MenuCommunity from './Community';

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
          mt: '0px',
          p: 0,
          width: 236,
          border: '4px',
          backgroundColor: 'gray.0',
          height: 'calc(100vh - 16px)',
        }}
      >
        <Stack
          sx={{
            width: 236,
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Box
            sx={{
              width: 236,
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
            {router.pathname.includes('/community') && <MenuCommunity />}
          </Box>
        </Stack>
      </Paper>
    );
  }),
);

export default SidebarSecond;
