import React from 'react';

import ruLocale from 'date-fns/locale/ru';
import { Box } from '@mui/material';
import CalendarPicker from '@mui/lab/CalendarPicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const locale = 'ru';

const localeMap = {
  ru: ruLocale,
};

type DayPickerProps = {};

const DayPicker: React.FC<DayPickerProps> = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
      <Box>
        <CalendarPicker
        date={date} onChange={(newDate: Date) => setDate(newDate)} />
      </Box>
    </LocalizationProvider>
  );
};

export default DayPicker;
