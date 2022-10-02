import { Typography } from '@mui/material';
import * as React from 'react';

type H1Props = {
  attributes: any;
};

const H1: React.FC<H1Props> = ({ children, attributes }) => (
  <Typography
    variant="h3"
    {...attributes}
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
