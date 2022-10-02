import { Typography } from '@mui/material';
import * as React from 'react';

type H2Props = {
  attributes: any;
};

const H2: React.FC<H2Props> = ({ children, attributes }) => (
  <Typography
    variant="h4"
    {...attributes}
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
