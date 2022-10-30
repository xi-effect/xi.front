export const menuStyles = (width?: number) => ({
  mt: '8px',
  '& .MuiBackdrop-invisible': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiMenuItem-root:hover': {
    backgroundColor: '#ECEFFF',
    color: '#445AFF',
  },
  '& .MuiMenuItem-root.active': {
    backgroundColor: '#ECEFFF',
    color: '#445AFF',
  },
  '& .MuiPaper-elevation': {
    borderRadius: '4px',
    border: '1px solid #E6E6E6',
  },
  '& .MuiMenuItem-root': {
    fontSize: '16px',
    fontWeight: 500,
    color: '#1B1B1B',
    transition: 'background-color 0.2s ease-in, color 0.2s ease-in ',
  },
  '& .MuiMenu-list': {
    p: 0,
    width,
  },
});

export const contentTitle = {
  color: '#000',
  fontWeight: 500,
  fontSize: '24px',

  lineHeight: '32px',
};

export const contentSubTitle = {
  color: '#999',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
};

export const SliderS = {
  m: '0 12px',
  color: '#445AFF',
  borderRadius: '8px',
  '& .MuiSlider-rail': {
    borderRadius: '8px',
    opacity: 1,
    backgroundColor: '#999',
  },
  '& .MuiSlider-thumb': {
    height: '16px',
    width: '16px',
  },
};
