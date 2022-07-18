/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';

import {
  Stack,
  useMediaQuery,
  Typography,
  Skeleton,
  Box,
  Paper,
} from '@mui/material';


import { motion } from 'framer-motion';
import { inject, observer } from 'mobx-react';
import GreenButton from 'kit/GreenButton';

type Props = {
  rootStore?: any;
};

const Form: React.FC<Props> = inject('rootStore')(
  observer(({ rootStore }) => {
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    // @ts-ignore
    const mobileImage: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));

    React.useEffect(() => {
      const url = window.location.href;
      const codeArray = url.split('/');
      const code = codeArray[codeArray.length - 1];
      console.log('code', code);
      rootStore.fetchData(`${rootStore.url}/communities/join/${code}/`, "GET")
        .then((data) => {
          console.log(data);
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
        }}>
        {!mobile && (
          <Box
            sx={{
              position: 'absolute',
              top: '0px',
              right: '-156px',
              zIndex: -1,
            }}>
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
            }}>
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
          }}>
          <Box>
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100%' }}>
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
                  pr: 1,
                  pl: 1,
                }}>
                <Skeleton sx={{
                  height: "64px", width: '100%', pl: 2, pr: 2
                }} />
                <Skeleton sx={{
                  height: "64px", width: '70%', pl: 2, pr: 2, borderRadius: 8,
                }} />
                <Typography>
                  1
                </Typography>
                <GreenButton>
                  1
                </GreenButton>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    );
  }),
);

export default Form;
