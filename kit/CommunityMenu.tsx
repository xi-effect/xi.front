import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { MenuItem, Stack, MenuList, Divider } from '@mui/material';

import DialogInvite from 'kit/CommunityMenu/DialogInvite';
import DialogSettings from 'kit/CommunityMenu/DialogSettings';
import DialogPrivacy from 'kit/CommunityMenu/DialogPrivacy';
import DialogChannelCreation from 'kit/CommunityMenu/DialogChannelCreation';
import DialogCategoryCreation from 'kit/CommunityMenu/DialogCategoryCreation';

type CommunityMenuProps = {
  open?: any;
  setOpen?: any;
  handleClose?: any;
  handleListKeyDown?: any;
};

const CommunityMenu: React.FC<CommunityMenuProps> = ({
  open,
  setOpen,
  handleClose,
  handleListKeyDown,
}) => {
  const [openDialogInvite, setOpenDialogInvite] = React.useState(false);
  const [openDialogSettings, setOpenDialogSettings] = React.useState(false);
  const [openDialogChannelCreation, setOpenDialogChannelCreation] = React.useState(false);
  const [openDialogCategoryCreation, setOpenDialogCategoryCreation] = React.useState(false);
  const [openDialogPrivacy, setOpenDialogPrivacy] = React.useState(false);

  return (
    <>
      <DialogInvite openDialogInvite={openDialogInvite} setOpenDialogInvite={setOpenDialogInvite} />
      <DialogSettings
        openDialogSettings={openDialogSettings}
        setOpenDialogSettings={setOpenDialogSettings}
      />
      <DialogPrivacy
        openDialogPrivacy={openDialogPrivacy}
        setOpenDialogPrivacy={setOpenDialogPrivacy}
      />
      <DialogChannelCreation
        openDialogChannelCreation={openDialogChannelCreation}
        setOpenDialogChannelCreation={setOpenDialogChannelCreation}
      />
      <DialogCategoryCreation
        openDialogCategoryCreation={openDialogCategoryCreation}
        setOpenDialogCategoryCreation={setOpenDialogCategoryCreation}
      />
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
        onKeyDown={handleListKeyDown}
        sx={{ width: '100%' }}>
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            setOpenDialogInvite(true);
            if (setOpen) setOpen(false);
          }}>
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
            setOpenDialogSettings(true);
            if (setOpen) setOpen(false);
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
            setOpenDialogChannelCreation(true);
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
            setOpenDialogCategoryCreation(true);
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
    </>
  );
};

export default CommunityMenu;
