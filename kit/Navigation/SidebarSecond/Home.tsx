import React from 'react';

import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { Scroll } from '@xieffect/base.components.scroll';
import { Announce } from '@xieffect/base.icons.announce';
import { Calendar } from '@xieffect/base.icons.calendar';
import { Update } from '../../MyIcon/Update';

const iconsDict = {
  posts: <Announce color="" />,
  schedule: <Calendar color="" />,
  update: <Update color="" />,
};
type MenuItem = {
  id: number;
  type: string;
  name: string;
};

const Channel: React.FC<{ menuItem: MenuItem }> = ({ menuItem }) => {
  const handleChannelClick = () => {
    console.log(`click ${menuItem.name} id: ${menuItem.id}`);
  };

  const isSameChannel = false;

  return (
    <MenuItem
      onClick={handleChannelClick}
      sx={{
        width: 'calc(100% - 16px)',
        borderRadius: 1,
        height: 36,
        ml: 1,
        mr: 1,
        pl: '6px',
        pr: '6px',
        bgcolor: isSameChannel ? 'primary.pale' : null,

        '.MuiListItemText-root': {
          color: isSameChannel ? 'primary.dark' : null,
        },

        svg: {
          fill: isSameChannel ? '#445AFF' : '#000',
        },

        '&:hover': {
          bgcolor: 'primary.pale',

          '.MuiListItemText-root': {
            color: 'primary.dark',
          },

          svg: {
            fill: '#445AFF',
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          width: '24px',
          height: '24px',
          minWidth: '24px !important',
        }}
      >
        {iconsDict[menuItem.type]}
      </ListItemIcon>
      <ListItemText
        disableTypography
        sx={{
          pl: '6px',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '18px',
        }}
      >
        {menuItem.name}
      </ListItemText>
    </MenuItem>
  );
};

const MenuHome = () => {
  const menuItems: MenuItem[] = [
    {
      id: 0,
      type: 'posts',
      name: 'Объявления',
    },
    {
      id: 1,
      type: 'schedule',
      name: 'Календарь',
    },
    {
      id: 2,
      type: 'update',
      name: 'Обновления',
    },
  ];

  return (
    <MenuList
      sx={{
        width: '100%',
        height: '100%',
        pl: 0,
        pr: 0,
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Scroll>
        {menuItems.map((menuItem, index) => (
          <Channel menuItem={menuItem} key={index.toString()} />
        ))}
      </Scroll>
    </MenuList>
  );
};

export default MenuHome;
