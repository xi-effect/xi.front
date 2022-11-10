import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';

import React from 'react';
import { Navigation } from 'kit/Navigation';
import { Header, Items, Title } from 'components/Community/Tasks';

const Tasks = inject('profileSt')(
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
          <Title />
          <Header />
          <Items />
        </Stack>
      </Navigation>
    </LayoutPages>
  )),
);

export default Tasks;
