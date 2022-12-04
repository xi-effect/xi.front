import React from 'react';

import { Stack, Typography } from '@mui/material';

import { observer } from 'mobx-react';
import { useStore } from 'store/connect';

const Main = observer(() => {
  const rootStore = useStore();
  const { profileSt } = rootStore;
  const inviteId: string | null = profileSt.profile.code;
  const gInviteLink: () => string = () => `https://app.xieffect.ru/signup?invite=${inviteId}`;

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          bgcolor: 'grayscale.0',
          width: '100%',
          height: '120px',
          borderRadius: '8px',
          padding: '24px 36px',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
          }}
        >
          Kolipseazer
        </Typography>
      </Stack>

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          bgcolor: 'white',
          width: '100%',
          height: '217px',
          borderRadius: '8px',
          padding: '25px',
          mt: '32px !important',
        }}
        spacing={3}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
          }}
        >
          Ссылка-приглашение
        </Typography>
        <Typography
          sx={{
            color: 'grayscale.40',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px',
          }}
        >
          Пригласите знакомых на платформу
        </Typography>

        <Stack>
          <Typography>{gInviteLink()}</Typography>
        </Stack>
      </Stack>
    </>
  );
});

export default Main;

