import { Button, Stack, Typography } from '@mui/material'; // useMediaQuery
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React from 'react';
import { errorCode } from 'texts/errorMessages/errorMessages';

type ErrorPageProps = {
  code: errorCode;
};

export default function ErrorPage({ code }: ErrorPageProps) {
  // // @ts-ignore
  // const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const router = useRouter();

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 2 }}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        zIndex: 1,
        margin: 0,
        overflow: 'auto',
        height: '100vh',
        bgcolor: 'background.main',
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        Header
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100%',
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{
            mr: 32,
          }}
        >
          <Typography variant="h1">{code}</Typography>
          <Button
            onClick={() => {
              router.push({
                pathname: '/',
              });
            }}
            sx={{
              '&.MuiButton-root': {
                width: '289px',
                height: '60px',
                color: 'text.main',
                bgcolor: 'primary.main',
                borderRadius: '88px',
                boxShadow: 24,
                '&:hover': {
                  bgcolor: 'primary.main',
                },
              },
              mt: '20px',
              mb: '20px',
            }}
          >
            <Typography
              sx={{
                '&.MuiTypography-root': {
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '25px',
                },
                ml: '24px',
                color: 'text.primary',
              }}
            >
              Вернуться на главную
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
