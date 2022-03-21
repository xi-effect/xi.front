/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
// import "./TextEditor.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { NewBlocks } from '../config';

type ItemMenuProps = {
  contextMenu: any;
  selectItemMenu: () => void;
  setContextMenu: (value: null) => void;
};

const ITEM_HEIGHT = 80;

const ItemMenu: React.FC<ItemMenuProps> = ({ contextMenu, selectItemMenu, setContextMenu }) => {
  const [openItemsMenu, setOpenItemsMenu] = React.useState<null | string>(null);

  return (
    <Menu
      open={contextMenu !== null}
      onClose={() => {
        setContextMenu(null);
      }}
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
      {openItemsMenu === null && (
        <Stack>
          <MenuItem
            onClick={() => {
              setOpenItemsMenu('change');
            }}>
            <ListItemIcon>
              <AutorenewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Сменить тип</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              // deleteItem(index);
              selectItemMenu();
            }}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Удалить</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              // duplicateItem(index);
              selectItemMenu();
            }}>
            <ListItemIcon>
              <ContentCopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Дублировать</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              // duplicateItem(index);
              selectItemMenu();
            }}>
            <ListItemIcon>
              <FileCopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Скопировать текст</ListItemText>
          </MenuItem>
        </Stack>
      )}
      {openItemsMenu === 'change' && (
        <Stack>
          {NewBlocks.map((item, indx) => (
            <MenuItem
              key={indx.toString()}
              onClick={() => {
                // changeItemType(index, item.type);
                selectItemMenu();
                setOpenItemsMenu(null);
              }}>
              <Stack direction="column" justifyContent="center" alignItems="flex-start">
                <Typography variant="h5">{item.label}</Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="subtitle1">
                  {item.description}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      )}
    </Menu>
  );
};

export default ItemMenu;
