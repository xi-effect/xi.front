import * as React from 'react';
import Head from 'next/head';

import { Divider, Stack, Button, Typography, useMediaQuery } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { getLastCodeFromURL } from 'utils/getLastCodeFromURL';
import { useRouter } from 'next/router';
import XiLogo from 'kit/XiLogo';

const Email = inject('rootStore')(
  observer(({ rootStore }) => {
    const isMobile = useMediaQuery('(max-width: 472px)');
    const router = useRouter();

    const [ok, setOk] = React.useState(null);

    React.useEffect(() => {
      const id = getLastCodeFromURL();
      rootStore.fetchData(`${rootStore.url}/email-confirm/${id}/`, 'POST').then((data) => {
        if (data.a === 'Success') {
          setOk(true);
        }
        if (data.a === 'Invalid code') {
          setOk(false);
        }
      });
    }, []);

    const getStatus = (value) => {
      if (value === true) return 'Почта подтверждена';
      if (value === false) return 'Ошибка подтверждения';
      return 'Ещё чуть-чуть';
    };

    return (
      <>
        <Head>
          <title>xi.effect | почта</title>
        </Head>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          position="relative"
          sx={{
            minHeight: '100vh',
            backgroundColor: 'primary.pale', // Цвета есть в файле theme.js и в дефолтной теме в MUI
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: 'gray.0',
              borderRadius: '16px',
              border: '1px solid rgba(230, 230, 230, 1)',
              height: '224px',
              maxWidth: '420px',
              width: '100%',
              p: '32px',
            }}
          >
            <Stack alignItems="center">
              <XiLogo width="142px" height="24px" />
            </Stack>
            <Typography
              sx={{
                mt: '24px',
                color: 'gray.100',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              {' '}
              {getStatus(ok)}{' '}
            </Typography>
            <Button
              onClick={() => router.push('/')}
              variant="contained"
              sx={{ mt: '32px', width: '356px', height: '48px' }}
            >
              Войти
            </Button>
          </Stack>
          {isMobile && (
            <Divider
              sx={{
                position: 'absolute',
                bottom: '8px',
                width: '134px',
                height: '5px',
                backgroundColor: 'gray.100',
                borderRadius: '100px',
              }}
            />
          )}
        </Stack>
      </>
    );
  }),
);

export default Email;
