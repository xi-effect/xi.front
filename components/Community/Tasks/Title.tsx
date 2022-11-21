import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';

const Title = observer(() => (
  <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    sx={{
      width: '100%',
    }}
  >
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '32px',
        color: 'grayscale.100',
      }}
    >
      4Д — БЖ
    </Typography>
    <Typography
      sx={{
        mt: '4px',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: 'grayscale.100',
      }}
    >
      Кастырин И.И.
    </Typography>
  </Stack>
));

export default Title;
