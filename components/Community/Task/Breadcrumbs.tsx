import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import { Arrow } from '@xieffect/base.icons.arrow';

const Breadcrumbs = observer(() => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    spacing={0.5}
    sx={{
      width: '100%',
      height: '16px',
    }}
  >
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: 'primary.main',
      }}
    >
      4Д — БЖ
    </Typography>
    <Arrow fontSize={12} color="#697BFF" />
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: 'primary.main',
      }}
    >
      Задания
    </Typography>
  </Stack>
));

export default Breadcrumbs;
