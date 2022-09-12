import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { Navigation } from 'kit/Navigation';
import { Header, SubHeader, Content, Breadcrumbs, Slider } from 'components/Community/Post';

const Post = inject('userSt')(
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
          spacing={0}
          sx={{
            height: '100vh',
            width: '100%',
            p: 4,
            overflow: 'auto',
          }}
        >
          <Breadcrumbs />
          <Header />
          <SubHeader />
          <Content />
          <Slider />
        </Stack>
      </Navigation>
    </>
  )),
);

export default Post;
