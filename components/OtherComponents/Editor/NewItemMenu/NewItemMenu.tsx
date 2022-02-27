/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import { NewBlocks } from '../config';
// import "./TextEditor.scss";

type NewItemMenuProps = {
  className?: string;
  contextMenu: any;
  selectItemMenu: (type: string) => void;
  closeMenu: () => void;
  addNewItem: (index: number, type: string) => void;
  index: number;
};

const ITEM_HEIGHT = 80;

const NewItemMenu: React.FC<NewItemMenuProps> = ({
  contextMenu,
  selectItemMenu,
  closeMenu,
  addNewItem,
  index,
}) => (
  <Menu
    open={contextMenu !== null}
    onClose={closeMenu}
    anchorReference="anchorPosition"
    anchorPosition={
      contextMenu !== null
        ? { top: contextMenu.mouseY + 8, left: contextMenu.mouseX + 8 }
        : undefined
    }
    PaperProps={{
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: '40ch',
      },
    }}>
    <Typography variant="h6" sx={{ ml: 2 }}>
      Выберите новый блок
    </Typography>
    {NewBlocks.map((item, indx) => (
      <MenuItem
        key={indx.toString()}
        onClick={() => {
          addNewItem(index, item.type);
          selectItemMenu(item.type);
        }}>
        <Stack direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h6">{item.label}</Typography>
          <Typography sx={{ color: 'text.secondary' }} variant="subtitle1">
            {item.description}
          </Typography>
        </Stack>
      </MenuItem>
    ))}
  </Menu>
);

export default NewItemMenu;
