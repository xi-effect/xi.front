import Head from "next/head";
import { Stack } from "@mui/material";
import React from "react";
import { inject, observer } from "mobx-react";

import Header from 'components/Invite/Header';
import Form from 'components/Invite/Form';

const InviteCommunity = inject()(
  observer(() => (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            backgroundColor: 'background.main',
          }}>
          <Header />
          <Form />
        </Stack>
      </>
    ))
);

export default InviteCommunity;
