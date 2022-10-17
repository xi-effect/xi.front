import React from 'react';
import { Divider } from '@mui/material';

const DividerComp = () => (
  <div contentEditable={false}>
    <Divider
      sx={{
        mt: '14px',
        height: '1px',
        width: '100%',
        backgroundColor: '#D9D9D9',
      }}
    />
  </div>
);
export default DividerComp;
