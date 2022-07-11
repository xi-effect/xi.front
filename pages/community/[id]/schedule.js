import React from 'react';
import moment from 'moment';

import { Stack, Grid, Paper } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';

import Navigation from 'kit/Navigation/Navigation';

import DayPicker from 'components/Community/Schedule/DayPicker';
import Toolbar from 'components/Community/Schedule/Toolbar';
import Calendar from 'components/Community/Schedule/Calendar';


const Schedule = inject('userSt')(
  observer(() => {
    const [type, setType] = React.useState(0);

    const getWeek = () => {
      const today = new Date();
      const numOfWeek = today.getDay();
      console.log('numOfWeek', numOfWeek);
      let weekArray = [];
      if (numOfWeek === 0) {
        for (let i = 0; i !== 7; i += 1) {
          weekArray = [moment().subtract(i, 'day').toDate(), ...weekArray];
        }
        console.log('weekArray1', weekArray);
        return weekArray;
      }
      const lastDaysOfWeek = 7 - numOfWeek;
      for (let i = 1; i !== numOfWeek; i += 1) {
        weekArray = [moment().subtract(i, 'day').toDate(), ...weekArray];
      }
      for (let k = 1; k !== lastDaysOfWeek + 1; k += 1) {
        weekArray = [...weekArray, moment().add(k, 'day').toDate()];
      }
      console.log('weekArray', weekArray);
      return weekArray;
    };

    return (
      <>
        <Head>
          <title>Ξffect</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
          <Grid sx={{ p: 4, width: '100%' }} container spacing={2}>
            <Grid sx={{ width: '100%' }} item xs>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Paper
                  sx={{
                    bgcolor: 'primary.dark',
                    p: 2,
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                  }}>
                  <Toolbar week={getWeek()} type={type} setType={setType} />
                </Paper>
                <Paper
                  sx={{
                    bgcolor: 'primary.dark',
                    p: 2,
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                  }}>
                  <Calendar week={getWeek()} />
                </Paper>
              </Stack>
            </Grid>
            <Grid item xs="auto">
              <Paper sx={{ bgcolor: 'primary.dark', p: 2, height: '100%', borderRadius: 4 }}>
                <DayPicker />
              </Paper>
            </Grid>
          </Grid>
        </Navigation>
      </>
    );
  }),
);

export default Schedule;
