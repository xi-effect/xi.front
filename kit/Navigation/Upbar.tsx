import { useRouter } from 'next/router';

import { Stack, Typography } from '@mui/material';
import { Burger } from '@xieffect/base.icons.burger';

type UpbarT = {
  setMenuPosition: (value) => void;
};

const Upbar = ({ setMenuPosition }: UpbarT) => {
  const router = useRouter();

  const getMainLabel = () => {
    if (router.pathname.includes('task')) return 'Задание';
    if (router.pathname.includes('tasks')) return 'Задания';
    if (router.pathname.includes('post')) return 'Объявление';
    if (router.pathname.includes('posts')) return 'Объявления';
    return 'Главная';
  };

  return (
    <Stack
      sx={{
        p: '14px 20px 14px 20px',
        position: 'absolute',
        top: 0,
        height: '52px',
        width: '100%',
        bgcolor: 'grayscale.0',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        zIndex: 1010,
      }}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        onClick={() =>
          setMenuPosition((prev: number) => {
            if (prev < 158) {
              return 316;
            }
            return 0;
          })
        }
        sx={{
          height: '32px',
          width: '32px',
          cursor: 'pointer',
        }}
      >
        <Burger color="#333333" />
      </Stack>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '22px',
          ml: 1,
        }}
      >
        {getMainLabel()}
      </Typography>
    </Stack>
  );
};

export default Upbar;
