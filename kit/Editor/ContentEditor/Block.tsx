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
import MobileContextMenu from '../Menus/MobileContextMenu';
import { BlockProps } from '../types';
import Element from './Element';

const Block = (props: BlockProps) => {
  const { editor, children, attributes, element, value } = props;
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

  const index = value.findIndex((item) => item.id === element.id);

  return (
    <Draggable draggableId={`list-components-id-${element.id}`} index={index}>
      {(provided) => (
        <Stack
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => setHover(false)}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            cursor: 'default !important',
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}>
          {!mobile && (
            <Tooltip title="Добавить элемент">
              <Stack
                justifyContent="center"
                alignItems="center"
                onClick={(event) => handleContextNewMenu(event)}
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: 4,
                  cursor: 'pointer !important',
                  visibility: hover ? 'visible' : 'hidden',
                  transition: '0.2s',
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
              editor={editor}
              index={index}
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
                  position: 'absolute',
                  top: 2,
                  left: 42,
                  cursor: 'grab !important',
                  visibility: hover ? 'visible' : 'hidden',
                  transition: '0.2s',
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
              editor={editor}
              index={index}
              contextMenu={contextMenu}
              selectItemMenu={() => setContextMenu(null)}
              setContextMenu={setContextMenu}
            />
          )}
          <MobileContextMenu
            editor={editor}
            index={index}
            open={mobileContext}
            setOpen={setMobileContext}
          />
          <Stack
            {...bind}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              width: '100%',
              height: '100%',
              p: 0.5,
              pl: 10,
            }}>
            <Element attributes={attributes} element={element}>
              {children}
            </Element>
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
};

export default Block;
