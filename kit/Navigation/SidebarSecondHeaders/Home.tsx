import React from 'react';
import { inject, observer } from 'mobx-react';

import { Typography, Stack } from '@mui/material';

const Home = inject()(
  observer(() => (
    // const { enqueueSnackbar } = useSnackbar();
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        p: 1,
        height: '100%',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: 18,
        }}
      >
        Главная
      </Typography>
    </Stack>
  )),
);

export default Home;
