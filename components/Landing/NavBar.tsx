import React from 'react';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';

const footerLinks = [
  { label: 'Вакансии', link: '' },
  { label: 'Дискорд', link: 'https://youtu.be/LDU_Txk06tM?t=28' },
  { label: 'Роудмап', link: 'https://youtu.be/dQw4w9WgXcQ' },
];

const NavBar = () => (
  <>
    {footerLinks.map((item) => (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '32px', cursor: 'pointer', width: '131px' }}
        onClick={() => window.open(item.link)}
        key={item.label}
      >
        <Typography
          sx={{
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 400,
            mr: '4px',
          }}
        >
          {item.label}
        </Typography>
        <Image src="/icons/arrow-outward.svg" width={13} height={13} />
      </Stack>
    ))}
  </>
);

export default NavBar;
