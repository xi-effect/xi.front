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
  userSt?: any;
}

const SettingsDialog = inject(
  'rootStore',
  'userSt',
)(
  observer((props: Props) => {
    const { open, setOpen, userSt } = props;

    const handleClose = () => {
      setOpen(false);
    };

    React.useEffect(() => {
      userSt.getAllSettings();
      userSt.getMainSettings();
    }, [userSt]);

    return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar elevation={24} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Настройки пользователя
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <Menu />
      </Dialog>
    );
  }),
);

export default SettingsDialog;
