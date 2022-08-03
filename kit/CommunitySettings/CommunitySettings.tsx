/* eslint-disable react/display-name */
import * as React from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { inject, observer } from 'mobx-react';
import CloseIcon from '@mui/icons-material/Close';
import Menu from './Menu';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (newOpen: boolean) => void;
  uiSt?: any;
}

const CommunitySettings = inject(
  'rootStore',
  'uiSt',
)(
  observer((props: Props) => {
    const { uiSt } = props;

    return (
      <Dialog
        fullScreen
        open={uiSt.dialogs.communitySettings}
        onClose={() => uiSt.setDialogs('communitySettings', false)}
        TransitionComponent={Transition}
      >
        <AppBar elevation={24} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => uiSt.setDialogs('communitySettings', false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Настройки сообщества
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => uiSt.setDialogs('communitySettings', false)}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <Menu />
      </Dialog>
    );
  }),
);

export default CommunitySettings;
