/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Stack, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

// @ts-ignore
import XiLogo from 'kit/XiLogo';

const Header: React.FC = () => {
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
    </Stack>
  );
};

export default Header;
