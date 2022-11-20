import { Stack } from '@mui/material';
import { CenterTools } from './CenterTools';
import { LeftTools } from './LeftTools';

const BottomBar = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      position: 'absolute',
      left: '16px',
      bottom: '16px',
      width: '100%',
      height: 48,
    }}
  >
    <Stack direction="row" justifyContent="flex-start" alignItems="center">
      <LeftTools />
    </Stack>
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      <CenterTools />
    </Stack>
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      1
    </Stack>
  </Stack>
);

export default BottomBar;
