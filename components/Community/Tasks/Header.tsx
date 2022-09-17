/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Stack, Typography } from '@mui/material';

type HeaderT = {
  rootStore?: any;
};

const Header: React.FC<HeaderT> = inject('rootStore')(
  observer(() => {
    const [tab, setTab] = React.useState(0);

    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          mt: 4,
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '40px',
            color: 'gray.100',
          }}
        >
          Задания
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            ml: '24px',
            bgcolor: 'gray.0',
            height: 40,
            p: '4px',
            borderRadius: '8px',
          }}
        >
          <Button
            onClick={() => setTab(0)}
            variant="contained"
            sx={{
              p: '5px 12px 7px 12px',
              width: 53,
              height: 32,
              borderRadius: '4px',
              bgcolor: tab === 0 ? 'primary.dark' : 'transparent',
              color: tab === 0 ? 'gray.0' : 'gray.100',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',

              '&:hover': {
                bgcolor: tab === 0 ? 'primary.dark' : 'transparent',
                color: tab === 0 ? 'gray.0' : 'gray.100',
              },
            }}
          >
            Все
          </Button>
          <Button
            onClick={() => setTab(1)}
            variant="contained"
            sx={{
              p: '5px 12px 7px 12px',
              width: 155,
              height: 32,
              borderRadius: '4px',
              bgcolor: tab === 1 ? 'primary.dark' : 'transparent',
              color: tab === 1 ? 'gray.0' : 'gray.100',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',

              '&:hover': {
                bgcolor: tab === 1 ? 'primary.dark' : 'transparent',
                color: tab === 1 ? 'gray.0' : 'gray.100',
              },
            }}
          >
            Невыполненные
          </Button>
          <Button
            onClick={() => setTab(2)}
            variant="contained"
            sx={{
              p: '5px 12px 7px 12px',
              width: 135,
              height: 32,
              borderRadius: '4px',
              bgcolor: tab === 2 ? 'primary.dark' : 'transparent',
              color: tab === 2 ? 'gray.0' : 'gray.100',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',

              '&:hover': {
                bgcolor: tab === 2 ? 'primary.dark' : 'transparent',
                color: tab === 2 ? 'gray.0' : 'gray.100',
              },
            }}
          >
            На проверке
          </Button>
          <Button
            onClick={() => setTab(3)}
            variant="contained"
            sx={{
              p: '5px 12px 7px 12px',
              width: 94,
              height: 32,
              borderRadius: '4px',
              bgcolor: tab === 3 ? 'primary.dark' : 'transparent',
              color: tab === 3 ? 'gray.0' : 'gray.100',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',

              '&:hover': {
                bgcolor: tab === 3 ? 'primary.dark' : 'transparent',
                color: tab === 3 ? 'gray.0' : 'gray.100',
              },
            }}
          >
            Оценено
          </Button>
        </Stack>
      </Stack>
    );
  }),
);

export default Header;