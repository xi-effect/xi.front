// @ts-nocheck
import * as React from 'react';
import { Stack, useMediaQuery, Theme } from '@mui/material';
import Main from './ContnetItems/Main';
import Account from './ContnetItems/Account';
import Secure from './ContnetItems/Secure';
import SoundAndVideo from './ContentItems/SoundAndVideo';

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
