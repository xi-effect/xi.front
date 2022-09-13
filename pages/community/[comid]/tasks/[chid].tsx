import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { Navigation } from 'kit/Navigation';
import { Header, Items } from 'components/Community/Tasks';

const Tasks = inject('userSt')(
  observer(() => (
    // const router = useRouter()
    <>
      <Head>
        <title>xi.effect</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            height: '100vh',
            width: '100%',
            p: 4,
            overflow: 'auto',
          }}
        >
          <Header />
          <Items />
        </Stack>
      </Navigation>
    </>
  )),
);

export default Tasks;
