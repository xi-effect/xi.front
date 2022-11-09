import { Stack, Typography, useMediaQuery, } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import Form from 'components/ResetPassword/Email';
import LayoutPages from 'kit/LayoutPages';
import XiLogo from 'kit/XiLogo';

const PassResetEmail = inject('authorizationSt')(
  observer(({authorizationSt}) => {
    const {passwordReset} = authorizationSt;
    
    const isMobile = useMediaQuery('(max-width: 472px)');
    
    return (
      <LayoutPages title="восстановление пароля">
        <Stack
          justifyContent={isMobile ? 'flex-start' : 'center'}
          alignItems="center"
          width="100%"
          minHeight="100vh"
        >
          <Stack
            direction="column"
            border={isMobile ? 'none' : '1px solid #E6E6E6'}
            borderRadius="16px"
            padding={`${isMobile ? '65px' : '32px'} 32px 32px 32px`}
            height="514px"
            width={isMobile ? '100%' : '420px'}
            spacing={2}
          >
            <Stack alignItems="center">
              <XiLogo width="142px" height="24px"/>
            </Stack>
            <Typography
              component="h1"
              variant="h5"
              textAlign="center"
              sx={{
                pb: '16px',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              {passwordReset.emailResetOk ? 'Письмо отправлено' : 'Восстановление'}
            </Typography>
            <Form/>
          </Stack>
        </Stack>
      </LayoutPages>
    );
  }),
);

export default PassResetEmail;
