import { Divider } from '@mui/material';
import * as React from 'react';

const DividerComp = () => (
  <div contentEditable={false}>
    <Divider
      sx={{
        mt: '14px',
        height: '1px',
        width: '100%',
        bgcolor: '#D9D9D9',
      }}
    />
  </div>
);
export default DividerComp;
