import { Stack, useMediaQuery, Theme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { Navigation } from 'kit/Navigation';
import {
  Header,
  SubHeader,
  Content,
  Breadcrumbs,
  Files,
  Timeline,
} from 'components/Community/Task';

const Task = inject('profileSt')(
  observer(() => {
    const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));
    const mobileSide = useMediaQuery((theme: Theme) => theme.breakpoints.down(1920));
    const mobileGrid = useMediaQuery((theme: Theme) => theme.breakpoints.down(1440));

    const getMinWidth = () => {
      if (mobile) return '200px';
      if (mobileSide) return '400px';
      return '508px';
    };

    return (
      <>
        <Head>
          <title>xi.effect</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            sx={{
              height: '100vh',
              width: '100%',
              p: 4,
              overflow: 'auto',
            }}
          >
            <Stack
              direction={mobileGrid ? 'column' : 'row'}
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Breadcrumbs />
                <Header />
                <SubHeader />
                <Content />
              </Stack>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                sx={{
                  width: mobileGrid ? '100%' : '',
                  pt: mobileGrid ? '' : '28px',
                  minWidth: getMinWidth(),
                }}
              >
                <Files />
                <Timeline />
              </Stack>
            </Stack>
          </Stack>
        </Navigation>
      </>
    );
  }),
);

export default Task;
