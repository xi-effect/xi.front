import React from 'react';

import { Grid, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';
import DarkModeToggle from 'react-dark-mode-toggle';

const Customize = inject(
  'rootStore',
  'userSt',
)(
  observer(({ rootStore, userSt }) => {
    const saveNewTheme = () => {
      rootStore
        .fetchData(`${rootStore.url}/settings/`, 'POST', {
          changed: { 'dark-theme': !userSt.settings.darkTheme },
        })
        .then((data) => {
          console.log(data);
          if (data.a) {
            userSt.setSettings('darkTheme', !userSt.settings.darkTheme);
            // enqueueSnackbar("Успешно", {
            //     variant: "success",

            // });
          } else {
            // enqueueSnackbar("Ошибка", {
            //     variant: "error",
            // });
          }
        });
    };

    return (
      <Grid
        spacing={1}
        container
        sx={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Grid item container direction="row" sx={{ m: 1 }}>
          <Grid>
            <DarkModeToggle onChange={saveNewTheme} checked={userSt.settings.darkTheme} size={80} />
          </Grid>
          <Grid sx={{ m: 1 }}>
            <Typography variant="h6"> Тёмная тема </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }),
);

export default Customize;
