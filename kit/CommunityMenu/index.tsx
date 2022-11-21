import React, { KeyboardEvent, MouseEvent } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { MenuItem, Stack, MenuList, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from 'store/connect';

type CommunityMenuProps = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?: (e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => void;
  handleListKeyDown?: (e: KeyboardEvent<HTMLUListElement>) => void;
};

const CommunityMenu = observer(
  ({ open, setOpen, handleClose, handleListKeyDown }: CommunityMenuProps) => {
    const rootStore = useStore();
    const { uiSt } = rootStore;

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
        sx={{ width: '100%' }}
      >
        <MenuItem sx={{ width: '100%' }} onClick={onInviteClick}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              Пригласить людей
            </Typography>
            <PersonAddAlt1Icon fontSize="small" />
          </Stack>
        </MenuItem>
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            uiSt.setDialogs('communitySettings', true);
            uiSt.setDialogs('communityMenu', false);
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              Настройки сообщества
            </Typography>
            <SettingsIcon fontSize="small" />
          </Stack>
        </MenuItem>
        <Divider flexItem />
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            uiSt.setDialogs('channelCreation', true);
            if (setOpen) setOpen(false);
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              Создать канал
            </Typography>
            <AddCircleIcon fontSize="small" />
          </Stack>
        </MenuItem>
        <MenuItem
          sx={{ width: '100%' }}
          onClick={() => {
            uiSt.setDialogs('categoryCreation', true);
            if (setOpen) setOpen(false);
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              Создать категорию
            </Typography>
            <CreateNewFolderIcon fontSize="small" />
          </Stack>
        </MenuItem>
        <Divider flexItem />
        <MenuItem
          sx={{ width: '100%' }}
          onClick={(e) => {
            if (handleClose) handleClose(e);
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%', color: 'error.main' }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              Покинуть сообщество
            </Typography>
            <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />
          </Stack>
        </MenuItem>
      </MenuList>
    );
  },
);

export default CommunityMenu;
