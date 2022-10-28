/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { Navigation } from 'kit/Navigation';
import dynamic from 'next/dynamic';

const ContentEditor = dynamic(import('kit/Editor/ContentEditor'), { ssr: false });

const PagePage = inject(
  'rootStore',
  'profileSt',
  'profileSt',
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
              height: '100vh',
              padding: '30px',
              maxWidth: '1060px',
            }}
          >
            <ContentEditor />
          </Box>
        </Navigation>
      </>
    );
  }),
);

export default PagePage;
