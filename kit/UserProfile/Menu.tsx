import * as React from 'react';
import { Button, Stack, ButtonProps, useMediaQuery, Theme, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react';
import { useStore } from 'store/connect';
import { Burger } from '@xieffect/base.icons.burger';
import { Close } from '@xieffect/base.icons.close';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '40px',
  p: '9px 16px 11px 16px',
  borderRadius: '8px',
  textAlign: 'left',
  textTransform: 'capitalize',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '20px',
}));

const menu = [
  {
    mt: '0',
    name: 'Главная',
  },
  {
    mt: '4px',
    name: 'Личные данные',
  },
  {
    mt: '4px',
    name: 'Безопасность',
  },
  {
    mt: '4px',
    name: 'Звук и видео',
  },
];

type MenuProps = {
  activeContent: number;
  setActiveContent: (activeContent: number) => void;
  closeMenu: () => void;
};

const Menu = observer(({ activeContent, setActiveContent, closeMenu }: MenuProps) => {
  const rootStore = useStore();
  const {
    uiSt: { setDialogs },
    userMediaSt: { stopStream },
    uiSt,
  } = rootStore;

  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        mt: '16px',
        width: mobile700 ? '100%' : '220px',
        flexShrink: 0,
      }}
    >
      {mobile700 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', position: 'relative' }}
        >
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

      <Box sx={{ mt: '8px' }}>
        {menu.map((item, index) => (
          <ColorButton
            onClick={() => {
              stopStream();
              setActiveContent(index);
              if (mobile700) closeMenu();
            }}
            key={index.toString()}
            sx={{
              mt: item.mt,
              color: 'grayscale.100',
              paddingLeft: '16px',
              textTransform: 'none',
              backgroundColor:
                index === activeContent && !mobile700 ? 'grayscale.0' : 'transparent',
              '&:hover': {
                backgroundColor: !mobile700 ? 'grayscale.0' : '',
              },
            }}
          >
            {item.name}
          </ColorButton>
        ))}
        <ColorButton
          onClick={() => {
            if (setDialogs) setDialogs('exit', true);
          }}
          sx={{
            mt: '24px',
            color: 'grayscale.100',
            backgroundColor: 'transparent',
            '&:hover': {
              color: 'error.dark',
              backgroundColor: 'error.pale',
            },
          }}
        >
          Выйти
        </ColorButton>
      </Box>
    </Stack>
  );
});

export default Menu;

