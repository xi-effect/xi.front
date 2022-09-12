/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Grid } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Item from './Item';

type ItemsT = {
  rootStore?: any;
};

const Items: React.FC<ItemsT> = inject('rootStore')(
  observer(() => (
    <Box sx={{ flexGrow: 1, mt: '24px' }}>
      <Grid container spacing={2}>
        {Array.from(Array(9)).map((_, index) => (
          <Grid item xs key={index}>
            <Item index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )),
);

export default Items;
