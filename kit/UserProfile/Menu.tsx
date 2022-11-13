import * as React from 'react';
import { Button, Stack, ButtonProps, useMediaQuery, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { inject, observer } from 'mobx-react';
import UISt from 'store/ui/uiSt';
import UserMediaSt from '../../store/user/userMediaSt';

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
  uiSt: UISt;
  activeContent: number;
  userMediaSt: UserMediaSt;
  setActiveContent: (activeContent: number) => void;
  setOpenContent: (openContent: boolean) => void;
};

const Menu = inject(
  'uiSt',
  'userMediaSt',
)(
  observer((props) => {
    const {
      activeContent,
      setOpenContent,
      setActiveContent,
      uiSt: { setDialogs },
      userMediaSt: { stopStream },
    }: MenuProps = props;

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
            onClick={() => {
              stopStream();
              setActiveContent(index);
              if (mobile700) setOpenContent(true);
            }}
            key={index.toString()}
            sx={{
              mt: item.mt,
              color: 'grayscale.100',
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
            stopStream();
            setDialogs('exit', true);
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
      </Stack>
    );
  }),
);

export default Menu;
