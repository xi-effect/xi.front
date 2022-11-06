import React from 'react';
import { observer } from 'mobx-react';

import {
  Typography,
  Switch,
  Button,
  Dialog,
  DialogContent,
  Stack,
  useMediaQuery,
  DialogActions,
} from '@mui/material';
import { useStore } from 'store/connect';

const DialogPrivacy = observer(() => {
  const rootStore = useStore();
  const { uiSt } = rootStore;

  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={uiSt.dialogs.privacy}
      onClose={() => uiSt.setDialogs('privacy', false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 64,
          width: '100%',
          p: 1,
        }}
      >
        <Typography sx={{ mt: 2, ml: 2, mr: 'auto' }} variant="h5">
          Настройки конфиденциальности
        </Typography>
      </Stack>
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            height: 160,
            width: '100%',
          }}
        >
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Switch />
            <Typography>Разрешить участникам сообщества писать вам личные сообщения</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => uiSt.setDialogs('privacy', false)} variant="contained">
          Готово
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogPrivacy;
