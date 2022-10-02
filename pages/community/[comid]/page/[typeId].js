/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { Navigation } from 'kit/Navigation';

const ContentEditor = dynamic(() => import('kit/Editor/index'), {
  ssr: false,
});

const PagePage = inject(
  'rootStore',
  'userSt',
  'userSt',
)(
  observer(() => {
    const router = useRouter();

    React.useEffect(() => {
      if (router.query.id !== undefined) {
        // do smth
      }
    }, [router.query.id]);

    return (
      <>
        <Head>
          <title>Ξffect</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <ContentEditor initialState={null} />
          </Box>
        </Navigation>
      </>
    );
  }),
);

export default PagePage;
