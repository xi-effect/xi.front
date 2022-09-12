import { Grid } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from 'kit/Navigation';

import { getLastCodeFromURL } from 'utils/getLastCodeFromURL';

const Community = inject('communitySt')(
  observer(({ communitySt }) => {
    const router = useRouter();

    useEffect(() => {
      const code = getLastCodeFromURL();
      communitySt.getMeta(code);
    }, [router.query.id]);

    return (
      <>
        <Head>
          <title>xi.effect</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
          <Grid sx={{ p: 2 }} container spacing={2}>
            1
          </Grid>
        </Navigation>
      </>
    );
  }),
);

export default Community;
