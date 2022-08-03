import React from 'react';

import { Input, Stack, Tooltip, IconButton } from '@mui/material';

import { inject, observer } from 'mobx-react';

import SendIcon from '@mui/icons-material/Send';

const ChatBar = inject(
  'rootStore',
  'uiSt',
  'messageSt',
)(
  observer(({ messageSt }) => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      sx={{
        minHeight: 72,
        pb: 1,
        position: 'fixed',
        left: '336px',
        right: '256px',
        bottom: 0,
        bgcolor: 'background.main',
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          minHeight: 48,
          width: 'calc(100% - 72px)',
          p: 1,
          ml: 2,
          bgcolor: 'grey.800',
          borderRadius: 2,
        }}
      >
        <Input
          sx={{
            width: '100%',
          }}
          type="text"
          value={messageSt.chat.newMessage}
          onChange={(e) => messageSt.setChat('newMessage', e.target.value)}
          multiline
          maxRows={5}
          placeholder="Написать в чат"
          disableUnderline
          fullWidth
        />
      </Stack>
      <Tooltip title="Отправить">
        <IconButton
          color="inherit"
          sx={{
            bgcolor: 'primary.main',
            boxShadow: 6,
            '&:hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )),
);

export default ChatBar;
