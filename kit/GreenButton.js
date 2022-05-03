import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
    fontFamily: 'Roboto',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '0.46000000834465027px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export default GreenButton;