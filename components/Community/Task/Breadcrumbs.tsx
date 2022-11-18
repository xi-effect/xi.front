/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import { Arrow } from '@xieffect/base.icons.arrow';

const Breadcrumbs = inject()(
  observer(() => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0.5}
      sx={{
        width: '100%',
        height: '16px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '16px',
          color: 'primary.main',
        }}
      >
        4Д — БЖ
      </Typography>
      <Arrow />
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '16px',
          color: 'primary.main',
        }}
      >
        Задания
      </Typography>
    </Stack>
  )),
);

export default Breadcrumbs;
