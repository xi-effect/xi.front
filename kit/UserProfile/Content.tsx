/* eslint-disable react/jsx-key */
import * as React from 'react';
import { Stack, useMediaQuery, Theme, IconButton, Typography } from '@mui/material';
import { Arrow } from '@xieffect/base.icons.arrow';
import { Close } from '@xieffect/base.icons.close';
import { useStore } from 'store/connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import Main from './ContentItems/Main';
import Account from './ContentItems/Account';
import Secure from './ContentItems/Secure';
import SoundAndVideo from './ContentItems/SoundAndVideo';

type ContentProps = {
  activeContent: number;
  openMenu: () => void;
};

const Content = ({ activeContent, openMenu }: ContentProps) => {
  const rootStore = useStore();
  const {
    uiSt,
    userMediaSt: { stopStream },
  } = rootStore;

  const mobile1400: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1400));
  const mobile800: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(800));
  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

  const settingsTitles = ['Главная', 'Личные данные', 'Безопасность', 'Звук и видео'];

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{
        margin: mobile700 ? '' : `16px ${!mobile1400 ? '46px' : '0px'} 16px 32px`,
        ml: mobile700 ? '0' : `${mobile800 ? '16px' : ''}`,
        width: '100%',
        maxWidth: '928px',
        minWidth: 0,
        mb: '120px',
      }}
    >
      {/* header in mobile version */}
      {mobile700 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ position: 'relative', width: '100%' }}
        >
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={openMenu}
              sx={{
                width: '40px',
                height: '40px',
                transform: 'rotate(180deg)',
                backgroundColor: 'grayscale.0',
              }}
            >
              <Arrow />
            </IconButton>
            <Typography sx={{ ml: '8px', fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>
              {settingsTitles[activeContent]}
            </Typography>
          </Stack>

          <IconButton
            onClick={() => {
              stopStream();
              uiSt.setDialogs('userProfile', false);
            }}
            sx={{
              width: '40px',
              height: '40px',
              bgcolor: 'grayscale.0',
              position: 'absolute',
              right: 0,
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      )}

      {/* chosen setting's page content */}
      <Box
        sx={{
          mt: mobile700 ? '8px !important' : '',
          width: '100%',
          minWidth: 0,
        }}
      >
        {[<Main />, <Account />, <Secure />, <SoundAndVideo />][activeContent]}
      </Box>
    </Stack>
  );
};

export default Content;

