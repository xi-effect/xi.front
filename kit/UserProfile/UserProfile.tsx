/* eslint-disable react/display-name */
import * as React from 'react';
import { useStore } from 'store/connect';

import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide, Stack, useMediaQuery, Theme, Box } from '@mui/material';
import { observer } from 'mobx-react';
import Menu from './Menu';
import Content from './Content';
import Header from './Header';

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
  const { uiSt, profileSt, userSt } = rootStore;
  const { dialogs } = uiSt;

  const [activeContent, setActiveContent] = React.useState(0);
  const [isOpenMenu, setIsOpenMenu] = React.useState(true);

  const changeMenuStatus = (status: boolean) => {
    setIsOpenMenu(status);
  };

  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));
  const mobile800: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(800));
  const mobile1400: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));

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
          p: mobile700 ? '8px 29px' : `${mobile1400 ? '16px 8px' : '64px 8px'}`,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
      fullScreen
      open={dialogs.userProfile}
      TransitionComponent={Transition}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          // pt: mobile1400 ? '0px' : '64px',
          maxWidth: mobile800 ? '668px' : '1236px',
          width: '100%',
        }}
      >
        <Header
          activeContent={isOpenMenu ? null : activeContent}
          changeMenuStatus={changeMenuStatus}
        />
        <Stack
          direction={mobile700 ? 'column' : 'row'}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            width: '100%',
            mt: mobile700 ? '8px' : '16px',
            position: 'relative',
          }}
        >
          {isOpenMenu && (
            <Menu
              activeContent={activeContent}
              setActiveContent={setActiveContent}
              changeMenuStatus={changeMenuStatus}
            />
          )}
          {(mobile700 && (
            <Box
              sx={{
                position: 'absolute',
                left: isOpenMenu ? '150%' : 0,
                transition: '200ms',
                width: '100%',
                minWidth: 0,
              }}
            >
              <Content activeContent={activeContent} />
            </Box>
          )) ||
            (!mobile700 && <Content activeContent={activeContent} />)}
        </Stack>
      </Stack>
    </Dialog>
  );
});

export default UserProfile;

