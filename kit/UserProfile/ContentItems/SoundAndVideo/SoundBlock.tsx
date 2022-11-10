import React from 'react';
import { Box, Typography } from '@mui/material';
import SoundDevice from './common/SoundDevice';
import { contentSubTitle, contentTitle } from './common/Styles/styles';

const SoundBlock = () => (
  <Box
    sx={{
      p: '24px',
      width: '100%',
      borderRadius: '8px',
      backgroundColor: 'grayscale.0',
    }}
  >
    <Typography
      sx={{
        mb: '12px',
        ...contentTitle,
      }}
    >
      Звук
    </Typography>

    <Typography
      sx={{
        mb: '32px',
        ...contentSubTitle,
      }}
    >
      Настройте звук перед звонком
    </Typography>

    <Box mb="24px">
      <SoundDevice device="audioinput" />
    </Box>

    <SoundDevice device="audiooutput" />
  </Box>
);

export default SoundBlock;
