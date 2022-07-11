/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Transforms } from 'slate';
import { NewBlocks } from '../config';

type NewItemMenuProps = {
  editor: any;
  index: number;
  contextMenu: any;
  selectItemMenu: (type: string) => void;
  closeMenu: () => void;
};

const ITEM_HEIGHT = 80;

const NewItemMenu: React.FC<NewItemMenuProps> = ({
  editor,
  index,
  contextMenu,
  selectItemMenu,
  closeMenu,
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
          Transforms.insertNodes(
            editor,
            // @ts-ignore
            { type: item.type, id: new Date().getUTCMilliseconds(), children: [{ text: '' }] },
            { at: [index + 1] },
          );
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

export default React.memo<NewItemMenuProps>(NewItemMenu);
