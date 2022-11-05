import React from 'react';
import { Box, Typography } from '@mui/material';
import { contentSubTitle, contentTitle } from './common/Styles/styles';
import VideoDevice from './common/VideoDevice';

const VideoBlock = () => (
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
      Камера
    </Typography>

    <Typography
      sx={{
        mb: '24px',
        ...contentSubTitle,
      }}
    >
      Настройте камеру для видеоконференций
    </Typography>

    <VideoDevice />
  </Box>
);

export default VideoBlock;
