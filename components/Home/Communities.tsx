import * as React from 'react';
import { Stack } from '@mui/material';

const communities = [{}, {}, {}];

const Communities = () => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
      width: '100%',
      height: '248px',
    }}
  >
    {communities.map((item, index) => (
      <Stack
        key={index.toString()}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: '365px',
          height: '248px',
        }}
      >
        1
      </Stack>
    ))}
  </Stack>
);

export default Communities;
