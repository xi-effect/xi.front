import { observer } from 'mobx-react';
import { Stack, Typography, Button, useMediaQuery, Theme } from '@mui/material';
import { File } from '@xieffect/base.icons.file';
import { Clip } from '@xieffect/base.icons.clip';

const Files = observer(() => {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: '100%',
        borderRadius: '8px',
        bgcolor: 'grayscale.0',
        p: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
        sx={{
          height: '32px',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
            color: 'grayscale.100',
          }}
        >
          Решение
        </Typography>
        {!mobile && (
          <Typography
            sx={{
              ml: '4px',
              mb: '4px',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '16px',
              color: 'grayscale.100',
            }}
          >
            до 14 сен 22
          </Typography>
        )}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            ml: 'auto',
            width: 118,
            height: 32,
            background: '#B0F9CE',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
          }}
        >
          Назначено
        </Stack>
      </Stack>
      {mobile && (
        <Typography
          textAlign="left"
          sx={{
            width: '100%',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '16px',
            color: 'grayscale.100',
          }}
        >
          до 14 сен 22
        </Typography>
      )}
      <Stack
        direction={mobile ? 'column' : 'row'}
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1.5}
        sx={{
          width: '100%',
          mt: '24px',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: '100%',
            height: 48,
            textTransform: 'none',
          }}
        >
          <File />
          Прикрепить
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: '100%',
            height: 48,
            textTransform: 'none',
          }}
        >
          <Clip />
          Редактор
        </Button>
      </Stack>
      <Button
        variant="contained"
        sx={{
          mt: '12px',
          width: '100%',
          height: 48,
          textTransform: 'none',
        }}
      >
        Отметить как выполненное
      </Button>
    </Stack>
  );
});

export default Files;
