/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
// import TextField from '@mui/material/TextField';
import { Socket } from 'socket.io-client';
import VideoLayout from './videoLayout';

type ConfT = {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>,
  roomId?: string | undefined
};

const VideoConference: React.FC<ConfT> = ({ socket, roomId }) => {

  const [toggle, setToggle] = useState<boolean>(false);

  const [audioInputList, setAudioInputList] = useState<Array<string>>([]);
  const [audioOutputList, setAudioOutputList] = useState<Array<string>>([]);
  const [videoInputList, setVideoInputList] = useState<Array<string>>([]);

  const [audioInputDevice, setAudioInputDevice] = useState<string>('');
  const [audioOutputDevice, setAudioOutputDevice] = useState<string>('');
  const [videoInputDevice, setVideoInputDevice] = useState<string>('');

  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
    } else {
      // List cameras and microphones.
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            // console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            if (device.kind === 'audioinput') {
              setAudioInputList(prevState => [...prevState, device.label]);
            }
            if (device.kind === 'audiooutput') {
              setAudioOutputList(prevState => [...prevState, device.label]);
            }
            if (device.kind === 'videoinput') {
              setVideoInputList(prevState => [...prevState, device.label]);
            }
          });

        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    }
  }, []);

  useEffect(() => {
    // console.log('****', audioInputList[0]);
    setAudioInputDevice(audioInputList[0]);
    setAudioOutputDevice(audioOutputList[0]);
    setVideoInputDevice(videoInputList[0]);
  }, [audioInputList, audioOutputList, audioInputList]);

  const handleDeviceChange = event => {
    switch (event.target.name) {
      case 'audioIn': setAudioInputDevice(event.target.value);
        break;
      case 'audioOut': setAudioOutputDevice(event.target.value);
        break;
      case 'videoIn': setVideoInputDevice(event.target.value);
        break;
      default:
    }
  };

  const handleToggleJoinCancel = () => setToggle(prevToggle => !prevToggle);

  return ( !toggle ?
    <Stack
      width="1556px"
    >
      <Typography
        fontSize="32px"
        fontWeight="600"
        paddingBottom="32px"
      >
        {roomId ?
          'Присоединиться к конференции'
          : 'Создать конференцию'
        }</Typography>
      <Stack
      >
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
        >
          <Stack
            bgcolor="#ffffff"
            width="762px"
            height="464px"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Preview</Typography>
          </Stack>

          <Stack
            bgcolor="#ffffff"
            width="762px"
            height="464px"
            borderRadius="8px"
            direction="column"
            justifyContent="space-between"
          >
            <Box bgcolor="#F5F5F5"
                 sx={{
                   mt: '24px',
                   ml: '24px',
                   mr: '24px',
                   height: '76px',
                   borderRadius: '8px'
                 }}>
              {roomId
              ? <>
                  <Typography variant="h6" sx={{ ml: '12px', mt: '8px' }}>Конференция началась</Typography>
                <Typography sx={{ ml: '12px' }}>ID конференции: {` ${roomId}`}</Typography>
                  </>
              : <>
                  <Typography variant="h6" sx={{ ml: '12px', mt: '8px' }}>Конференция не
                    началась</Typography>
                  <Typography sx={{ ml: '12px' }}>Дождитесь организатора</Typography>
                </>
                }
            </Box>
            <Stack sx={{ ml: '24px', mr: '24px' }}>
              <Typography>Камера</Typography>
              <Select
                sx={{ borderRadius: '8px' }}
                name="videoIn"
                value={videoInputDevice}
                onChange={handleDeviceChange}
              >
                {videoInputList.map(d => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ ml: '24px', mr: '24px' }}>
              <Typography>Звук</Typography>
              <Select
                sx={{ mb: '8px', borderRadius: '8px' }}
                name="audioOut"
                value={audioOutputDevice}
                onChange={handleDeviceChange}
              >
                {audioOutputList.map(d => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
              <Select
                sx={{ borderRadius: '8px' }}
                name="audioIn"
                value={audioInputDevice}
                onChange={handleDeviceChange}
              >
                {audioInputList.map(d => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ ml: '24px', mr: '24px', mb: '24px', height: '48px' }}>
              <Button sx={{
                backgroundColor: '#445AFF',
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                color: '#ffffff'
              }}
                      onClick={handleToggleJoinCancel}
              >{roomId ? 'Присоединиться' : 'Создать'}</Button>
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </Stack>
      : <VideoLayout socket={socket} roomId="0xFF" handleToggleJoinCancel={handleToggleJoinCancel}/>
  )
    ;
};

export default VideoConference;
