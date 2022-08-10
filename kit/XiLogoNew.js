/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const XiLogo = ({ size = 'm' }) => {
  const router = useRouter();

  return (
    <Box
      onClick={() => {
        router.push({
          pathname: '/',
        });
      }}
      sx={{
        cursor: 'pointer',
        mt: 1,
      }}>
      <Image alt="xilogo" src="/xi.effect.svg" quality={100} width={size === 's' ? 100 : 100} height={size === 's' ? 24 : 24} />
    </Box>
  );
};

export default XiLogo;
