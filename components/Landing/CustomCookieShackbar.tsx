/* eslint-disable react/display-name */
import React, { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import CookieIcon from '@mui/icons-material/Cookie';
import { Stack, Button, Card, Typography } from '@mui/material';
import { useLocalStorage } from 'react-use';

const CustomCookieShackbar = forwardRef<HTMLDivElement, { id: string | number }>((props, ref) => {
  const { closeSnackbar } = useSnackbar();

  // eslint-disable-next-line no-unused-vars
  const [valueLS, setValueLS] = useLocalStorage('cookies-agree');

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
    setValueLS(true);
  }, [closeSnackbar, props.id, setValueLS]);

  return (
    <SnackbarContent ref={ref}>
      <Card
        sx={{
          borderRadius: 8,
          boxShadow: 24,
          height: 64,
          // width: 456,
          bgcolor: 'secondary.dark',
        }}>
        <Stack
          sx={{
            p: 2,
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <CookieIcon fontSize="large" />
          <Typography>Этот сайт использует Печенье (Cookies) </Typography>
          <Button
            sx={{
              width: 128,
              borderRadius: 8,
            }}
            variant="contained"
            onClick={handleDismiss}>
            Подробнее
          </Button>
          <Button
            sx={{
              width: 72,
              borderRadius: 8,
            }}
            variant="contained"
            onClick={handleDismiss}>
            Ок
          </Button>
        </Stack>
      </Card>
    </SnackbarContent>
  );
});

export default CustomCookieShackbar;
