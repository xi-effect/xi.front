import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const TextFieldCustom = styled(TextField)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    '& label': {
        color: theme.palette.common.white,
    },
    '& label.Mui-focused': {
        color: theme.palette.common.white,
    },
    '& .MuiInputBase-root.MuiFilledInput-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    }
}));

export default TextFieldCustom;