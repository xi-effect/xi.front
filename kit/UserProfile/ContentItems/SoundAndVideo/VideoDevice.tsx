/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Checkbox, FormControlLabel, IconButton, Stack, Typography } from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { useStore } from 'store/connect';
import DeviceMenu from './DeviceMenu';
import Btn from './Btn';
import { DeviceUnderTestT } from '../SoundAndVideo';

type VideoDeviceT = {
  deviceUnderTest: DeviceUnderTestT;
  setDeviceUnderTest: React.Dispatch<React.SetStateAction<DeviceUnderTestT>>;
};

const VideoDevice = observer((props) => {
  const { deviceUnderTest, setDeviceUnderTest }: VideoDeviceT = props;

  const rootStore = useStore();
  const {
    userMediaSt: {
      stopStream,
      startStream,
      mediaInfo: { devices, error, stream },
    },
  } = rootStore;

  const elementRef = useRef<HTMLVideoElement | null>(null);
  const mediaElement = elementRef.current;

  const [activeDevice, setActiveDevice] = useState<string>('');
  const [showStream, setShowStream] = useState<boolean>(false);
  const [mirrorVideo, setMirrorVideo] = useState<boolean>(true);

  const playMediaDevice = () => {
    setShowStream(true);

    setDeviceUnderTest('videoinput');

    startStream({ enableVideo: true });
  };

  const stopMediaDevice = () => {
    stopStream();

    setShowStream(false);
  };

  const deviceControl = async (id: string) => {
    await startStream({ videoId: id });

    setActiveDevice(devices.filter((d) => d.deviceId === id)[0].label);
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }

    if (mediaElement && deviceUnderTest === 'videoinput') {
      mediaElement.volume = 0.1;
      mediaElement.srcObject = stream;
    }

    if (error || deviceUnderTest !== 'videoinput') setShowStream(false);
  }, [stream, error]);

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
        {!showStream ? <Btn onClick={playMediaDevice}>Проверить</Btn> : ''}

        <video
          autoPlay
          ref={elementRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            display: showStream ? 'block' : 'none',
            transform: mirrorVideo ? 'scale(-1, 1)' : 'scale(1, 1)',
          }}
        />

        {showStream ? (
          <IconButton
            onClick={stopMediaDevice}
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
          fontWeight: 500,
          fontSize: '14px',
          color: 'grayscale.100',
        }}
      >
        Камера
      </Typography>

      <DeviceMenu
        device="videoinput"
        activeDevice={activeDevice}
        deviceControl={deviceControl}
        devices={devices.filter((d) => d.kind === 'videoinput')}
      />
    </Box>
  );
});

export default VideoDevice;
