import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'store/connect';
import { useMediaQuery, Theme, Stack, IconButton, Typography } from '@mui/material';
import { Close } from '@xieffect/base.icons.close';
import { Arrow } from '@xieffect/base.icons.arrow';
import { Burger } from '@xieffect/base.icons.burger';

type HeaderProps = {
  activeContent: number | null;
  changeMenuStatus: (boolean) => void;
};

const Header = observer(({ activeContent, changeMenuStatus }: HeaderProps) => {
  const rootStore = useStore();
  const {
    userMediaSt: { stopStream },
    uiSt,
  } = rootStore;

  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

  const settingsTitles = ['Главная', 'Личные данные', 'Безопасность', 'Звук и видео'];
  const getCustomBtn = () => {
    if (activeContent === null)
      return (
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            height: '40px',
            width: '100%',
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Burger />
          </IconButton>
        </Stack>
      );

    return (
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => changeMenuStatus(true)}
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
    );
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%', height: '40px', position: 'relative' }}
    >
      {/* custom btn */}
      {mobile700 && getCustomBtn()}

      {/* close btn */}
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
  );
});

export default Header;

