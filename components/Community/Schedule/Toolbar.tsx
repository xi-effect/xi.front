import React from 'react';
import moment from 'moment';

import { Tooltip, Typography, Stack, Button, Tabs, Tab } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const today = new Date();

type ToolbarProps = {
  week: Array<Date>;
  type: number;
  // eslint-disable-next-line no-unused-vars
  setType: (value: number) => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ week, type, setType }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setType(newValue);
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: '100%',
        height: 48,
      }}
    >
      <Tooltip title={type === 0 ? 'День назад' : 'Неделя назад'}>
        <Button
          variant="contained"
          sx={{
            '&.MuiButtonBase-root': {
              height: 48,
              width: 48,
              minWidth: 48,
              bgcolor: 'secondary.dark',
            },
          }}
          // onClick={() => setCardIndex(cardIndex - 1)}
        >
          <ArrowBackIosNewIcon />
        </Button>
      </Tooltip>
      <Tooltip title={type === 0 ? 'День вперёд' : 'Неделя вперёд'}>
        <Button
          variant="contained"
          sx={{
            '&.MuiButtonBase-root': {
              height: 48,
              width: 48,
              minWidth: 48,
              bgcolor: 'secondary.dark',
            },
            ml: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Tooltip>
      {type === 0 && (
        <>
          <Typography sx={{ pl: 2 }} variant="h5">
            {moment(today).format('D MMM')}
          </Typography>
          <Typography sx={{ pl: 1, color: 'text.secondary' }} variant="h5">
            {moment(today).format('dddd')}
          </Typography>
        </>
      )}
      {type === 1 && (
        <>
          <Typography sx={{ pl: 2 }} variant="h5">
            {moment(week[0]).format('D MMM')}
          </Typography>
          <Typography sx={{ pl: 1, color: 'text.secondary' }} variant="h4">
            -
          </Typography>
          <Typography sx={{ pl: 1 }} variant="h5">
            {moment(week[6]).format('D MMM')}
          </Typography>
        </>
      )}
      <Tabs
        sx={{ ml: 'auto' }}
        indicatorColor="secondary"
        textColor="inherit"
        value={type}
        onChange={handleChange}
        aria-label="tabs"
      >
        <Tab label="День" {...a11yProps(0)} />
        <Tab label="Неделя" {...a11yProps(1)} />
      </Tabs>
    </Stack>
  );
};

export default Toolbar;
