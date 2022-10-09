import { Typography } from '@mui/material';
import * as React from 'react';

const H2: React.FC = ({ children }) => (
  <Typography
    sx={{
      fontWeight: '600',
      fontSize: '24px',
      lineHeight: '32px',
    }}
  >
    {children}
  </Typography>
);

export default H2;
