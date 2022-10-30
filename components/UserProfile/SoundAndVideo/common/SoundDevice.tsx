/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import { Box, Slider, Stack, Typography } from '@mui/material';
import Btn from './Btn';
import { SliderS } from './Styles/styles';
import useUserMedia from '../hooks/useUserMedia';
import MinVolume from './Icons/MinVolume';
import MaxVolume from './Icons/MaxVolume';
import useSoundMeter from '../hooks/useSoundMeter';
import DeviceMenu from './DeviceMenu';

type DeviceVolumeT = {
  volume: number | null;
  defaultVolume: number;
};

type DeviceT = { device: 'audiooutput' | 'audioinput' };

const SoundDevice: React.FC<DeviceT> = ({ device }) => {
  const [activeDevice, setActiveDevice] = useState<string>('');
  const [mediaStream, setMediaStream] = useState<'play' | 'stop'>('stop');
  const [deviceVolume, setDeviceVolume] = useState<DeviceVolumeT>({
    defaultVolume: 0.1,
    volume: null,
  });

  const mediaElementRef = useRef<HTMLAudioElement | null>(null);

  const { startAnimate, stopAnimate, volumeValue } = useSoundMeter();
  const { devices, changeDevice } = useUserMedia({ device, mediaElementRef });

  const onSliderChange = (e: Event, volume: number) => {
    setDeviceVolume((v) => ({ ...v, volume }));

    if (mediaElementRef.current) mediaElementRef.current.volume = volume;
  };

  const deviceControl = (id: string) => {
    if (mediaStream === 'stop') {
      startAnimate();
      setMediaStream('play');
    }

    changeDevice(id);

    setActiveDevice(devices.filter((d) => d.deviceId === id)[0].label);

    if (mediaElementRef.current && deviceVolume.volume === null)
      mediaElementRef.current.volume = deviceVolume.defaultVolume;
  };

  const mediaFlowControl = (flow: 'play' | 'stop') => {
    setMediaStream(flow);

    if (flow === 'play') {
      startAnimate();
      mediaElementRef.current?.play();
    } else {
      stopAnimate();
      mediaElementRef.current?.pause();
    }

    if (mediaElementRef.current && deviceVolume.volume === null)
      mediaElementRef.current.volume = deviceVolume.defaultVolume;
  };

  return (
    <Box>
      <Typography
        sx={{
          mb: '8px',
          color: '#000',
          fontWeight: 500,
          fontSize: '14px',
        }}
      >
        {device === 'audioinput' ? 'Микрофон' : 'Динамик'}
      </Typography>

      <Stack mb="8px" direction="row" alignItems="center">
        <DeviceMenu
          device={device}
          devices={devices}
          activeDevice={activeDevice}
          deviceControl={deviceControl}
        />

        {mediaStream === 'stop' ? (
          <Btn onClick={() => mediaFlowControl('play')}>Проверить</Btn>
        ) : (
          <Btn sx={{ backgroundColor: '#ff6a6a' }} onClick={() => mediaFlowControl('stop')}>
            Прекратить
          </Btn>
        )}
      </Stack>

      <meter className="sound-meter" value={volumeValue} />

      <Stack mt="10px" direction="row" alignItems="center">
        <Typography
          sx={{
            mr: '18px',
            color: '#000',
            width: '200px',
            fontWeight: 400,
            fontSize: '14px',
          }}
        >
          Громкость
        </Typography>

        <Stack sx={{ width: '100%' }} direction="row" alignItems="center">
          <MinVolume />

          <Slider
            max={1}
            min={0}
            step={0.05}
            sx={SliderS}
            onChange={onSliderChange}
            value={deviceVolume.volume === null ? deviceVolume.defaultVolume : deviceVolume.volume}
          />

          <MaxVolume />
        </Stack>
      </Stack>

      <audio style={{ display: 'none' }} ref={mediaElementRef} />
    </Box>
  );
};

export default SoundDevice;
