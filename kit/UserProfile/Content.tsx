// @ts-nocheck
import * as React from 'react';
import { Stack, useMediaQuery, Theme } from '@mui/material';
import dynamic from 'next/dynamic';
import Main from './ContentItems/Main';
import Account from './ContentItems/Account';
import Secure from './ContentItems/Secure';

const SoundAndVideo = dynamic(import('./ContentItems/SoundAndVideo'), { ssr: false });

type ContentProps = {
  activeContent: number;
};

const Content = ({ activeContent }: ContentProps) => {
  const mobile1400: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{
        margin: `16px ${!mobile1400 ? '56px' : '0px'} 16px 32px`,
        width: '100%',
      }}
    >
      {activeContent === 0 && <Main />}
      {activeContent === 1 && <Account />}
      {activeContent === 2 && <Secure />}
      {activeContent === 3 && <SoundAndVideo />}
    </Stack>
  );
};

export default Content;
