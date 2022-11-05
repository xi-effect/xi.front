/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Grid } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Item from './Item';
import { TaskT } from './types';

const arrayTasks: TaskT[] = [
  {
    mark: 3,
    title: 'Отравление',
    description: 'Конспект в тетрадь. Итогом прислать фотографию конспекта.',
  },
  {
    mark: 4,
    title: 'Отравление',
    description: 'Конспект в тетрадь. Итогом прислать фотографию конспекта.',
  },
  {
    mark: 5,
    title: 'Отравление',
    description: 'Конспект в тетрадь. Итогом прислать фотографию конспекта.',
  },
  {
    mark: 2,
    title: 'Отравление',
    description: 'Конспект в тетрадь. Итогом прислать фотографию конспекта.',
  },
  {
    mark: 5,
    title: 'Отравление',
    description: 'Конспект в тетрадь. Итогом прислать фотографию конспекта.',
  },
];

const Items = inject()(
  observer(() => (
    <Box sx={{ flexGrow: 1, mt: '24px' }}>
      <Grid container spacing={2}>
        {arrayTasks.map((item, index) => (
          <Grid item xs key={index}>
            <Item item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )),
);

export default Items;
