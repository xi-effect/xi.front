/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-exact-props */
// @flow
import React from 'react';
import { IconButton, Stack, useMediaQuery } from '@mui/material';
import type { DraggableProvided } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useLongPress } from 'use-long-press';
import NewItemMenu from '../NewItemMenu/NewItemMenu';
import ItemMenu from '../ItemMenu/ItemMenu';
import BlockSelection from '../Blocks/BlockSelection';
import MobileContextMenu from './MobileContextMenu';

type ItemType = {
  id: string;
  type: string;
  value: string;
};

type Props = {
  item: ItemType;
  isDragging: boolean;
  provided: DraggableProvided;
  index: number;
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

function Item(props: Props) {
  const { index, isDragging, item, provided, addNewItem, deleteItem, duplicateItem } = props;
  // @ts-ignore
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));

  const [hover, setHover] = React.useState(false);
  const [contextNewMenu, setContextNewMenu] = React.useState(null);
  const [mobileContext, setMobileContext] = React.useState(false);

  const handleContextNewMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextNewMenu(
      contextNewMenu === null
        ? {
            // @ts-ignore
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextNewMenu === null
        ? {
            // @ts-ignore
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  // console.log('provided', provided);

  const bind = useLongPress(
    () => {
      console.log('Long pressed!');
      setMobileContext(true);
    },
    {
      threshold: 600,
    },
  );

  return (
    <Stack
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        p: 1,
        width: '100%',
        cursor: 'default !important',
      }}
      ref={provided.innerRef}
      draggable={isDragging}
      {...provided.draggableProps}>
      {!mobile && (
        <AddIcon
          onClick={(event) => handleContextNewMenu(event)}
          sx={{
            color: 'text.secondary',
            cursor: 'pointer !important',
            visibility: hover ? 'visible' : 'hidden',
            transition: '0.1s',
            mt: '12px',
          }}
        />
      )}
      {!mobile && (
        <NewItemMenu
          contextMenu={contextNewMenu}
          selectItemMenu={() => setContextNewMenu(null)}
          closeMenu={() => setContextNewMenu(null)}
          addNewItem={addNewItem}
          index={index}
        />
      )}
      {!mobile && (
        <IconButton
          onClick={(e) => handleContextMenu(e)}
          {...provided.dragHandleProps}
          sx={{
            cursor: 'grab !important',
            visibility: hover ? 'visible' : 'hidden',
            transition: '0.1s',
            mt: '4px',
          }}>
          <DragIndicatorIcon
            sx={{
              color: 'text.secondary',
            }}
          />
        </IconButton>
      )}
      {!mobile && (
        <ItemMenu
          contextMenu={contextMenu}
          selectItemMenu={() => setContextMenu(null)}
          closeMenu={() => setContextMenu(null)}
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          index={index}
        />
      )}
      <MobileContextMenu
        open={mobileContext}
        index={index}
        setOpen={setMobileContext}
        addNewItem={addNewItem}
        deleteItem={deleteItem}
        duplicateItem={duplicateItem}
      />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: '100%',
          // minHeight: '32px',
        }}
        {...bind}>
        {/* @ts-ignore */}
        <BlockSelection type={item.type}>{item.value}</BlockSelection>
      </Stack>
    </Stack>
  );
}

export default React.memo<Props>(Item);
