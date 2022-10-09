import { CSSProperties } from '@mui/styles';

export const menuStyles = {
  ml: '8px',
  '& .MuiBackdrop-invisible': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiMenuItem-root:hover': {
    backgroundColor: '#ECEFFF',
    borderRadius: '4px',

    '& .MuiTypography-body1': {
      color: '#445AFF',
    },
  },
  '& .MuiMenu-list': {
    p: '8px',
  },
  '& .MuiPaper-elevation': {
    boxShadow: '0',
    borderRadius: '8px',
    border: '1px solid #E6E6E6',
  },
  '& .MuiMenuItem-root': {
    transition: 'background-color 0.2s ease-in, color 0.2s ease-in ',
  },
};

export const menuDelete = {
  '& .MuiMenuItem-root:hover': {
    backgroundColor: '#FEEAEA',
    borderRadius: '4px',

    '& .MuiTypography-body1': {
      color: '#F42D2D',
    },
  },
};

export const ButtonStyles = (activeBtn: boolean, styles: CSSProperties) => ({
  '&:hover ': {
    backgroundColor: '#E6E6E6',
  },
  borderRadius: '4px',
  transition: 'background-color 0.5s ease',
  backgroundColor: activeBtn ? '#E6E6E6' : 'transparent',
  ...styles,
});
