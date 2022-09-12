/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import MyIcon from 'kit/MyIcon';

type BreadcrumbsT = {
  rootStore?: any;
};

const Breadcrumbs: React.FC<BreadcrumbsT> = inject('rootStore')(
  observer(() => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0.5}
      sx={{
        height: '56px',
        width: '100%',
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
      <MyIcon name="arrow" fontSize={12} color="#697BFF" />
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
  )),
);

export default Breadcrumbs;
