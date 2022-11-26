import { Stack } from '@mui/material';
import { CenterTools } from './CenterTools';
import { LeftTools } from './LeftTools';
import { RightTool } from './RightTool';

const UpBar = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      position: 'absolute',
      left: 0,
      top: '16px',
      pl: 2,
      pr: 2,
      width: '100%',
      height: 72,
    }}
  >
    <Stack direction="row" justifyContent="flex-start" alignItems="center">
      <LeftTools />
    </Stack>
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      <CenterTools />
    </Stack>
    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
      <RightTool />
    </Stack>
  </Stack>
);

export default UpBar;
