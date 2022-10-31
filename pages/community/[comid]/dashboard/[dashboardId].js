import { inject, observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
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
      <LayoutPages noIndex>
        <Navigation />
      </LayoutPages>
    );
  }),
);

export default Dashboard;
