/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';

const SubHeader = inject()(
  observer(() => (
    <Stack
      sx={{
        width: '100%',
        height: '16px',
        mt: '12px',
      }}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Typography
        textAlign="left"
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16px',
          color: 'grayscale.100',
        }}
      >
        4 мая 2022
      </Typography>
      <Typography
        textAlign="left"
        sx={{
          position: 'relative',
          ml: '11px',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16px',
          color: 'grayscale.100',
          '&:before': {
            content: "''",
            bgcolor: 'grayscale.100',
            position: 'absolute',
            left: '-7px',
            top: '7px',
            height: '3px',
            width: '3px',
            borderRadius: '100%',
          },
        }}
      >
        Юшкевич О.А.
      </Typography>
    </Stack>
  )),
);

export default SubHeader;
