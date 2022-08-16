import Head from 'next/head';
import React from 'react';
import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Navigation from 'kit/Navigation/Navigation';

const Home = inject()(
  observer(() => (
    <>
      <Head>
        <title>Ξffect | Главная</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          sx={{
            width: '100vw',
            ml: 0,
            mr: 0,
            p: 4,
            pb: 10,
            overflow: 'hidden',
          }}
        >
          1
        </Stack>
      </Navigation>
    </>
  )),
);

export default Home;
