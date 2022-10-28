import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { Navigation } from 'kit/Navigation';

const Dashboard = inject(
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
        <Navigation />
      </>
    );
  }),
);

export default Dashboard;
