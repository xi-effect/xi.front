/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Тип
type Props = {
  width?: string;
  height?: string;
};

const XiLogo: React.FC<Props> = ({ width = '100px', height = '24px' }) => {
  const router = useRouter();

  return (
    <Image
      style={{ cursor: 'pointer' }}
      onClick={() => router.push({ pathname: '/' })}
      src="/xieffect.svg"
      alt="xi.logo"
      width={width}
      height={height}
      quality={100}
    />
  );
};

export default XiLogo;
