/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import MyIcon from 'kit/MyIcon';
import { SidebarSecond } from './SidebarSecond';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type UpbarT = {
  setOpenMenu: (value) => void;
};

const Upbar = ({ setOpenMenu }: UpbarT) => (
  <Stack
    sx={{
      p: '14px 20px 14px 20px',
      position: 'absolute',
      top: 0,
      height: '52px',
      width: '100%',
      bgcolor: 'gray.0',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      zIndex: 1010,
    }}
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
  >
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      onClick={() => setOpenMenu((prev: boolean) => !prev)}
      sx={{
        height: '32px',
        width: '32px',
        cursor: 'pointer',
      }}
    >
      <MyIcon name="burger" color="#333333" />
    </Stack>
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '22px',
        ml: 1,
      }}
    >
      {' '}
      Задания{' '}
    </Typography>
  </Stack>
);

type startPositionT = {
  x: number;
  y: number;
} | null;

type MobileT = {
  children: React.ReactNode;
};

const Mobile: React.FC<MobileT> = inject()(
  observer(({ children }) => {
    const router = useRouter();

    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

    const startPositinRef = useRef<startPositionT>(null);

    const handleStart = (event: TouchEvent) => {
      console.log('start', event.touches[0]);
      startPositinRef.current = {
        x: 0,
        y: 0,
      };
      startPositinRef.current.x = event.touches[0].pageX;
      startPositinRef.current.y = event.touches[0].pageY;
    };

    const handleEnd = (event: TouchEvent) => {
      console.log('end', event);
    };

    const handleMove = (event: TouchEvent) => {
      console.log('move', event);
    };

    React.useEffect(() => {
      window.addEventListener('touchstart', handleStart);

      return () => window.addEventListener('touchstart', handleStart);
    }, []);

    React.useEffect(() => {
      window.addEventListener('touchend', handleEnd);

      return () => window.addEventListener('touchend', handleEnd);
    }, []);

    React.useEffect(() => {
      window.addEventListener('touchmove', handleMove);

      return () => window.addEventListener('touchmove', handleMove);
    }, []);

    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 0,
          backgroundColor: 'primary.pale',
          overflow: 'hidden',
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: 300,
          }}
        >
          <Box sx={{ width: 64 }}>
            <Sidebar />
          </Box>
          <Box sx={{ width: 236 }}>
            <SidebarSecond />
          </Box>
        </Stack>
        <Stack
          sx={{
            position: 'absolute',
            bgcolor: 'primary.pale',
            height: '100vh',
            width: '100vw',
            zIndex: 1000,
            transform: openMenu ? 'translateX(316px)' : '',
            transition: '0.4s',
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Stack
            sx={{ position: 'relative', height: '100vh', width: '100vw', pt: 6 }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Upbar setOpenMenu={setOpenMenu} />
            {children}
          </Stack>
        </Stack>
      </Stack>
    );
  }),
);

export default Mobile;
