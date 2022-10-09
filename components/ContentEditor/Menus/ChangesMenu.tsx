import React from 'react';
import { Menu } from '@mui/material';
import { menuDelete, menuStyles } from 'kit/Editor/common/styles';
import { ChangeEditorsT, EditorsT } from 'kit/Editor/ContentEditor';
import ChangesMenuItem from './MenuItem/ChangesMenuItem';

type ItemMenuProps = {
  index: number;
  editors: EditorsT[];
  closeMenu: () => void;
  anchorEl: Element | null;
  changeEditors: ChangeEditorsT;
};

const ChangesMenu: React.FC<ItemMenuProps> = (props) => {
  const { editors, closeMenu, anchorEl, index, changeEditors } = props;

  const MoveUp = () => {
    changeEditors({ endIndex: index, startIndex: index - 1 });
    closeMenu();
  };

  const MoveDown = () => {
    changeEditors({ endIndex: index, startIndex: index + 1 });
    closeMenu();
  };

  const Delete = () => {
    changeEditors(null)(index);
    closeMenu();
  };

  return (
    <Menu
      open={!!anchorEl}
      onClose={closeMenu}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ ...menuStyles, ...menuDelete }}
    >
      <ChangesMenuItem
        icon="arrowUp"
        handler={MoveUp}
        disabled={index === 0}
        text="Переместить вверх"
      />

      <ChangesMenuItem
        icon="arrowDown"
        handler={MoveDown}
        text="Переместить вниз"
        disabled={index === editors.length - 1}
      />

      <ChangesMenuItem
        icon="delete"
        handler={Delete}
        text="Удалить блок"
        disabled={editors.length === 1}
      />
    </Menu>
  );
};

export default React.memo<ItemMenuProps>(ChangesMenu);
