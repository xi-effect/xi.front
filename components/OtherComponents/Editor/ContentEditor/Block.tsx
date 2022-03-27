/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-exact-props */
// @flow
import React from 'react';
import { Stack, Tooltip, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useLongPress } from 'use-long-press';
import { grey } from '@mui/material/colors';
import { Draggable } from 'react-beautiful-dnd';
import NewItemMenu from '../Menus/NewItemMenu';
import ItemMenu from '../Menus/ItemMenu';
// import SelectionHOC from './SelectionHOC';
import MobileContextMenu from '../Menus/MobileContextMenu';
import { BlockProps } from '../types';

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent

function Block(props: BlockProps) {
  const { children, propsBlock } = props;
  // console.log('propsBlock', propsBlock, propsBlock.block.key);
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
    (event) => {
      event?.preventDefault();
      console.log('Long pressed!');
      if (mobile) setMobileContext(true);
    },
    {
      cancelOnMovement: true,
      threshold: 500,
    },
  );

  console.log('propsBlock', propsBlock.contentState.getBlocksAsArray().indexOf(propsBlock.block));
  const index = propsBlock.contentState.getBlocksAsArray().indexOf(propsBlock.block);

  return (
    <Draggable draggableId={`list-components-id-${index}`} index={index}>
      {(provided) => (
        <Stack
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            // p: 1,
            width: '100%',
            height: '100%',
            cursor: 'default !important',
          }}
          ref={provided.innerRef}
          // draggable={isDragging}
          {...provided.draggableProps}>
          {!mobile && (
            <Tooltip title="Добавить элемент">
              <Stack
                justifyContent="center"
                alignItems="center"
                onClick={(event) => handleContextNewMenu(event)}
                sx={{
                  cursor: 'pointer !important',
                  visibility: hover ? 'visible' : 'hidden',
                  transition: '0.2s',
                  mt: '4px',
                  userSelect: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  '&:hover': {
                    bgcolor: grey[800],
                  },
                }}>
                <AddIcon
                  sx={{
                    color: 'text.secondary',
                  }}
                />
              </Stack>
            </Tooltip>
          )}
          {!mobile && (
            <NewItemMenu
              contextMenu={contextNewMenu}
              selectItemMenu={() => setContextNewMenu(null)}
              closeMenu={() => setContextNewMenu(null)}
            />
          )}
          {!mobile && (
            <Tooltip title="Перетащить элемент">
              <Stack
                justifyContent="center"
                alignItems="center"
                onClick={(e) => handleContextMenu(e)}
                {...provided.dragHandleProps}
                sx={{
                  cursor: 'grab !important',
                  visibility: hover ? 'visible' : 'hidden',
                  transition: '0.2s',
                  mt: '4px',
                  userSelect: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  '&:hover': {
                    bgcolor: grey[800],
                  },
                }}>
                <DragIndicatorIcon
                  sx={{
                    color: 'text.secondary',
                  }}
                />
              </Stack>
            </Tooltip>
          )}
          {!mobile && (
            <ItemMenu
              contextMenu={contextMenu}
              selectItemMenu={() => setContextMenu(null)}
              setContextMenu={setContextMenu}
            />
          )}
          <MobileContextMenu open={mobileContext} setOpen={setMobileContext} />
          <Stack
            {...bind}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              width: '100%',
              height: '100%',
              p: 1,
            }}>
            {children}
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
}

export default Block;
