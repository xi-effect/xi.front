import { Box, Button, Stack, Typography } from '@mui/material'; // useMediaQuery
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React from 'react';
import { errorCode, errorMessages } from 'texts/errorMessages/errorMessages';
import XiLogo from 'kit/XiLogo';

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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 2 }}
      direction="column"
      sx={{
        zIndex: 1,
        margin: 0,
        overflow: 'auto',
        height: '100vh',
        width: '100%',
        paddingX: '100px',
        bgcolor: 'background.main',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '32px',
          marginTop: '111px',
        }}
      >
        <Box style={{ flexGrow: 1 }}>
          <XiLogo />
        </Box>
        <Typography variant='body1' color='gray.80' sx={{ lineHeight: '32px' }}>
          ссылки тут
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="left"
        sx={{
          marginTop: '153px',
          height: '220px'
        }}
      >
        <Typography
          sx={{
            fontSize: '220px',
            lineHeight: '220px',
            fontWeight: 600,
          }}
        >
          {code}
        </Typography>
        <Typography
          sx={{
            fontSize: '32px',
            lineHeight: '42px',
            fontWeight: 400,
            marginTop: '148px',
            marginLeft: '56px',
          }}
        >
          {errorMessages[code]}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        sx={{
          marginTop: '72px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.push('/')}
          sx={{
            height: '64px',
            width: '201px',
            textTransform: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 500,
            }}
          >
            На главную
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
}
