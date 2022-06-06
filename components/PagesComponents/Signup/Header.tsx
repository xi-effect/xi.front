/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useRouter } from 'next/router';
import { Stack, useMediaQuery, Button } from '@mui/material';
import { motion } from 'framer-motion';

// @ts-ignore
import XiLogo from 'kit/XiLogo';

const Header: React.FC = () => {
  const router = useRouter();
  // @ts-ignore
  const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));

  return (
    <Stack
      component={motion.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: mobile ? '100px' : '110px',
        p: 4,
        width: '100%',
      }}>
      <XiLogo />
      <Button
        aria-label="signin"
        onClick={() => {
          router.push({
            pathname: '/signin',
          });
        }}
        sx={{
          '&.MuiButton-root': {
            fontFamily: 'Open Sans, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '25px',
            width: mobile ? '120px' : '180px',
            height: mobile ? '40px' : '60px',
            color: 'text.primary',
            bgcolor: 'secondary.main',
            borderRadius: mobile ? '62px' : '88px',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          },
        }}>
        Войти
      </Button>
    </Stack>
  );
};

export default Header;
