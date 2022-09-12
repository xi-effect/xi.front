/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';

type HeaderT = {
  rootStore?: any;
};

const Header: React.FC<HeaderT> = inject('rootStore')(
  observer(() => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        height: '56px',
        width: '100%',
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          color: 'gray.100',
        }}
      >
        МИПК И.Федорова
      </Typography>
    </Stack>
  )),
);

export default Header;
