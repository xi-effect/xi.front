import { Typography, Stack } from '@mui/material';
import Image from 'next/image';

const LeftTools = () => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
      width: '100%',
      height: 48,
    }}
  >
    <Image alt="alt" src="/RoundedLogo.svg" quality={100} width={40} height={40} />
    <Typography
      sx={{
        ml: '32px',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '32px',
        color: 'grayscale.0',
      }}
    >
      4Д — БЖ
    </Typography>
    <Typography
      sx={{
        ml: '8px',
        mt: '4px',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: 'grayscale.0',
      }}
    >
      Кастырин И.И.
    </Typography>
  </Stack>
);

export default LeftTools;
