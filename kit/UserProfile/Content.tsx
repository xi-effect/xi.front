/* eslint-disable react/jsx-key */
import * as React from 'react';
import { Stack, useMediaQuery, Theme } from '@mui/material';
import Main from './ContentItems/Main';
import Account from './ContentItems/Account';
import Secure from './ContentItems/Secure';
import SoundAndVideo from './ContentItems/SoundAndVideo';

type ContentProps = {
  activeContent: number;
};

const Content = ({ activeContent }: ContentProps) => {
  const mobile1400: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));
  const mobile800: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(800));
  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{
        margin: mobile700 ? '' : `16px ${!mobile1400 ? '46px' : '0px'} 16px 32px`,
        ml: mobile800 ? '16px' : '',
        mt: mobile700 ? '8px' : '',
        width: '100%',
        maxWidth: '928px',
        minWidth: 0,
        mb: '120px',
      }}
    >
      {[<Main />, <Account />, <Secure />, <SoundAndVideo />][activeContent]}
    </Stack>
  );
};

export default Content;

