import { Box, Typography } from '@mui/material';
import * as React from 'react';

const Quote: React.FC = ({ children }) => (
  <Box
    sx={{
      p: '32px',
      backgroundColor: '#F5F0FF',
    }}
  >
    <Typography
      component="blockquote"
      sx={{
        color: '#333',
        fontSize: '12px',
        mb: '16px',
      }}
    >
      Автор
    </Typography>
    <Typography
      sx={{
        color: '#000',
        fontSize: '16px',
        fontWeight: '500',
      }}
    >
      {children}
    </Typography>
  </Box>
);

export default Quote;
