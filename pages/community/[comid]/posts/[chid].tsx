import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
import React from 'react';
import { Navigation } from 'kit/Navigation';
import { Header, Items } from 'components/Community/Posts';

const Posts = inject('profileSt')(
  observer(() => (
    <LayoutPages noIndex>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            height: '100vh',
            width: '100%',
            p: 4,
            overflow: 'auto',
          }}
        >
          <Header />
          <Items />
        </Stack>
      </Navigation>
    </LayoutPages>
  )),
);

export default Posts;
