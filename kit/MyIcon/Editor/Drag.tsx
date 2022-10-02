import { Stack } from '@mui/material';

type Props = {
  active: boolean;
  [key: string]: any;
};

const Drag = ({ active, ...props }: Props) => (
  <Stack
    justifyContent="center"
    alignItems="center"
    sx={{
      width: '40px',
      height: '40px',
      borderRadius: '4px',
      transition: 'background-color 1s ease',
      backgroundColor: active ? '#E6E6E6' : 'transparent',
    }}
    {...props}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="5" width="2" height="2" fill="#333333" />
      <rect x="7" y="9" width="2" height="2" fill="#333333" />
      <rect x="7" y="13" width="2" height="2" fill="#333333" />
      <rect x="11" y="5" width="2" height="2" fill="#333333" />
      <rect x="11" y="9" width="2" height="2" fill="#333333" />
      <rect x="11" y="13" width="2" height="2" fill="#333333" />
    </svg>
  </Stack>
);

export default Drag;
