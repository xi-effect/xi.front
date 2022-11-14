import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import { Avatar } from 'kit/Avatar';

const communities = [
  {
    title: 'МИПК И.Федорова',
    avatar: '2',
    categories: ['4Б-жд', '5Б-жд', '6Б-жд', '7Б-жд', '8Б-жд'],
  },
  {
    title: 'МИПК И.Федорова',
    avatar: '2',
    categories: ['4Б-жд', '5Б-жд', '6Б-жд', '7Б-жд', '8Б-жд'],
  },
  {
    title: 'МИПК И.Федорова',
    avatar: '2',
    categories: ['4Б-жд', '5Б-жд', '6Б-жд', '7Б-жд', '8Б-жд'],
  },
  {
    title: 'МИПК И.Федорова',
    avatar: '2',
    categories: ['4Б-жд', '5Б-жд', '6Б-жд', '7Б-жд', '8Б-жд'],
  },
  {
    title: 'МИПК И.Федорова',
    avatar: '2',
    categories: ['4Б-жд', '5Б-жд', '6Б-жд', '7Б-жд', '8Б-жд'],
  },
  {
    title: 'МИПК И.Федорова',
    avatar: '2',
    categories: ['4Б-жд', '5Б-жд', '6Б-жд', '7Б-жд', '8Б-жд'],
  },
];

const Communities = () => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    spacing={4}
    sx={{
      width: '100%',
      height: '248px',
    }}
  >
    {communities.map((item, index) => (
      <Stack
        key={index.toString()}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          width: '365px',
          height: '248px',
          bgcolor: 'grayscale.0',
          borderRadius: '8px',
          p: '16px 12px',
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            height: '64px',
            width: '100%',
            p: '8px 12px',
          }}
        >
          <Avatar />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '28px',
            }}
          >
            {item.title}
          </Typography>
        </Stack>
      </Stack>
    ))}
  </Stack>
);

export default Communities;
