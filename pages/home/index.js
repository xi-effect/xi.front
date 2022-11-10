import React from 'react';
import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { Navigation } from 'kit/Navigation';
import LayoutPages from 'kit/LayoutPages';

const Home = inject()(
  observer(() => (
    <LayoutPages title="главная" noIndex>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          sx={{
            width: '100vw',
            ml: 0,
            mr: 0,
            p: 4,
            pb: 10,
            overflow: 'hidden',
          }}
        >
          1
        </Stack>
      </Navigation>
    </LayoutPages>
  )),
);

export default Home;
