import React from 'react';
import { Stack } from '@mui/material';
import XiLogo from 'kit/XiLogo';

const Header = () => (
  <Stack
    component="header"
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{ width: '100%' }}
  >
    <XiLogo width="162px" height="48px" />
  </Stack>
);

export default Header;
