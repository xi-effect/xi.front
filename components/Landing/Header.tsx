import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import { Box, Stack, Button, useMediaQuery, Theme } from '@mui/material';
import Image from 'next/image';

const button1Width = {
  min480: '99px',
  min1000: '133px',
  min1336: '133px',
  min1920: '160px',
  max1920: '160px',
};

const button2Width = {
  min480: '93px',
  min1000: '126px',
  min1336: '126px',
  min1920: '151px',
  max1920: '151px',
};

const buttonsHeight = {
  min480: '40px',
  min1000: '48px',
  min1336: '48px',
  min1920: '64px',
  max1920: '64px',
};

const buttonsFontSize = {
  min480: '16px',
  min1000: '20px',
  min1336: '20px',
  min1920: '24px',
  max1920: '24px',
};

const buttonsLineHeight = {
  min480: '24px',
  min1000: '24px',
  min1336: '24px',
  min1920: '32px',
  max1920: '32px',
};

const Header = () => {
  const router: NextRouter = useRouter();

  const mobile1920: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1920));
  const mobile1336: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1336));
  const mobile1000: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1000));
  const mobilesm: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const getDeviceWidth = () => {
    if (mobilesm) return 'min480';
    if (mobile1000) return 'min1000';
    if (mobile1336) return 'min1336';
    if (mobile1920) return 'min1920';
    return 'max1920';
  };

  const deviceWidth = getDeviceWidth();

  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%', height: '96px', p: mobile1336 ? '4px' : '16px' }}
    >
      <Box
        onClick={() => router.push('/')}
        sx={{
          pb: '12px',
        }}
      >
        <Image
          src="/assets/landing/logo-alpha.svg"
          width={mobile1336 ? 87 : 101}
          height={mobile1336 ? 62 : 76}
        />
      </Box>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
        <Button
          onClick={() => window.open('https://startupfellows.ru/vacancy/3995')}
          sx={{
            width: button1Width[deviceWidth],
            height: buttonsHeight[deviceWidth],
            color: 'gray.100',
            background: '#FFFFFF',
            borderRadius: '12px',
            fontWeight: '400',
            fontSize: buttonsFontSize[deviceWidth],
            lineHeight: buttonsLineHeight[deviceWidth],
            textTransform: 'capitalize',
            '&:hover': {
              color: 'gray.0',
              bgcolor: 'secondary.dark',
            },
          }}
        >
          Вакансии
        </Button>
        <Button
          onClick={() => window.open('https://discord.gg/aNQfXXb')}
          sx={{
            width: button2Width[deviceWidth],
            height: buttonsHeight[deviceWidth],
            color: 'gray.100',
            background: '#FFFFFF',
            borderRadius: '12px',
            fontWeight: '400',
            fontSize: buttonsFontSize[deviceWidth],
            lineHeight: buttonsLineHeight[deviceWidth],
            textTransform: 'capitalize',
            '&:hover': {
              color: 'gray.0',
              bgcolor: 'secondary.dark',
            },
          }}
        >
          Дискорд
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
