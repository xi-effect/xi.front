// @ts-nocheck
import * as React from 'react';
import { Stack } from '@mui/material';
import Main from './ContnetItems/Main';


const Content = () => {
  const activeButton = 0;

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{
        margin: '56px 16px 16px 32px',
        maxWidth: '928px',
        width: '100%',
      }}
    >
      {activeButton === 0 && <Main />}
    </Stack>
  );
};

export default Content;
