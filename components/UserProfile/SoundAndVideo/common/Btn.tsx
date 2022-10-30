import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';

type BtnT = {
  onClick?: () => void;
  sx?: SxProps<Theme>;
};

const Btn: React.FC<BtnT> = ({ children, onClick, sx }) => (
  <Button
    onClick={onClick}
    variant="contained"
    sx={{
      height: '48px',
      width: '160px',
      fontWeight: 500,
      fontSize: '18px',
      borderRadius: '8px',
      backgroundColor: '#445AFF',
      textTransform: 'none',
      ...sx,
    }}
  >
    {children}
  </Button>
);

export default Btn;
