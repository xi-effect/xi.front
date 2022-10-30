import React from 'react';
import { Box, Typography } from '@mui/material';
import { contentSubTitle, contentTitle } from './common/Styles/styles';
import VideoDevice from './common/VideoDevice';

const VideoBlock = () => (
  <Box
    sx={{
      p: '24px',
      width: '96.2%',
      borderRadius: '8px',
      backgroundColor: '#fff',
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
