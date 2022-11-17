import React from 'react';
import Menu from '@mui/material/Menu';
import { CreationMenuConfig } from 'kit/Editor/common/menuConfig';
import { menuStyles } from 'kit/Editor/common/styles';
import { EditorsT } from 'kit/Editor/ContentEditor';
import CreationMenuItem from './MenuItem/CreationMenuItem';

type NewItemMenuProps = {
  index: number;
  closeMenu: () => void;
  anchorEl: Element | null;
  setEditors: React.Dispatch<React.SetStateAction<EditorsT[]>>;
};

const CreationMenu: React.FC<NewItemMenuProps> = (props) => {
  const { index, anchorEl, closeMenu, setEditors } = props;

  return (
    <Menu
      open={!!anchorEl}
      onClose={closeMenu}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={menuStyles}
    >
      {CreationMenuConfig.map((elem, i) => (
        <CreationMenuItem
          key={i}
          index={index}
          elem={elem}
          closeMenu={closeMenu}
          setEditors={setEditors}
        />
      ))}
    </Menu>
  );
};

export default React.memo<NewItemMenuProps>(CreationMenu);
