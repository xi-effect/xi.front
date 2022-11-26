import { IconButton, Stack, Tooltip } from '@mui/material';
import { Endcall } from '@xieffect/base.icons.endcall';

const RightTool = () => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
      width: '100%',
      height: 48,
    }}
  >
    <Tooltip title="Выйти из конференции">
      <IconButton
        sx={{
          height: '48px',
          width: '48px',
          color: 'grayscale.0',
          bgcolor: 'error.dark',
          borderRadius: '24px',

          '&:hover': {
            bgcolor: 'error.dark',
          },
        }}
      >
        <Endcall />
      </IconButton>
    </Tooltip>
  </Stack>
);

export default RightTool;
