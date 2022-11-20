import { inject, observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';

import { Navigation } from 'kit/Navigation';
import { VideoConference } from 'components/VideoConference';

const RoomPage = inject(
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
        <Navigation>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              height: '100vh',
              width: '100%',
              p: '8px 16px',
              overflow: 'auto',
            }}
          >
            <VideoConference />
          </Stack>
        </Navigation>
      </LayoutPages>
    );
  }),
);

export default RoomPage;
