import * as React from 'react';
import Head from 'next/head';

import { Stack, Button, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { getLastCodeFromURL } from 'utils/getLastCodeFromURL';

const Email = inject('rootStore')(
  observer(({ rootStore }) => {
    // const mobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

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
              height: '176px',
              maxWidth: '420px',
              width: '100%',
            }}
            spacing={4}
          >
            <Typography
              sx={{
                color: 'gray.100',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              {' '}
              {getStatus(ok)}{' '}
            </Typography>
            <Button variant="contained" sx={{ width: '356px' }}>
              Перейти на платформу
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }),
);

export default Email;
