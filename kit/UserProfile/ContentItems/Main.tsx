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
          height: '204px',
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
            mt: '12px !important',
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
            borderRadius: '8px',
            bgcolor: '#F5F5F5',
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              lineHeight: '44px',
              width: '100%',
              mr: '20px',
              display: 'block',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '3px',
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
              bgcolor: 'primary.dark',
              borderRadius: '4px',
              '&:hover': {
                bgcolor: 'primary.main',
              },
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

