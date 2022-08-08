import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Navigation from 'kit/Navigation/Navigation';
import Discussion from 'components/Community/Discussion/Discussion';

const DiscussionPage = inject()(
  observer(() => (
    <>
      <Head>
        <title>Ξffect</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation>
        <Discussion />
      </Navigation>
    </>
  )),
);

export default DiscussionPage;
