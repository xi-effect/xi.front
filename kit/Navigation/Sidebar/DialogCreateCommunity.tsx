import { observer } from 'mobx-react';
import {
  Theme,
  Button,
  Dialog,
  useMediaQuery,
  IconButton,
  Stack,
  Typography,
  Breakpoint,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from 'store/connect';

import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextFieldCustom from 'kit/TextFieldCustom';

const schema = yup
  .object({
    name: yup.string().min(1).max(100).required(),
  })
  .required();

const DialogCreateCommunity = observer(() => {
  const rootStore = useStore();
  const { uiSt, communitiesMenuSt } = rootStore;

  const { dialogs, setDialogs } = uiSt;
  const mobile: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('dl' as Breakpoint),
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const addCtoMenu = ({ code, message, data }) => {
    if (code === 200 && message) {
      communitiesMenuSt.setUserCommunities([
        {
          name: data?.name || 'exe',
          id: data.id,
        },
        ...communitiesMenuSt.userCommunities,
      ]);
      router.push(`/community/${data.id}`);
      uiSt.setDialogs('communityCreation', false);
    }
  };

  const onSubmit = (data) => {
    rootStore.socket?.emit('new-community', { name: data.name }, addCtoMenu);
  };

  return (
    <Dialog
      open={dialogs.communityCreation ?? false}
      onClose={() => setDialogs('communityCreation', false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      fullScreen={!!mobile}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: '420px',
          height: '328px',
          borderRadius: '16px',
          border: '1px solid #E6E6E6',
          bgcolor: 'grayscale.0',
          boxShadow: 'none',
          position: 'relative',
        },
      }}
    >
      <IconButton
        sx={{ color: 'text.secondary', position: 'absolute', top: '12px', right: '12px' }}
        onClick={() => setDialogs('communityCreation', false)}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          p: 4,
          height: '100%',
          width: '100%',
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '24px', lineHeight: '32px' }}>
          Создать сообщество
        </Typography>
        <Typography
          textAlign="center"
          sx={{ mt: '24px', mb: '32px', fontWeight: 400, fontSize: '16px', lineHeight: '20px' }}
        >
          Назовите сообщество. Изменить название можно в любой момент.
        </Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextFieldCustom
              variant="outlined"
              error={!!errors?.name?.type}
              type="text"
              fullWidth
              placeholder="Название сообщества"
              helperText={
                errors?.name?.type === 'max' &&
                'Максимальная длина названия сообщества - 100 символов'
              }
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: '32px',
            width: '356px',
            height: '48px',
            boxShadow: 'none',
          }}
        >
          Создать
        </Button>
      </Stack>
    </Dialog>
  );
});

export default DialogCreateCommunity;
