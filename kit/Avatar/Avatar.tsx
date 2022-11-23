import { Stack, Typography } from '@mui/material';

const Avatar = () => {
  const getBgcolor = (v) => {
    if (v === 1) return '#F5F0FF';
    return '#F5F0FF';
  };

  const getTextColor = (v) => {
    if (v === 1) return '#9769FF';
    return '#9769FF';
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 48,
        height: 48,
        borderRadius: 24,
        bgcolor: getBgcolor(1),
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '20px',
          color: getTextColor(1),
        }}
      >
        М
      </Typography>
    </Stack>
  );
};

export default Avatar;
