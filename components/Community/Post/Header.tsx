/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';

const Header = observer(() => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
      mt: '12px',
      width: '100%',
    }}
  >
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: '40px',
        color: 'grayscale.100',
      }}
    >
      Победа на чемпионате
    </Typography>
  </Stack>
));

export default Header;
