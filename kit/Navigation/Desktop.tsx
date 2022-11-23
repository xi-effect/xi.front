import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from 'store/connect';
import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { UserProfile } from 'kit/UserProfile';
import { ExitDialog } from '@xieffect/base.dialogs.exit';
import { SidebarSecond } from './SidebarSecond';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type DesktopT = {
  children: React.ReactNode;
};

const Desktop = observer(({ children }: DesktopT) => {
  const rootStore = useStore();
  const { uiSt } = rootStore;

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
      <ExitDialog uiSt={uiSt} rootStore={rootStore} />
      <Box sx={{ width: 64 }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: 236, borderRadius: '8px' }}>
        <SidebarSecond />
      </Box>
      {children}
    </Stack>
  );
});

export default Desktop;
