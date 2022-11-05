/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Stack } from '@mui/material';

const Content = inject()(
  observer(() => (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        mt: '24px',
        position: 'relative',
        backgroundColor: 'grayscale.0',
        padding: 3,
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          color: 'grayscale.100',
        }}
      >
        Порядок проверки исправности. Сроков первичных средств пожаротушения. Использование
        инженерных защитных сооружений для защиты работающих и населения в чрезвычайных ситуациях.
        Использование индивидуальных средств защиты.
      </Typography>
    </Stack>
  )),
);

export default Content;
