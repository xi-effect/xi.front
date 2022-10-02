import * as React from 'react';
import Menu from '@mui/material/Menu';
import { Editor } from 'slate';
import { CreationMenuConfig } from '../common/MenuConfig';
import CreationMenuItem from './MenuItem/CreationMenuItem';
import { menuStyles } from '../common/Styles';

type NewItemMenuProps = {
  editor: Editor;
  index: number;
  closeMenu: () => void;
  anchorEl: Element | null;
};

const CreationMenu: React.FC<NewItemMenuProps> = ({ editor, index, anchorEl, closeMenu }) => (
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
      <CreationMenuItem key={i} elem={elem} index={index} editor={editor} closeMenu={closeMenu} />
    ))}
  </Menu>
);

export default React.memo<NewItemMenuProps>(CreationMenu);
