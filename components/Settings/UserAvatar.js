import React from 'react';
import { Grid, Divider, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';

const UserAvatar = inject('userSt')(
  observer(() => (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Divider sx={{ height: 1, bgcolor: 'text.dark', width: '100%' }} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: 2, ml: 2 }}
      >
        <Typography> Компактный вариант: </Typography>
      </Grid>
    </Grid>
  )),
);

export default UserAvatar;
