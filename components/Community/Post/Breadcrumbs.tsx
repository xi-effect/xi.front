/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import { Arrow } from '@xieffect/base.icons.arrow';

const Breadcrumbs = observer(() => (
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
      МИПК И.Федорова
    </Typography>
    <Arrow fontSize={12} color="#697BFF" />
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: 'primary.main',
      }}
    >
      Объявления
    </Typography>
  </Stack>
));

export default Breadcrumbs;
