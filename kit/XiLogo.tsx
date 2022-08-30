/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

type Props = {
  width?: string;
  height?: string;
};

const XiLogo: React.FC<Props> = ({ width = '100px', height = '24px' }) => {
  const router = useRouter();

  return (
    <Box
      width={width}
      height={height}
      sx={{ cursor: 'pointer' }}
      onClick={() => router.push({ pathname: '/' })}
    >
      <Image src="/logo.svg" alt="xi.logo" width={width} height={height} quality={100} />
    </Box>
  );
};

export default XiLogo;
