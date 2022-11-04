/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@xieffect/base.icons.add';

const Header = inject()(
  observer(() => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: '100%',
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '32px',
          lineHeight: '40px',
          color: 'grayscale.100',
        }}
      >
        Объявления
      </Typography>
      <Button
        variant="contained"
        sx={{
          ml: '21px',
          width: 118,
          height: 40,
          borderRadius: '4px',
          bgcolor: 'grayscale.0',

          '&:hover': {
            bgcolor: 'grayscale.0',
          },
        }}
      >
        <Add />
        <Typography
          sx={{
            ml: '4px',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'grayscale.100',
          }}
        >
          Создать
        </Typography>
      </Button>
    </Stack>
  )),
);

export default Header;
