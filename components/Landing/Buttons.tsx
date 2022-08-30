import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Stack, Button } from '@mui/material';

const Buttons = () => {
  const router: NextRouter = useRouter();

  return (
    <Stack
      sx={{
        mt: '82px',
      }}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      <Button
        onClick={() => router.push('/signin')}
        variant="contained"
        sx={{
          fontSize: '24px',
        }}
      >
        Войти
      </Button>
      <Button
        variant="outlined"
        sx={{
          fontSize: '24px',
          width: '224px',
        }}
      >
        Демо-доступ
      </Button>
      <Button
        variant="outlined"
        sx={{
          fontSize: '24px',
          width: '328px',
        }}
      >
        Скачать презентацию
      </Button>
    </Stack>
  );
};

export default Buttons;
