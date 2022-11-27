import React from 'react';
import { observer } from 'mobx-react';

import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogContent,
  Stack,
  useMediaQuery,
  DialogActions,
} from '@mui/material';
import { useStore } from 'store/connect';

const DialogCategoryCreation = observer(() => {
  const rootStore = useStore();
  const { uiSt } = rootStore;
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={uiSt.dialogs.categoryCreation}
      onClose={() => uiSt.setDialogs('categoryCreation', false)}
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
          Создание категории сообщества
        </Typography>
      </Stack>
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            height: 100,
            width: '100%',
          }}
        >
          <FormControl
            fullWidth
            sx={{
              mt: 2,
              pl: 1,
              pr: 1,
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              <Typography sx={{ color: 'text.primary' }}>Название новой категории</Typography>
            </InputLabel>
            <Input sx={{ width: '100%' }} label="Название новой категории" type="text" />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => uiSt.setDialogs('categoryCreation', false)} variant="contained">
          Готово
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogCategoryCreation;
