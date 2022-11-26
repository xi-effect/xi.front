import { Stack } from '@mui/material';
import { BottomBar } from './BottomBar';
import { UpBar } from './UpBar';

const VideoConference = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '8px',
      bgcolor: 'grayscale.90',
    }}
  >
    <UpBar />
    <BottomBar />
  </Stack>
);

export default VideoConference;
