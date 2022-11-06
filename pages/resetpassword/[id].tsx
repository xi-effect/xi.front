import React from 'react';
import { observer } from 'mobx-react';
import Form from 'components/ResetPassword/Form';
import XiLogo from 'kit/XiLogo';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import LayoutPages from 'kit/LayoutPages';

const ResetPassword = observer(() => {
  const isMobile: boolean = useMediaQuery('(max-width: 472px)');

  return (
    <LayoutPages title="новый пароль">
      <Stack
        justifyContent={isMobile ? 'flex-start' : 'center'}
        alignItems="center"
        sx={{
          width: '100%',
          minHeight: '100vh',
          height: '100%',
        }}
      >
        <Stack
          direction="column"
          padding={isMobile ? '16px 20px 0 20px' : '32px'}
          spacing={2}
          sx={{
            width: isMobile ? '100%' : '420px',
            height: isMobile ? '395px' : '514px',
            borderRadius: '16px',
            border: isMobile ? 'none' : '1px solid #E6E6E6', // grayscale.10
            position: 'relative',
          }}
        >
          <Stack alignItems="center">
            <XiLogo width="142px" height="24px" />
          </Stack>
          <Typography
            variant="h5"
            sx={{
              pb: '16px',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            Новый пароль
          </Typography>
          <Form />
        </Stack>
      </Stack>
    </LayoutPages>
  );
});

export default ResetPassword;
