import React from 'react';

import { Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
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

  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

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
          height: mobile700 ? '176px' : '204px',
          borderRadius: '8px',
          padding: '25px 24px',
          mt: mobile700 ? '24px !important' : '32px !important',
        }}
        spacing={3}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: mobile700 ? '20px' : '24px',
            lineHeight: mobile700 ? '24px' : '32px',
          }}
        >
          Ссылка-приглашение
        </Typography>
        <Typography
          sx={{
            color: 'grayscale.40',
            fontWeight: 400,
            fontSize: mobile700 ? '16px' : '20px',
            lineHeight: mobile700 ? '20px' : '24px',
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
            height: mobile700 ? '52px' : '64px',
            padding: `6px 6px 6px ${mobile700 ? '12px' : '20px'}`,
            borderRadius: '8px',
            bgcolor: '#F5F5F5',
            mt: mobile700 ? '20px !important' : '',
          }}
        >
          <Typography
            sx={{
              fontSize: mobile700 ? '15px' : '24px',
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
              width: mobile700 ? '40px' : '52px',
              minWidth: mobile700 ? '40px' : '52px',
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

