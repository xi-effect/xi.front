/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { UserProfile } from 'kit/UserProfile';
import { ExitDialog } from '@xieffect/base.dialogs.exit';
import { SidebarSecond } from './SidebarSecond';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type DesktopT = {
  children: React.ReactNode;
  uiSt?: any;
  userSt?: any;
};

const Desktop: React.FC<DesktopT> = inject(
  'uiSt',
  'userSt',
)(
  observer(({ children, uiSt, userSt }) => {
    const router = useRouter();

    return (
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
        <ExitDialog uiSt={uiSt} userSt={userSt} />
        <Box sx={{ width: 64 }}>
          <Sidebar />
        </Box>
        <Box sx={{ width: 236, borderRadius: '8px' }}>
          <SidebarSecond />
        </Box>
        {children}
      </Stack>
    );
  }),
);

export default Desktop;
