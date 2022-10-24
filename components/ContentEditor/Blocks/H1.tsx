import React from 'react';
import { Typography } from '@mui/material';

const H1: React.FC = ({ children }) => (
  <Typography
    variant="h3"
    sx={{
      fontWeight: '600',
      fontSize: '32px',
      lineHeight: '40px',
    }}
  >
    {children}
  </Typography>
);

export default H1;
