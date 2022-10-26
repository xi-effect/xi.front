import React from 'react';
import { inject, observer } from 'mobx-react';

import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useLocalStorage } from 'react-use';
import { ExitDialog } from '@xieffect/base.dialogs.exit';
import { UserProfile } from 'kit/UserProfile';
import { SidebarSecond } from './SidebarSecond';
import Upbar from './Upbar';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type MobileT = {
  children: React.ReactNode;
  uiSt?: any;
  profileSt?: any;
};

const Mobile: React.FC<MobileT> = inject()(
  observer(({ children }) => {
    const [valueLS, setValueLS] = useLocalStorage('is-main-menu-open');

    const [menuPosition, setMenuPosition] = React.useState<number>(0);

    React.useEffect(() => {
      if (valueLS) return setMenuPosition(316);
      return setMenuPosition(0);
    }, []);

    React.useEffect(() => {
      let prevX = 0;

      const handleStart = (event: TouchEvent) => {
        prevX = event.touches[0].pageX;
      };

      const handleMove = (event: TouchEvent) => {
        const dif = event.changedTouches[0].pageX - prevX;

        setMenuPosition((prev) => {
          if (prev + dif < 0) {
            setValueLS(false);
            return 0;
          }
          if (prev + dif > 316) {
            setValueLS(true);
            return 316;
          }
          return prev + dif;
        });

        prevX = event.changedTouches[0].pageX;
      };

      const widthSwipe = valueLS ? 160 : 200;

      const handleEnd = () => {
        setMenuPosition((prev) => {
          if (prev) {
            if (prev > widthSwipe && prev !== 316) {
              setValueLS(true);
              return 316;
            }

            if (prev <= widthSwipe && prev !== 0) {
              setValueLS(false);
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
        <UserProfile />
        <ExitDialog />
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
          <Box sx={{ width: 236, borderRadius: '8px' }}>
            <SidebarSecond />
          </Box>
        </Stack>
        <Stack
          sx={{
            position: 'absolute',
            bgcolor: 'primary.pale',
            height: '100vh',
            width: '100vw',
            zIndex: 20001,
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
