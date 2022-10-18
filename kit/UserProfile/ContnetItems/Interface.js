import React, { useEffect } from 'react';
import { Stack, Typography, Radio } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { useLocalStorage } from 'react-use';

const Interface = inject()(
  observer(() => {
    const [valueLS, setValueLS] = useLocalStorage('second-menu-c-upper-items-position-is-vert');

    useEffect(() => {
      if (valueLS === undefined) {
        setValueLS(true);
      }
    }, []);

    return (
      <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
        <Typography sx={{ pl: 1 }}> Отображение закреплённых вкладок в сообществах </Typography>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Radio checked={valueLS} onChange={() => setValueLS(!valueLS)} />
          <Typography> Горизонтально </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Radio checked={!valueLS} onChange={() => setValueLS(!valueLS)} />
          <Typography> Вертикально </Typography>
        </Stack>
      </Stack>
    );
  }),
);

export default Interface;
