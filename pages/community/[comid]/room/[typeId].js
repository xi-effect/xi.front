import { observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';

import { Navigation } from 'kit/Navigation';
import dynamic from 'next/dynamic';

const Room = dynamic(() => import('components/Community/Room'), { ssr: false });

const RoomPage = observer(() => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id !== undefined) {
      // do smth
    }
  }, [router.query.id]);

  return (
    <LayoutPages noIndex>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100vw',
            ml: 0,
            mr: 0,
            p: 4,
            pb: 10,
            overflow: 'hidden',
          }}
        >
          <Room />
          {/* 1 */}
        </Stack>
      </Navigation>
    </LayoutPages>
  );
});

export default RoomPage;
