/* eslint-disable react/display-name */
import * as React from 'react';
import { useStore } from 'store/connect';

import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide, Stack, IconButton, useMediaQuery, Theme, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { Burger } from '@xieffect/base.icons.burger';
import { Close } from '@xieffect/base.icons.close';
import { Arrow } from '@xieffect/base.icons.arrow';
import Menu from './Menu';
import Content from './Content';

const titles = ['Главная', 'Личные данные', 'Безопасность', 'Звук и видео'];

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
  const [openContent, setOpenContent] = React.useState(false);

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
      sx={{ backgroundColor: 'primary.pale' }}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.pale',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: mobile700 ? '8px' : '16px',
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
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            height: '40px',
            width: '100%',
            position: 'relative',
          }}
        >
          {mobile700 && (
            <>
              {!openContent && (
                <IconButton
                  onClick={() => setOpenContent(false)}
                  sx={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Burger />
                </IconButton>
              )}
              {openContent && (
                <IconButton
                  onClick={() => setOpenContent(false)}
                  sx={{
                    width: '40px',
                    height: '40px',
                    transform: 'rotate(180deg)',
                    backgroundColor: 'grayscale.0',
                  }}
                >
                  <Arrow />
                </IconButton>
              )}
            </>
          )}
          {openContent && (
            <Typography
              sx={{
                ml: '8px',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '20px',
              }}
            >
              {titles[activeContent] ?? 'Главная'}
            </Typography>
          )}
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
        <Stack
          direction={mobile700 ? 'column' : 'row'}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            width: '100%',
          }}
        >
          {!openContent && (
            <Menu
              activeContent={activeContent}
              setActiveContent={setActiveContent}
              setOpenContent={setOpenContent}
            />
          )}
          {(openContent || !mobile700) && <Content activeContent={activeContent} />}
        </Stack>
      </Stack>
    </Dialog>
  );
});

export default UserProfile;

