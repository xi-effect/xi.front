import { Divider } from '@mui/material';
import * as React from 'react';

const DividerComp = () => (
  <Divider
    flexItem
    sx={{
      mt: '10px',
      height: '1px',
      width: '100%',
      bgcolor: '#D9D9D9',
      transform: 'translateY(-50%)',
    }}
  />
);
export default DividerComp;
