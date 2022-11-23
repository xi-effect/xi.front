import { observer } from 'mobx-react';
import { Box, Grid } from '@mui/material';
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

const Items = observer(() => (
  <Box sx={{ flexGrow: 1, mt: '24px' }}>
    <Grid container spacing={2}>
      {arrayTasks.map((item, index) => (
        <Grid item xs key={index}>
          <Item item={item} index={index} />
        </Grid>
      ))}
    </Grid>
  </Box>
));

export default Items;
