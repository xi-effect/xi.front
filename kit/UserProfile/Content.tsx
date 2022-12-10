/* eslint-disable react/jsx-key */
import * as React from 'react';
import { Stack, useMediaQuery, Theme, IconButton, Typography } from '@mui/material';
import { Arrow } from '@xieffect/base.icons.arrow';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import Main from './ContentItems/Main';
import Account from './ContentItems/Account';
import Secure from './ContentItems/Secure';
import SoundAndVideo from './ContentItems/SoundAndVideo';
import HeaderMobile from './HeaderMobile';

type ContentProps = {
  activeContent: number;
  openMenu: () => void;
};

const Content = ({ activeContent, openMenu }: ContentProps) => {
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
        margin: mobile700 ? '' : `0px ${!mobile1400 ? '46px' : '0px'} 16px 32px`,
        ml: mobile700 ? '0' : `${mobile800 ? '16px' : ''}`,
        width: '100%',
        maxWidth: '928px',
        minWidth: 0,
        mb: '120px',
      }}
    >
      <HeaderMobile>
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
      </HeaderMobile>

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

