import React from 'react';
import moment from 'moment';
import { Box, Stack, Typography } from '@mui/material';

const rangeTimeline = (f: string, l: string) => {
  const firstNumArray = f.split(':');
  const lastNumArray = l.split(':');
  const firstNumValue = Number(firstNumArray[0]);
  const lastNumValue = Number(lastNumArray[0]);
  const newArray: Array<string> = [];
  for (let i = firstNumValue; i < lastNumValue + 1; i += 1) {
    newArray.push(`${i}:00`);
  }
  console.log('newArray', newArray);
  return newArray;
};

// const timeline = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', ''];

const Time: React.FC = () => (
  <Stack sx={{ mt: 8 }} direction="column" justifyContent="flex-start" alignItems="center">
    {rangeTimeline('8:00', '18:00').map((item, index) => (
      <Box sx={{ minHeight: '64px' }} key={index.toString()}>
        {item}
      </Box>
    ))}
  </Stack>
);

type CalendarProps = {
  week: Array<Date>;
};

const Calendar: React.FC<CalendarProps> = ({ week }) => (
  <Stack
    sx={{
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }}
    direction="row"
    justifyContent="center"
    alignItems="flex-start"
  >
    <Time />
    <Stack
      sx={{ width: '100%', overflow: 'auto' }}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Stack sx={{ width: '100%' }} direction="row" justifyContent="flex-start" alignItems="center">
        {week.map((day, index) => (
          <Stack
            sx={{
              minWidth: '150px',
              width: '100%',
              height: '64px',
              border: '1px solid',
              borderTopLeftRadius: index === 0 ? 16 : 0,
              borderTopRightRadius: index === 6 ? 16 : 0,
            }}
            key={index.toString()}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0.4}
          >
            <Typography>{moment(day).format('D MMM')}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{moment(day).format('dddd')}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack sx={{ width: '100%' }} direction="row" justifyContent="flex-start" alignItems="center">
        {week.map((day, index) => (
          <Stack
            sx={{
              minWidth: '150px',
              width: '100%',
              height: '64px',
              border: '1px solid',
            }}
            key={index.toString()}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0.4}
          >
            1
          </Stack>
        ))}
      </Stack>
    </Stack>
  </Stack>
);

export default Calendar;
