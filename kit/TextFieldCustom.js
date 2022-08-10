import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

// eslint-disable-next-line no-empty-pattern
const TextFieldCustom = styled(TextField)(({}) => ({
  marginBottom: '16px',
  backgroundColor: 'background.main',

  // '& label': {
  //   color: theme.palette.common.white,
  // },
  // '& label.Mui-focused': {
  //   color: 'yellow'
  // },
  '& .MuiInputBase-root': {
    height: '56px',
    color: 'gray.100',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px'
  },
  // '& .MuiInputBase-root.MuiFilledInput-root': {
  //   backgroundColor: 'background.main',
  // },
  '& .MuiFormHelperText-root': {
    marginTop: '4px',
    marginLeft: 0,
    fontsize: '14px',
    lineHeight: '16px'
  }
}));

export default TextFieldCustom;
