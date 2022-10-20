// @ts-nocheck
import * as React from 'react';
import { Stack, useMediaQuery, Theme } from '@mui/material';
import Main from './ContnetItems/Main';

const Content = () => {
  const activeButton = 0;
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
      {activeButton === 0 && <Main />}
    </Stack>
  );
};

export default Content;
