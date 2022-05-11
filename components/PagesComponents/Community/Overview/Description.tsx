/* eslint-disable arrow-body-style */
import React from 'react';
import { Stack, Typography } from '@mui/material';

type DescriptionProps = {};

const Description: React.FC<DescriptionProps> = () => {
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
      <Typography variant="h6" component="h1">
        Тестовое сообщество
      </Typography>
      <Typography>
        Commodo ipsum consectetur cillum tempor proident ipsum sunt sunt consequat anim mollit
        occaecat commodo. Consectetur dolore commodo eu minim qui consequat laboris exercitation
        reprehenderit. Nisi est nulla laborum aute tempor. Commodo ipsum consectetur cillum tempor
        proident ipsum sunt sunt consequat anim mollit occaecat commodo. Consectetur dolore commodo
        eu minim qui consequat laboris exercitation reprehenderit. Nisi est nulla laborum aute
        tempor.
      </Typography>
    </Stack>
  );
};

export default Description;
