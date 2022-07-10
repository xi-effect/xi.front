/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import {
  Stack,
} from '@mui/material';

import React from 'react';
import { inject, observer } from 'mobx-react';

// @ts-ignore
import Header from 'components/Signup/Header.tsx';
// @ts-ignore
import Form from 'components/Signup/Form.tsx';


const Signup = inject()(
  observer(() => (
      <>
        <Head>
          <title>Ξffect | Регистрация</title>
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
    )),
);

export default Signup;
