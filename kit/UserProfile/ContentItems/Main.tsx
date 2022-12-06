import React from 'react';

import { Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { observer } from 'mobx-react';
import { useStore } from 'store/connect';

const Main = observer(() => {
  const rootStore = useStore();
  const { profileSt } = rootStore;
  const inviteId: string | null = profileSt.profile.code;
  const gInviteLink: () => string = () => `https://app.xieffect.ru/signup?invite=${inviteId}`;

  const onCopy: () => void = async () => {
    await navigator.clipboard.writeText(gInviteLink());
  };

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
          padding: '25px 24px',
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

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: '100%',
            height: '64px',
            padding: '6px 6px 6px 20px',
            bgcolor: '#F5F5F5',
            borderRadius: '8px',
          }}
        >
          <Typography
            sx={{
              width: 'calc(100% - 65px)',
              fontSize: '24px',
              lineHeight: '42px',
              overflow: 'scroll',
              whiteSpace: 'nowrap',
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: 0,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 0,
              },
            }}
          >
            {gInviteLink()}
          </Typography>
          <Button
            onClick={onCopy}
            sx={{
              width: '52px',
              minWidth: '52px',
              height: '100%',
              bgcolor: '#445AFF',
              borderRadius: '4px',
            }}
          >
            <Image src="/icons/copy.svg" width={26} height={26} />
          </Button>
        </Stack>
      </Stack>
    </>
  );
});

export default Main;

