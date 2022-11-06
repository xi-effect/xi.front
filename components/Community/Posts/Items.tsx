import { observer } from 'mobx-react';
import { Box, Grid } from '@mui/material';
import Item from './Item';

const Items = observer(() => (
  <Box sx={{ flexGrow: 1, mt: '24px' }}>
    <Grid container spacing={2}>
      {Array.from(Array(9)).map((_, index) => (
        <Grid item xs key={index}>
          <Item index={index} />
        </Grid>
      ))}
    </Grid>
  </Box>
));

export default Items;
