/* eslint-disable react/display-name */
import * as React from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide, Stack, IconButton, useMediaQuery, Theme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { Burger } from '@xieffect/base.icons.burger';
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

interface UserProfileProps {
  profileSt?: any;
  uiSt?: any;
}

const UserProfile = inject(
  'rootStore',
  'profileSt',
  'uiSt',
)(
  observer((props: UserProfileProps) => {
    const { uiSt, profileSt } = props;
    const { dialogs, setDialogs } = uiSt;

    const [activeContent, setActiveContent] = React.useState(0);

    const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));
    const mobile1400: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));

    const handleClose = () => {
      setDialogs('userProfile', false);
    };

    React.useEffect(() => {
      profileSt.getAllSettings();
      profileSt.getMainSettings();
    }, [profileSt]);

    return (
      <Dialog
        sx={{ backgroundColor: 'primary.pale' }}
        PaperProps={{
          sx: {
            backgroundColor: 'primary.pale',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            p: '16px',
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
            maxWidth: '1226px',
            width: '100%',
          }}
        >
          <Stack
            direction="row"
            justifyContent={mobile700 ? 'space-between' : 'flex-end'}
            alignItems="center"
            sx={{
              width: '100%',
            }}
          >
            {mobile700 && (
              <IconButton
                onClick={() => uiSt.setDialogs('userProfile', false)}
                sx={{
                  width: '40px',
                  height: '40px',
                  bgcolor: 'grayscale.0',
                }}
              >
                <Burger />
              </IconButton>
            )}
            <IconButton
              onClick={() => uiSt.setDialogs('userProfile', false)}
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: 'grayscale.0',
              }}
            >
              <Close />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              width: '100%',
            }}
          >
            <Menu activeContent={activeContent} setActiveContent={setActiveContent} />
            {!mobile700 && <Content activeContent={activeContent} />}
          </Stack>
        </Stack>
      </Dialog>
    );
  }),
);

export default UserProfile;
