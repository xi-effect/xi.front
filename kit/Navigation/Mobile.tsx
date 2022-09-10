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
  setMenuPosition: (value) => void;
};

const Upbar = ({ setMenuPosition }: UpbarT) => (
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
      onClick={() =>
        setMenuPosition((prev: number) => {
          console.log(prev);
          if (prev < 158) {
            return 316;
          }
          if (prev >= 158) {
            return 0;
          }
        })
      }
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

type movePositionT = {
  x: number;
  y: number;
} | null;

type MobileT = {
  children: React.ReactNode;
};

const Mobile: React.FC<MobileT> = inject()(
  observer(({ children }) => {
    const router = useRouter();

    const [menuPosition, setMenuPosition] = React.useState<number>(0);

    React.useEffect(() => {
      let prevX = 0;

      const handleStart = (event: TouchEvent) => {
        prevX = event.touches[0].pageX;
      };

      const handleMove = (event: TouchEvent) => {
        const dif = event.changedTouches[0].pageX - prevX;

        setMenuPosition((prev) => {
          if (prev + dif < 0) return 0;
          if (prev + dif > 316) return 316;
          return prev + dif;
        });

        prevX = event.changedTouches[0].pageX;
      };

      const handleEnd = (event: TouchEvent) => {
        setMenuPosition((prev) => {
          if (prev) {
            if (prev > 180 && prev !== 316) {
              return 316;
            }

            if (prev <= 180 && prev !== 0) {
              return 0;
            }
          }

          return prev;
        });
      };

      window.addEventListener('touchstart', handleStart);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);

      return () => {
        window.removeEventListener('touchstart', handleStart);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
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
            transform: `translateX(${menuPosition}px)`,
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
            <Upbar setMenuPosition={setMenuPosition} />
            {children}
          </Stack>
        </Stack>
      </Stack>
    );
  }),
);

export default Mobile;
