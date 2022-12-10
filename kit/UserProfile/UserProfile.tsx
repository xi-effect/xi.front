/* eslint-disable react/display-name */
import * as React from 'react';
import { useStore } from 'store/connect';

import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide, Stack, useMediaQuery, Theme, Box, IconButton } from '@mui/material';
import { observer } from 'mobx-react';
import { Close } from '@xieffect/base.icons.close';
import Menu from './Menu';
import Content from './Content';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

const UserProfile = observer(() => {
  const rootStore = useStore();
  const {
    uiSt,
    profileSt,
    userSt,
    userMediaSt: { stopStream },
  } = rootStore;
  const { dialogs, setDialogs } = uiSt;

  const [activeContent, setActiveContent] = React.useState(0);
  const [isOpenMenu, setIsOpenMenu] = React.useState(true);

  const openMenu = () => {
    setIsOpenMenu(true);
  };
  const closeMenu = () => {
    console.log('close');
    setIsOpenMenu(false);
  };

  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));
  const mobile800: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(800));
  const mobile1400: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));

  const handleClose = () => {
    setDialogs('userProfile', false);
  };

  React.useEffect(() => {
    profileSt.getProfile();
    userSt.getUser();
  }, [profileSt, userSt]);

  return (
    <Dialog
      sx={{
        backgroundColor: 'primary.pale',
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.pale',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: mobile700 ? '8px 25px' : '16px',
          overflow: 'scroll',
        },
      }}
      fullScreen
      open={dialogs.userProfile}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          pt: mobile1400 ? '0px' : '64px',
          maxWidth: mobile800 ? '668px' : '1236px',
          width: '100%',
          overflowX: 'hidden',
          overflowY: isOpenMenu ? 'hidden' : '',
        }}
      >
        {!mobile700 && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%', height: '40px', position: 'relative' }}
          >
            <IconButton
              onClick={() => {
                stopStream();
                uiSt.setDialogs('userProfile', false);
              }}
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: 'grayscale.0',
                position: 'absolute',
                right: 0,
              }}
            >
              <Close />
            </IconButton>
          </Stack>
        )}
        <Stack
          direction={mobile700 ? 'column' : 'row'}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            width: '100%',
          }}
        >
          {isOpenMenu && (
            <Menu
              activeContent={activeContent}
              setActiveContent={setActiveContent}
              closeMenu={closeMenu}
            />
          )}
          {(mobile700 && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: isOpenMenu ? '100%' : 0,
                transition: '200ms',
                zIndex: 1000000,
                width: '100%',
                minWidth: 0,
                padding: '8px 25px',
              }}
            >
              <Content activeContent={activeContent} openMenu={openMenu} />
            </Box>
          )) ||
            (!mobile700 && <Content activeContent={activeContent} openMenu={openMenu} />)}
        </Stack>
      </Stack>
    </Dialog>
  );
});

export default UserProfile;

