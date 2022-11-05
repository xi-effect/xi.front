import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
import React from 'react';
import { Navigation } from 'kit/Navigation';

const Lessons = inject('profileSt')(
  observer(() => (
    <LayoutPages noIndex>
      <Navigation>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          sx={{
            p: 2,
          }}
        />
      </Navigation>
    </LayoutPages>
  )),
);

export default Lessons;
