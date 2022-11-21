import React from 'react';
import { observer } from 'mobx-react';

import { Typography, Stack } from '@mui/material';

const Settings = observer(() => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
    <Typography
      variant="h5"
      sx={{
        fontSize: 18,
      }}
    >
      Настройки
    </Typography>
  </Stack>
));

export default Settings;
