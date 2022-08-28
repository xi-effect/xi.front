/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const XiLogo = () => {
  const router = useRouter();

  return (
    <Box sx={{ cursor: 'pointer' }} onClick={() => router.push({ pathname: '/' })}>
      <Image src="/logo.svg" alt="xi.logo" width="100px" height="24px" quality={100} />
    </Box>
  );
};

export default XiLogo;
