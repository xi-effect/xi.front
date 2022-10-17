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

export const fileMenuStyles = {
  '& .MuiBackdrop-invisible': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiPaper-elevation': {
    p: '24px',
    borderRadius: '8px',
    border: '1px solid #E6E6E6',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  },
};

export const EditorButtonS = (activeBtn: boolean, styles?: CSSProperties) => ({
  ':hover ': {
    backgroundColor: '#E6E6E6',
  },
  borderRadius: '4px',
  transition: 'background-color 0.5s ease',
  backgroundColor: activeBtn ? '#E6E6E6' : 'transparent',
  ...styles,
});

export const FileMenuButtonS = (condition: boolean, styles?: CSSProperties) => ({
  ':hover': {
    backgroundColor: condition ? '#3f3f3f' : 'transparent',
  },
  fontFamily: 'Inter',
  p: '5px 10px',
  border: 'none',
  fontWeight: 500,
  fontSize: '16px',
  boxShadow: 'none',
  borderRadius: '8px',
  textTransform: 'none',
  color: condition ? '#E6E6E6' : '#000',
  transition: 'background-color 0.3s ease-in-out',
  backgroundColor: condition ? '#000' : 'transparent',
  ...styles,
});
