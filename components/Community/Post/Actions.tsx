/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Stack, Typography } from '@mui/material';
import MyIcon from 'kit/MyIcon';


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
        mt: '12px',
        width: '100%',
      }}
    >
      <Button
        variant="contained"
        sx={{
          width: 173,
          height: 40,
          borderRadius: '4px',
          bgcolor: 'gray.0',

          '&:hover': {
            bgcolor: 'gray.0',
          },
        }}
      >
        <MyIcon name="add" />
        <Typography
          sx={{
            ml: '4px',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'gray.100',
          }}
        >
          Редактировать
        </Typography>
      </Button>
      <Button
        variant="contained"
        sx={{
          ml: '8px',
          width: 118,
          height: 40,
          borderRadius: '4px',
          bgcolor: 'gray.0',

          '&:hover': {
            bgcolor: 'gray.0',
          },
        }}
      >
        <MyIcon name="add" />
        <Typography
          sx={{
            ml: '4px',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'gray.100',
          }}
        >
          Удалить
        </Typography>
      </Button>
    </Stack>
  )),
);

export default Header;
