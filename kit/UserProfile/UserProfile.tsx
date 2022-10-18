/* eslint-disable react/display-name */
import * as React from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide, Stack, IconButton } from '@mui/material';
import { inject, observer } from 'mobx-react';
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
  userSt?: any;
  uiSt?: any;
}

const UserProfile = inject(
  'rootStore',
  'userSt',
  'uiSt',
)(
  observer((props: UserProfileProps) => {
    const { uiSt, userSt } = props;
    const { dialogs, setDialogs } = uiSt;

    const handleClose = () => {
      setDialogs('userProfile', false);
    };

    React.useEffect(() => {
      userSt.getAllSettings();
      userSt.getMainSettings();
    }, [userSt]);

    return (
      <Dialog
        sx={{ backgroundColor: 'primary.pale' }}
        PaperProps={{
          sx: {
            backgroundColor: 'primary.pale',
          },
        }}
        fullScreen
        open={dialogs.userProfile}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            pt: '64px',
          }}
        >
          <Menu />
          <Content />
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
      </Dialog>
    );
  }),
);

export default UserProfile;
