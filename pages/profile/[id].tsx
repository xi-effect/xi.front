import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import Navigation from 'kit/Navigation/Navigation';
import { Stack, Typography } from '@mui/material';

const Profile = inject('userSt')(
  observer(() => (
    <>
      <Head>
        <title>xi.effect | профиль</title>
        <meta name="robots" content="noindex" />
      </Head>
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
          <Typography
            sx={{
              color: 'error.pale',
              backgroundColor: 'black',
            }}
          >
            1111111111
          </Typography>
        </Stack>
      </Navigation>
    </>
  )),
);

export default Profile;
