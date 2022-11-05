import React from 'react';

import { Stack, Typography, Button, useMediaQuery, Theme } from '@mui/material';

import { inject, observer } from 'mobx-react';
import { PasswordChangeDialog } from 'kit/PasswordChangeDialog';
import { EmailChangeDialog } from 'kit/EmailChangeDialog';
import UISt from 'store/ui/uiSt';
import ProfileSt from 'store/user/profileSt';

type SecureT = {
  uiSt: UISt;
  profileSt: ProfileSt;
};

const Secure = inject(
  'profileSt',
  'uiSt',
)(
  observer((props) => {
    const { profileSt, uiSt }: SecureT = props;

    const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));

    return (
      <>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            bgcolor: 'grayscale.0',
            width: '100%',
            borderRadius: '8px',
            padding: '24px',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
            }}
          >
            Пароль
          </Typography>
          <Typography
            sx={{
              mt: '12px',
              color: 'grayscale.40',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              width: '360px',
            }}
          >
            Шифр, используемый для входа
            <br />в аккаунт и подтверждения данных
          </Typography>
          <Button
            onClick={() => uiSt.setDialogs('passwordChange', true)}
            variant="contained"
            sx={{
              width: '160px',
              height: '56px',
              borderRadius: '8px',
              position: mobile700 ? '' : 'absolute',
              top: mobile700 ? '20px' : '24px',
              right: '24px',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              textTransform: 'capitalize',
              ml: mobile700 ? '24px' : '',
              mb: mobile700 ? '24px' : '',
              boxShadow: 0,
              '&:hover': {
                boxShadow: 0,
              },
            }}
          >
            Изменить
          </Button>
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            bgcolor: 'grayscale.0',
            width: '100%',
            borderRadius: '8px',
            padding: '24px',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
            }}
          >
            Почта
          </Typography>
          <Typography
            sx={{
              color: 'grayscale.100',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              position: mobile700 ? '' : 'absolute',
              top: '40px',
              right: '200px',
              mt: mobile700 ? '12px' : '',
            }}
          >
            {profileSt.settings.email}
          </Typography>
          <Typography
            sx={{
              mt: '12px',
              color: 'grayscale.40',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              width: '360px',
            }}
          >
            Электронный ящик
            <br />
            для восстановления доступа
          </Typography>
          <Button
            onClick={() => uiSt.setDialogs('emailChange', true)}
            variant="contained"
            sx={{
              width: '160px',
              height: '56px',
              borderRadius: '8px',
              position: mobile700 ? '' : 'absolute',
              top: '24px',
              right: '24px',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              textTransform: 'capitalize',
              boxShadow: 0,
              ml: mobile700 ? '24px' : '',
              mb: mobile700 ? '24px' : '',
              '&:hover': {
                boxShadow: 0,
              },
            }}
          >
            Изменить
          </Button>
        </Stack>
        <PasswordChangeDialog />
        <EmailChangeDialog />
      </>
    );
  }),
);

export default Secure;
