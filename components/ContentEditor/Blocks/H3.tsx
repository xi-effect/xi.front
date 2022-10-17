import React from 'react';
import { Typography } from '@mui/material';

const H3: React.FC = ({ children }) => (
  <Typography
    sx={{
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '24px',
    }}
  >
    {children}
  </Typography>
);

export default H3;
