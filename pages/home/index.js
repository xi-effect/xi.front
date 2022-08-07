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
            width: '100%',
            pt: 1,
            ml: 0,
            mr: 0,
            pb: 10,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          Главная
        </Stack>
      </Navigation>
    </>
  )),
);

export default Home;
