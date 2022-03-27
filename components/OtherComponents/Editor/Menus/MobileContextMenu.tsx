/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-exact-props */
// @flow
import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import {
  CssBaseline,
  MenuItem,
  Typography,
  Box,
  SwipeableDrawer,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import UndoIcon from '@mui/icons-material/Undo';
import { NewBlocks } from '../config';

const drawerBleeding = 0;
// @ts-ignore
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
// @ts-ignore
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));
// @ts-ignore
const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent

function MobileContextMenu(props: Props) {
  const { open, setOpen } = props;
  // @ts-ignore
  // const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));
  const [openItemsMenu, setOpenItemsMenu] = React.useState<null | string>(null);
  console.log('openSwipeableDrawer', open);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        // swipeAreaWidth={drawerBleeding}
        PaperProps={{
          sx: {
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
          },
        }}
        disableSwipeToOpen
        // ModalProps={{
        //   keepMounted: true,
        // }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
            visibility: 'visible',
            right: 0,
            left: 0,
          }}>
          <Puller />
          <Typography
            sx={{ pt: 2, pl: 2, pb: 1, color: 'text.secondary', fontSize: 16, userSelect: 'none' }}>
            {openItemsMenu === null && 'Меню блока'}
            {openItemsMenu === 'add' && 'Выберите тип нового блока'}
            {openItemsMenu === 'change' && 'Выберите новой тип блока'}
          </Typography>
          {openItemsMenu != null && (
            <IconButton
              onClick={() => setOpenItemsMenu(null)}
              sx={{ position: 'absolute', right: 8, top: 6 }}>
              <UndoIcon />
            </IconButton>
          )}
        </StyledBox>
        <Box
          sx={{
            // px: 2,
            pb: 2,
            mt: 7,
            height: '100%',
            overflow: 'auto',
            width: '100%',
          }}>
          {openItemsMenu === null && (
            <>
              <MenuItem
                onClick={() => {
                  setOpenItemsMenu('add');
                }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: 18, fontWeight: 'bold', userSelect: 'none' }}>
                  Добавить
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenItemsMenu('change');
                }}>
                <ListItemIcon>
                  <AutorenewIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: 18, fontWeight: 'bold', userSelect: 'none' }}>
                  Сменить тип
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // deleteItem(index);
                  setOpen(false);
                }}>
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: 18, fontWeight: 'bold', userSelect: 'none' }}>
                  Удалить
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // duplicateItem(index);
                  setOpen(false);
                }}>
                <ListItemIcon>
                  <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: 18, fontWeight: 'bold', userSelect: 'none' }}>
                  Дублировать
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // duplicateItem(index);
                  setOpen(false);
                }}>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText disableTypography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                  Скопировать текст
                </ListItemText>
              </MenuItem>
            </>
          )}
          {openItemsMenu === 'add' && (
            <>
              {NewBlocks.map((item, indx) => (
                <MenuItem
                  key={indx.toString()}
                  onClick={() => {
                    // addNewItem(index, item.type);
                  }}>
                  <Stack direction="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="h5">{item.label}</Typography>
                    <Typography sx={{ color: 'text.secondary' }} variant="subtitle1">
                      {item.description}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </>
          )}
          {openItemsMenu === 'change' && (
            <>
              {NewBlocks.map((item, indx) => (
                <MenuItem
                  key={indx.toString()}
                  onClick={() => {
                    // changeItemType(index, item.type);
                    setOpen(false);
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
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}

export default React.memo<Props>(MobileContextMenu);
