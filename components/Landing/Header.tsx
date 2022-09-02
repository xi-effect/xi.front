import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import Image from 'next/image';

const Header = () => (
  <Stack
    component="header"
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ width: '100%', height: '96px', p: '16px' }}
  >
    <Box
      sx={{
        pb: '12px',
      }}
    >
      <Image src="/assets/landing/logo-alpha.svg" width={101} height={76} />
    </Box>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <Button
        onClick={() => window.open('https://startupfellows.ru/vacancy/3995')}
        sx={{
          width: '160px',
          height: '64px',
          color: 'gray.100',
          background: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '32px',
          textTransform: 'capitalize',
        }}
      >
        Вакансии
      </Button>
      <Button
        onClick={() => window.open('https://startupfellows.ru/vacancy/3995')}
        sx={{
          width: '151px',
          height: '64px',
          color: 'gray.100',
          background: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '32px',
          textTransform: 'capitalize',
        }}
      >
        Дискорд
      </Button>
    </Stack>
  </Stack>
);

export default Header;
