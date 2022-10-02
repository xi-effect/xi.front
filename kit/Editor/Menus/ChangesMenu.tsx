import * as React from 'react';
import { Menu } from '@mui/material';
import { Editor, Transforms } from 'slate';
import { menuDelete, menuStyles } from '../common/Styles';
import ChangesMenuItem from './MenuItem/ChangesMenuItem';

type ItemMenuProps = {
  editor: Editor;
  index: number;
  anchorEl: Element | null;
  closeMenu: () => void;
};

const ChangesMenu: React.FC<ItemMenuProps> = ({ editor, index, anchorEl, closeMenu }) => {
  const MoveUp = () => {
    Transforms.moveNodes(editor, {
      at: [index],
      to: [index - 1],
    });
    closeMenu();
  };

  const MoveDown = () => {
    Transforms.moveNodes(editor, {
      at: [index],
      to: [index + 1],
    });
    closeMenu();
  };

  const Delete = () => {
    Transforms.removeNodes(editor, { at: [index] });
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
        disabled={index === editor.children.length - 1}
      />

      <ChangesMenuItem
        icon="delete"
        handler={Delete}
        text="Удалить блок"
        disabled={editor.children.length === 1}
      />
    </Menu>
  );
};

export default React.memo<ItemMenuProps>(ChangesMenu);
