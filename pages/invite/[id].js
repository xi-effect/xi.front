import { Stack } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';

import Header from 'components/Invite/Header';
import Form from 'components/Invite/Form';
import LayoutPages from 'kit/LayoutPages';

const InviteCommunity = inject()(
  observer(() => (
    <LayoutPages title="приглашение">
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundColor: 'background.main',
        }}
      >
        <Header />
        <Form />
      </Stack>
    </LayoutPages>
  )),
);

export default InviteCommunity;
