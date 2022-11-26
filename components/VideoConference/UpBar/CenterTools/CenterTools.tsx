import { IconButton, Stack, Tooltip } from '@mui/material';
import { Users } from '@xieffect/base.icons.users';
import { Hand } from '@xieffect/base.icons.hand';
import { Chat } from 'kit/MyIcon/Chat';

const BottomBar = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      width: '144px',
      height: '48px',
      bgcolor: 'grayscale.100',
      borderRadius: '24px',
    }}
  >
    <Tooltip title="Список участников">
      <IconButton
        sx={{
          ml: '2px',
          height: '44px',
          width: '44px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '22px',
        }}
      >
        <Users />
      </IconButton>
    </Tooltip>
    <Tooltip title="Открыть чат">
      <IconButton
        sx={{
          mr: '2px',
          height: '44px',
          width: '44px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '22px',
        }}
      >
        <Chat />
      </IconButton>
    </Tooltip>
    <Tooltip title="Поднять руку">
      <IconButton
        sx={{
          mr: '2px',
          height: '44px',
          width: '44px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '22px',
        }}
      >
        <Hand />
      </IconButton>
    </Tooltip>
  </Stack>
);

export default BottomBar;
