/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-exact-props */
// @flow
import React from 'react';
import { IconButton, Stack } from '@mui/material';
import type { DraggableProvided } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NewItemMenu from '../NewItemMenu/NewItemMenu';
import ItemMenu from '../ItemMenu/ItemMenu';
import BlockSelection from '../Blocks/BlockSelection';

type Quote = {
  id: string;
  type: string;
  value: string;
};

type Props = {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  index: number;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent

function QuoteItem(props: Props) {
  const { index, isDragging, quote, provided, deleteItem, duplicateItem } = props;

  const [hover, setHover] = React.useState(false);
  const [contextNewMenu, setContextNewMenu] = React.useState(null);

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

  return (
    <Stack
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        p: 1,
        cursor: 'default !important',
      }}
      ref={provided.innerRef}
      draggable={isDragging}
      {...provided.draggableProps}>
      <AddIcon
        onClick={(e) => handleContextNewMenu(e)}
        sx={{
          color: 'text.secondary',
          cursor: 'pointer !important',
          visibility: hover ? 'visible' : 'hidden',
          transition: '0.1s',
          mt: '12px',
        }}
      />
      <NewItemMenu
        contextMenu={contextNewMenu}
        selectItemMenu={() => setContextNewMenu(null)}
        closeMenu={() => setContextNewMenu(null)}
      />
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
      <ItemMenu
        contextMenu={contextMenu}
        selectItemMenu={() => setContextMenu(null)}
        closeMenu={() => setContextMenu(null)}
        deleteItem={deleteItem}
        duplicateItem={duplicateItem}
        index={index}
      />
      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        {/* @ts-ignore */}
        <BlockSelection type={quote.type}>{quote.value}</BlockSelection>
      </Stack>
    </Stack>
  );
}

export default React.memo<Props>(QuoteItem);
