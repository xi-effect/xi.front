// @ts-nocheck
import * as React from 'react';
import { Button, Stack, ButtonProps, useMediaQuery, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { inject, observer } from 'mobx-react';

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
  uiSt?: any;
  activeContent: number;
  // eslint-disable-next-line no-unused-vars
  setActiveContent: (activeContent: number) => void;
};

const Menu = inject('uiSt')(
  observer(({ uiSt, activeContent, setActiveContent }: MenuProps) => {
    const { setDialogs } = uiSt;
    const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          mt: '16px',
          width: mobile700 ? '100%' : '220px',
        }}
      >
        {menu.map((item, index) => (
          <ColorButton
            onClick={() => setActiveContent(index)}
            key={index.toString()}
            sx={{
              mt: item.mt,
              color: 'grayscale.100',
              textTransform: 'none',
              backgroundColor: index === activeContent ? 'grayscale.0' : 'transparent',
              '&:hover': {
                backgroundColor: 'grayscale.0',
              },
            }}
          >
            {item.name}
          </ColorButton>
        ))}
        <ColorButton
          onClick={() => setDialogs('exit', true)}
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
      </Stack>
    );
  }),
);

export default Menu;
