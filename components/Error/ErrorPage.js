import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function ErrorPage({ imageSrc, textMessage }) {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));
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
      <Stack
        direction={mobile ? 'column-reverse' : 'row'}
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
            mr: mobile ? '0px' : '32px',
          }}
        >
          <Typography
            sx={{
              fontSize: mobile ? '50px !important' : '60px !important',
              fontWeight: 500,
              maxWidth: mobile ? '289px' : '323px',
              lineHeight: '65px',
              letterSpacing: '-0.5px',
              textAlign: mobile ? 'center' : 'left',
            }}
          >
            {textMessage}
          </Typography>
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
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                color: 'text.primary',
                bgcolor: 'secondary.main',
                height: '46px',
                width: '46px',
                borderRadius: '50%',
                ml: 'auto',
                mr: '0px',
              }}
            >
              <ArrowForwardIcon />
            </Stack>
          </Button>
        </Stack>
        <Image alt="alt" src={imageSrc} quality={100} width={512} height={364} />
      </Stack>
    </Stack>
  );
}
