/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { SidebarSecond } from './SidebarSecond';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type DesktopT = {
  children: React.ReactNode;
};

const Desktop: React.FC<DesktopT> = inject()(
  observer(({ children }) => {
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
        <Box sx={{ width: 64 }}>
          <Sidebar />
        </Box>
        <Box sx={{ width: 236 }}>
          <SidebarSecond />
        </Box>
        {children}
      </Stack>
    );
  }),
);

export default Desktop;
