/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// import "./TextEditor.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';

type ItemMenuProps = {
  className?: string;
  contextMenu: any;
  index: number;
  selectItemMenu: () => void;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  closeMenu: () => void;
};

const ITEM_HEIGHT = 80;

const ItemMenu: React.FC<ItemMenuProps> = ({
  contextMenu,
  selectItemMenu,
  closeMenu,
  deleteItem,
  index,
  duplicateItem,
}) => (
  <Menu
    open={contextMenu !== null}
    onClose={closeMenu}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    anchorReference="anchorPosition"
    anchorPosition={
      contextMenu !== null
        ? { top: contextMenu.mouseY - 40, left: contextMenu.mouseX + 8 }
        : undefined
    }
    PaperProps={{
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: '40ch',
      },
    }}>
    <MenuItem
      onClick={() => {
        deleteItem(index);
        selectItemMenu();
      }}>
      <ListItemIcon>
        <DeleteForeverIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Удалить</ListItemText>
    </MenuItem>
    <MenuItem
      onClick={() => {
        duplicateItem(index);
        selectItemMenu();
      }}>
      <ListItemIcon>
        <ContentCopyIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Дублировать</ListItemText>
    </MenuItem>
    <MenuItem
      onClick={() => {
        duplicateItem(index);
        selectItemMenu();
      }}>
      <ListItemIcon>
        <FileCopyIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Скопировать текст</ListItemText>
    </MenuItem>
  </Menu>
);

export default ItemMenu;
