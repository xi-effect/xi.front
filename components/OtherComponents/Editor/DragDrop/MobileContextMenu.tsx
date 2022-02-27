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
} from '@mui/material';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';

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
  index: number;
  setOpen: (state: boolean) => void;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  addNewItem: (index: number, type: string) => void;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent

function MobileContextMenu(props: Props) {
  const { open, setOpen, index, addNewItem, deleteItem, duplicateItem } = props;
  // @ts-ignore
  // const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));

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
          <Typography sx={{ pt: 2, pl: 2, pb: 1, color: 'text.secondary', fontSize: 20 }}>
            {' '}
            Меню блока{' '}
          </Typography>
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
          <MenuItem
            onClick={() => {
              addNewItem(index, 'text');
              setOpen(false);
            }}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText disableTypography sx={{ fontSize: 18, fontWeight: 'bold' }}>
              Добавить элемент
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteItem(index);
              setOpen(false);
            }}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText disableTypography sx={{ fontSize: 18, fontWeight: 'bold' }}>
              Удалить
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              duplicateItem(index);
              setOpen(false);
            }}>
            <ListItemIcon>
              <ContentCopyIcon />
            </ListItemIcon>
            <ListItemText disableTypography sx={{ fontSize: 18, fontWeight: 'bold' }}>
              Дублировать
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              duplicateItem(index);
              setOpen(false); 
            }}>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText disableTypography sx={{ fontSize: 18, fontWeight: 'bold' }}>
              Скопировать текст
            </ListItemText>
          </MenuItem>
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}

export default MobileContextMenu;
