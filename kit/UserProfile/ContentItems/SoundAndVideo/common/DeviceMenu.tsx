/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { menuStyles } from './Styles/styles';
import Microphone from './Icons/Microphone';
import Arrow from './Icons/Arrow';
import Speakers from './Icons/Speakers';
import Camera from './Icons/Camera';

type DeviceMenuT = {
  activeDevice: string;
  devices: MediaDeviceInfo[];
  deviceControl: (id: string) => void;
  device: 'audiooutput' | 'audioinput' | 'videoinput';
};

const DeviceMenu: React.FC<DeviceMenuT> = (props) => {
  const { deviceControl, activeDevice, device, devices } = props;

  const listRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onDeviceControlChange = (id: string) => {
    deviceControl(id);
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        ref={listRef}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        direction="row"
        alignItems="center"
        sx={{
          mr: '8px',
          p: '11px 21px',
          flex: '0 1 81%',
          cursor: 'pointer',
          borderRadius: '8px',
          position: 'relative',
          border: '1px solid #E6E6E6',
        }}
      >
        {(device === 'audioinput' && <Microphone />) ||
          (device === 'audiooutput' && <Speakers />) ||
          (device === 'videoinput' && <Camera />)}

        <Typography
          sx={{
            left: '50px',
            fontWeight: 400,
            fontSize: '16px',
            overflow: 'hidden',
            position: 'absolute',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 100px)',
          }}
        >
          {activeDevice ||
            `${
              (device === 'audioinput' && 'Встроенный микрофон') ||
              (device === 'audiooutput' && 'Встроенные динамики') ||
              (device === 'videoinput' && 'Встроенная камера ')
            }`}
        </Typography>

        <Box
          sx={{
            ml: 'auto',
            transition: 'transform 0.2s ease-in-out',
            transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <Arrow />
        </Box>
      </Stack>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        sx={menuStyles(listRef.current?.clientWidth)}
      >
        {devices.map((d) => (
          <MenuItem
            key={d.deviceId}
            onClick={() => onDeviceControlChange(d.deviceId)}
            disabled={activeDevice ? d.label === activeDevice : d.deviceId === 'default'}
            className={
              activeDevice
                ? `${d.label === activeDevice ? 'active' : ''}`
                : `${d.deviceId === 'default' && 'active'}`
            }
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '16px',
                color: '#1B1B1B',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 20px)',
              }}
            >
              {d.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DeviceMenu;
