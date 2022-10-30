/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import { Box, Checkbox, FormControlLabel, IconButton, Stack, Typography } from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import useUserMedia from '../hooks/useUserMedia';
import DeviceMenu from './DeviceMenu';
import Btn from './Btn';

const VideoDevice = () => {
  const mediaElementRef = useRef<HTMLVideoElement | null>(null);

  const [activeDevice, setActiveDevice] = useState<string>('');
  const [startStream, setStartStream] = useState<boolean>(false);
  const [mirrorVideo, setMirrorVideo] = useState<boolean>(true);
  const { devices, changeDevice } = useUserMedia({ device: 'videoinput', mediaElementRef });

  const onStreamStart = () => {
    setStartStream(true);

    if (mediaElementRef.current) {
      mediaElementRef.current.play();
      mediaElementRef.current.volume = 0.1;
    }
  };

  const onStreamStop = () => {
    setStartStream(false);

    if (mediaElementRef.current) mediaElementRef.current.pause();
  };

  const deviceControl = (id: string) => {
    changeDevice(id);
    setActiveDevice(devices.filter((d) => d.deviceId === id)[0].label);
  };

  return (
    <Box>
      <Stack
        sx={{
          mb: '10px',
          width: '100%',
          height: '300px',
          borderRadius: '8px',
          position: 'relative',
          backgroundColor: '#E6E6E6',
        }}
        alignItems="center"
        justifyContent="center"
      >
        {!startStream ? <Btn onClick={onStreamStart}>Проверить</Btn> : ''}

        <video
          ref={mediaElementRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            display: startStream ? 'block' : 'none',
            transform: mirrorVideo ? 'scale(-1, 1)' : 'scale(1, 1)',
          }}
        />

        {startStream ? (
          <IconButton
            onClick={onStreamStop}
            sx={{
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
          >
            <Close />
          </IconButton>
        ) : (
          ''
        )}
      </Stack>

      <Stack direction="row" alignItems="center" mb="26px">
        <FormControlLabel
          sx={{
            m: 0,
            '& .MuiButtonBase-root': {
              mr: '8px',
              p: 0,
            },
          }}
          label={
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '12px',
              }}
            >
              Отразить зеркально
            </Typography>
          }
          control={
            <Checkbox
              defaultChecked
              onChange={(e) => setMirrorVideo(e.target.checked)}
              icon={
                <Box
                  sx={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    border: '1px solid #E6E6E6',
                  }}
                />
              }
              checkedIcon={
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    border: '1px solid #E6E6E6',
                  }}
                >
                  <Check
                    sx={{
                      width: '17px',
                      height: '17px',
                    }}
                  />
                </Stack>
              }
            />
          }
        />
      </Stack>

      <Typography
        sx={{
          mb: '8px',
          color: '#000',
          fontWeight: 500,
          fontSize: '14px',
        }}
      >
        Камера
      </Typography>

      <DeviceMenu
        devices={devices}
        device="videoinput"
        activeDevice={activeDevice}
        deviceControl={deviceControl}
      />
    </Box>
  );
};

export default VideoDevice;
