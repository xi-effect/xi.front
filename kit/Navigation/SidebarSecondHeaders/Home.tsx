import React from 'react';
import { observer } from 'mobx-react';

import { Typography, Stack } from '@mui/material';

const Home = observer(() => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    spacing={2}
    sx={{
      width: '236px',
      p: '14px 12px 14px 16px',
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontSize: 18,
        fontWeight: 500,
        lineHeight: '22px',
      }}
    >
      Главная
    </Typography>
  </Stack>
));

export default Home;
