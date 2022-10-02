import { Typography } from '@mui/material';

import * as React from 'react';

type TextProps = {
  children: any;
  attributes: any;
};

const Text: React.FC<TextProps> = ({ children, attributes }) => (
  <Typography
    {...attributes}
    sx={{
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '20px',
    }}
  >
    {children}
  </Typography>
);

export default Text;
