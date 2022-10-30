/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import Image from 'next/image';

import { Stack, useMediaQuery, Typography, Box, Paper, Skeleton } from '@mui/material';

import { motion } from 'framer-motion';
import { inject, observer } from 'mobx-react';
import GreenButton from 'kit/GreenButton';

import { getLastCodeFromURL } from 'utils/getLastCodeFromURL';

type CommunityInfo = {
  name: string;
  description: string;
  id: number;
};

type Props = {
  rootStore?: any;
};

type ContentProps = {
  join: boolean;
  auth: boolean;
  comm: CommunityInfo;
  rootStore?: any;
};

const Content: React.FC<ContentProps> = inject('rootStore')(
  observer(({ join, auth, comm, rootStore }) => {
    const router: NextRouter = useRouter();

    const acceptInvite = () => {
      const code = getLastCodeFromURL();
      rootStore.fetchData(`${rootStore.url}/communities/join/${code}/`, 'POST').then(({ id }) => {
        router.push(`/community/${id}`);
      });
    };

    if (!auth) {
      return (
        <>
          <Typography sx={{ mt: 2 }} variant="h5">
            {' '}
            {comm.name}{' '}
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary' }} variant="h6">
            {' '}
            Вы не авторизованы{' '}
          </Typography>
          <Typography textAlign="center" sx={{ color: 'text.secondary' }} variant="subtitle1">
            {' '}
            войдите или зарегистрируйтесь, чтобы принять приглашение{' '}
          </Typography>
          <GreenButton
            sx={{ mt: 3, borderRadius: 4, width: 146, height: 40 }}
            onClick={() => router.push('/')}
          >
            {' '}
            Войти{' '}
          </GreenButton>
        </>
      );
    }

    if (join) {
      return (
        <>
          <Typography sx={{ mt: 2 }} variant="h5">
            {' '}
            {comm.name}{' '}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} variant="subtitle1">
            {' '}
            Вы уже состоите в этом сообществе{' '}
          </Typography>
          <GreenButton
            sx={{ mt: 3, borderRadius: 4, width: 200, height: 40 }}
            onClick={() => router.push(`/community/${comm.id}`)}
          >
            {' '}
            Перейти к сообществу{' '}
          </GreenButton>
        </>
      );
    }

    return (
      <>
        <Typography sx={{ mt: 2 }} variant="h5">
          {' '}
          {comm.name}{' '}
        </Typography>
        <GreenButton sx={{ mt: 3, borderRadius: 4, width: 220, height: 60 }} onClick={acceptInvite}>
          {' '}
          Присоединиться к сообществу{' '}
        </GreenButton>
      </>
    );
  }),
);

const Form: React.FC<Props> = inject('rootStore')(
  observer(({ rootStore }) => {
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    // @ts-ignore
    const mobileImage: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const [join, setJoin] = React.useState<boolean | null>(null);
    const [auth, setAuth] = React.useState<boolean | null>(null);
    const [comm, setComm] = React.useState<CommunityInfo | null>(null);

    const [undef, setUndef] = React.useState<boolean>(false);

    React.useEffect(() => {
      const code = getLastCodeFromURL();
      rootStore.fetchData(`${rootStore.url}/communities/join/${code}/`, 'GET').then((data) => {
        if (data) {
          const { joined, authorized, community } = data;
          setAuth(authorized);
          setJoin(joined);
          setComm(community);
        } else {
          setUndef(true);
        }
      });
    }, []);

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          position: 'relative',
          width: 'calc(100% - 32px)',
          maxWidth: 512,
          zIndex: 0,
        }}
      >
        {!mobile && (
          <Box
            sx={{
              position: 'absolute',
              top: '0px',
              right: '-156px',
              zIndex: -1,
            }}
          >
            <Image
              alt="alt"
              src="/assets/landing/blob1.svg"
              quality={100}
              width={256}
              height={256}
            />
          </Box>
        )}
        {!mobile && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '0px',
              left: '-156px',
              zIndex: -1,
            }}
          >
            <Image
              alt="alt"
              src="/assets/landing/blob3.svg"
              quality={100}
              width={256}
              height={256}
            />
          </Box>
        )}
        <Paper
          elevation={24}
          sx={{
            mt: 4,
            zIndex: 500,
            bgcolor: 'grey.800',
            borderRadius: '20px',
          }}
        >
          <Box>
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Image
                alt="alt"
                src="/assets/app/Invite.svg"
                quality={100}
                width={mobileImage ? 312 : 456}
                height={mobileImage ? 312 : 456}
              />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: '100%',
                  maxWidth: '386px',
                  mt: mobileImage ? '-16px' : '-32px',
                  p: 2,
                }}
              >
                {!undef && join !== null && auth !== null && comm !== null ? (
                  <Content join={join} auth={auth} comm={comm} />
                ) : (
                  <Skeleton sx={{ width: '100%', height: 64 }} />
                )}
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    );
  }),
);

export default Form;
