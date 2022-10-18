// @ts-nocheck
import * as React from 'react';
import { Button, Stack, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { inject, observer } from 'mobx-react';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '220px',
  height: '40px',
  p: '9px 16px 11px 16px',
  borderRadius: '8px',
  textAlign: 'left',
  textTransform: 'capitalize',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '20px',
}));

type MenuProps = {
  uiSt?: any;
};

const Menu = inject('uiSt')(
  observer(({ uiSt }: MenuProps) => {
    const { setDialogs } = uiSt;
    const activeButton = 0;

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          mt: '56px',
          width: '220px',
        }}
      >
        <ColorButton
          sx={{
            color: 'grayscale.100',
            backgroundColor: activeButton === 0 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              backgroundColor: 'grayscale.0',
            },
          }}
        >
          Главная
        </ColorButton>
        <ColorButton
          sx={{
            mt: '4px',
            color: 'grayscale.100',
            backgroundColor: activeButton === 1 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              backgroundColor: 'grayscale.0',
            },
          }}
        >
          Личные данные
        </ColorButton>
        <ColorButton
          sx={{
            mt: '4px',
            color: 'grayscale.100',
            backgroundColor: activeButton === 2 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              backgroundColor: 'grayscale.0',
            },
          }}
        >
          Безопасность
        </ColorButton>
        <ColorButton
          sx={{
            mt: '4px',
            color: 'grayscale.100',
            backgroundColor: activeButton === 2 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              backgroundColor: 'grayscale.0',
            },
          }}
        >
          Звук и видео
        </ColorButton>
        <ColorButton
          sx={{
            mt: '24px',
            color: 'grayscale.100',
            backgroundColor: activeButton === 2 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              backgroundColor: 'grayscale.0',
            },
          }}
        >
          Плюс
        </ColorButton>
        <ColorButton
          sx={{
            mt: '4px',
            color: 'grayscale.100',
            backgroundColor: activeButton === 2 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              backgroundColor: 'grayscale.0',
            },
          }}
        >
          Бонусы
        </ColorButton>
        <ColorButton
          onClick={() => setDialogs('exit', true)}
          sx={{
            mt: '24px',
            color: 'grayscale.100',
            backgroundColor: activeButton === 2 ? 'grayscale.0' : 'transparent',
            '&:hover': {
              color: 'error.dark',
              backgroundColor: 'error.pale',
            },
          }}
        >
          Выйти
        </ColorButton>
      </Stack>
    );
  }),
);

export default Menu;
