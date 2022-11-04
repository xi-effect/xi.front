/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { inject, observer } from 'mobx-react';

import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { UserProfile } from 'kit/UserProfile';
import { ExitDialog } from '@xieffect/base.dialogs.exit';
import { SidebarSecond } from './SidebarSecond';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type DesktopT = {
  children: React.ReactNode;
};

const Desktop: React.FC<DesktopT> = inject()(
  observer(({ children }) => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        zIndex: 0,
        backgroundColor: 'primary.pale',
        overflow: 'hidden',
      }}
    >
      <UserProfile />
      <ExitDialog />
      <Box sx={{ width: 64 }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: 236, borderRadius: '8px' }}>
        <SidebarSecond />
      </Box>
      {children}
    </Stack>
  )),
);

export default Desktop;
