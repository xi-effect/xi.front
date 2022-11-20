import { Stack } from '@mui/material';

const UpBar = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      width: '100%',
      height: 48,
      borderRadius: 24,
    }}
  >
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      1
    </Stack>
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      1
    </Stack>
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      1
    </Stack>
  </Stack>
);

export default UpBar;
