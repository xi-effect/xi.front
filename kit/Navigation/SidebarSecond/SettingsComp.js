import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { MenuItem, useMediaQuery, MenuList } from '@mui/material';

const menuSettings = [
  {
    id: 0,
    label: '#Безопасность',
    href: 'secure',
  },
  {
    id: 1,
    label: '#Аватар',
    href: 'useravatar',
  },
  {
    id: 2,
    label: '#Внешний вид',
    href: 'customize',
  },
  {
    id: 3,
    label: '#Интерфейс',
    href: 'interface',
  },
  {
    id: 4,
    label: '#Приглашения',
    href: 'invite',
  },
];

const MenuSettingsComp = inject()(
  observer(() => {
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));

    return (
      <MenuList sx={{ width: '100%' }}>
        {menuSettings.map((item, index) => (
          <MenuItem
            selected={router.pathname.includes(item.href)}
            onClick={() => router.push(`/settings?option=${item.href}`)}
            key={index.toString()}
            sx={{
              '&:hover': {
                bgcolor: '',
              },
              pl: 1,
              pr: 1,
              pt: 0.2,
              pb: 0.2,
              fontSize: mobile ? 18 : 22,
              width: '100%',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          >
            {item.label.toLowerCase()}
          </MenuItem>
        ))}
      </MenuList>
    );
  }),
);

export default MenuSettingsComp;
