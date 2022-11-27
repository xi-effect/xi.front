/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Slider, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { MediaElement } from 'store/user/userMediaSt';
import { useStore } from 'store/connect';
import Btn from './Btn';
import { SliderS } from './Styles/styles';
import MinVolume from './Icons/MinVolume';
import MaxVolume from './Icons/MaxVolume';
import DeviceMenu from './DeviceMenu';
import SoundMeter from './SoundMeter';
import { DeviceUnderTestT } from '../SoundAndVideo';

type DeviceVolumeT = {
  volume: number | null;
  defaultVolume: number;
};

type SoundDeviceT = {
  deviceUnderTest: DeviceUnderTestT;
  device: 'audiooutput' | 'audioinput';
  setDeviceUnderTest: React.Dispatch<React.SetStateAction<DeviceUnderTestT>>;
};

const SoundDevice = observer((props) => {
  const { device, deviceUnderTest, setDeviceUnderTest }: SoundDeviceT = props;

  const rootStore = useStore();
  const {
    userMediaSt: {
      startStream,
      stopStream,
      mediaInfo: { devices, stream, error },
    },
  } = rootStore;

  const elementRef = useRef<HTMLAudioElement | null>(null);
  const mediaElement = elementRef.current;

  const [activeDevice, setActiveDevice] = useState<string>('');
  const [mediaStream, setMediaStream] = useState<'play' | 'stop'>('stop');
  const [deviceVolume, setDeviceVolume] = useState<DeviceVolumeT>({
    defaultVolume: 0.1,
    volume: null,
  });

  const changeDevice = async (id: string) => {
    const element = mediaElement as MediaElement | null;

    if (device === 'audiooutput') {
      element?.setSinkId(id);
    } else {
      await startStream({ audioId: id });
    }
  };

  const onSliderChange = (e: Event, volume: number) => {
    setDeviceVolume((v) => ({ ...v, volume }));

    if (mediaElement) mediaElement.volume = volume;
  };

  const deviceControl = (id: string) => {
    changeDevice(id);

    setActiveDevice(devices.filter((d) => d.deviceId === id)[0].label);

    if (mediaStream === 'stop') setMediaStream('play');
  };

  const playMediaDevice = () => {
    setDeviceUnderTest(device);

    setMediaStream('play');

    startStream({});
  };

  const stopMediaDevice = async () => {
    stopStream();
    setMediaStream('stop');
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }

    if (mediaElement) {
      if (deviceVolume.volume === null) mediaElement.volume = deviceVolume.defaultVolume;

      if (device === deviceUnderTest) mediaElement.srcObject = stream;
    }

    if (error || device !== deviceUnderTest) setMediaStream('stop');
  }, [stream, error]);

  return (
    <Box>
      <Typography
        sx={{
          mb: '8px',
          fontWeight: 500,
          fontSize: '14px',
          color: 'grayscale.100',
        }}
      >
        {device === 'audioinput' ? 'Микрофон' : 'Динамик'}
      </Typography>

      <Stack mb="8px" direction="row" alignItems="center">
        <DeviceMenu
          device={device}
          activeDevice={activeDevice}
          deviceControl={deviceControl}
          devices={devices.filter((d) => d.kind === device)}
        />

        {mediaStream === 'stop' ? (
          <Btn onClick={playMediaDevice}>Проверить</Btn>
        ) : (
          <Btn sx={{ backgroundColor: '#ff6a6a' }} onClick={stopMediaDevice}>
            Прекратить
          </Btn>
        )}
      </Stack>

      <SoundMeter animate={device === deviceUnderTest} />

      <Stack mt="10px" direction="row" alignItems="center">
        <Typography
          sx={{
            mr: '18px',
            width: '200px',
            fontWeight: 400,
            fontSize: '14px',
            color: 'grayscale.100',
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

      <audio autoPlay style={{ display: 'none' }} ref={elementRef} />
    </Box>
  );
});

export default SoundDevice;
