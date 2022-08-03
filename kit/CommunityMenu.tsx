import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { MenuItem, Stack, MenuList, Divider } from '@mui/material';
import { inject, observer } from 'mobx-react';

type CommunityMenuProps = {
  open?: any;
  setOpen?: any;
  handleClose?: any;
  handleListKeyDown?: any;
  rootStore?: any;
  communitySt?: any;
  uiSt?: any;
};

const CommunityMenu: React.FC<CommunityMenuProps> = inject('uiSt')(
  observer(({ uiSt, open, setOpen, handleClose, handleListKeyDown }) => {

    const onInviteClick = () => {
      uiSt.setDialogs('invite', true);
      if (setOpen) setOpen(false);
    };

    return (
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
        onKeyDown={handleListKeyDown}
        sx={{ width: '100%' }}>
        <MenuItem
          sx={{ width: '100%' }}
          onClick={onInviteClick}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}>
            Пригласить людей
            <PersonAddAlt1Icon fontSize="small" />
          </Stack>
        </MenuItem>
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            uiSt.setDialogs('communitySettings', true);
            uiSt.setDialogs('communityMenu', false);
          }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}>
            Настройки сообщества
            <SettingsIcon fontSize="small" />
          </Stack>
        </MenuItem>
        <Divider flexItem />
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            uiSt.setDialogs('channelCreation', true);
            if (setOpen) setOpen(false);
          }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}>
            Создать канал
            <AddCircleIcon fontSize="small" />
          </Stack>
        </MenuItem>
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            uiSt.setDialogs('categoryCreation', true);
            if (setOpen) setOpen(false);
          }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}>
            Создать категорию
            <CreateNewFolderIcon fontSize="small" />
          </Stack>
        </MenuItem>
        <Divider flexItem />
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            if (handleClose) handleClose();
          }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%', color: 'error.main' }}>
            Покинуть сообщество
            <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />
          </Stack>
        </MenuItem>
      </MenuList>
    );
  }),
);

export default CommunityMenu;
