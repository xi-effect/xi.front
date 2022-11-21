import React from 'react';
import { observer } from 'mobx-react';

import { Dialog, Button, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import { useStore } from 'store/connect';
import Review from '../CommunitySettings/MenuItems/Overview';

const items = ['Обзор', 'Приглашения', 'Участники', 'Роли'];

const DialogSettings = observer(() => {
  const rootStore = useStore();
  const { uiSt } = rootStore;

  const [value, setValue] = React.useState(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
          uiSt.setDialogs('settings', false);
        }}
      >
        Да
      </Button>
      <Button
        onClick={() => {
          closeSnackbar(key);
          uiSt.setDialogs('settings', false);
        }}
      >
        Нет
      </Button>
    </>
  );

  const handleClose = () => {
    enqueueSnackbar('Сохранить новые настройки перед выходом?', {
      persist: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      TransitionComponent: Slide,
      action,
    });
  };

  return (
    <Dialog
      fullScreen
      open={uiSt.dialogs.settings}
      onClose={() => uiSt.setDialogs('settings', false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          height: '100%',
          width: '100%',
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          sx={{
            position: 'fixed',
            width: '34%',
            height: '100vh',
            bgcolor: '#222',
          }}
        >
          <Typography
            variant="subtitle2"
            component="span" // внутри button не может быть div, вёрстка тогда будет не валидной
            sx={{
              p: 2,
              pl: 1,
              width: 178,
              fontSize: 12,
              textAlign: 'left',
              color: 'text.secondary',
            }}
          >
            Настройки сообщества
          </Typography>
          {items.map((item, index) => (
            <Button
              color="inherit"
              sx={{
                width: 178,
                borderRight: value === index ? `4px solid #fff` : 'none',
                borderRadius: 0,
              }}
              onClick={() => setValue(index)}
              key={index}
            >
              <Typography
                variant="h6"
                component="span" // внутри button не может быть div, вёрстка тогда будет не валидной
                sx={{
                  fontSize: 22,
                  width: '100%',
                  textAlign: 'left',
                  color: value === index ? 'text.main' : 'text.secondary',
                }}
              >
                {item}
              </Typography>
            </Button>
          ))}
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            p: 2,
            ml: '34%',
            width: '66%',
            maxWidth: 800,
            minHeight: '100vh',
            height: '100%',
            position: 'relative',
          }}
        >
          <IconButton
            aria-label="закрыть"
            sx={{
              position: 'absolute',
              top: 8,
              right: 16,
            }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          {value === 0 && <Review />}
        </Stack>
      </Stack>
    </Dialog>
  );
});

export default DialogSettings;
