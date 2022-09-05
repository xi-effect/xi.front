import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';

import Navigation from 'kit/Navigation/Navigation';

import Room from 'components/Community/Room';

const RoomPage = inject(
  'rootStore',
  'userSt',
  'userSt',
)(
  observer(({ rootStore }) => {
    const router = useRouter();

    React.useEffect(() => {
      if (router.query.id !== undefined) {
        // do smth
      }
    }, [router.query.id]);

    return (
      <>
        <Head>
          <title>xi.effect</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              width: '100vw',
              ml: 0,
              mr: 0,
              p: 4,
              pb: 10,
              overflow: 'hidden',
            }}
          >
            <Room rootStore={rootStore} />
            {/* 1 */}
          </Stack>
        </Navigation>
      </>
    );
  }),
);

export default RoomPage;
