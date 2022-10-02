import React, { useState } from 'react';
import { IconButton, Stack, Theme, Tooltip, useMediaQuery } from '@mui/material';
import { Add, DragIndicator } from '@mui/icons-material';
import { useLongPress } from 'use-long-press';
import { Draggable } from 'react-beautiful-dnd';
import CreationMenu from '../Menus/CreationMenu';
import ChangesMenu from '../Menus/ChangesMenu';
import MobileContextMenu from '../Menus/MobileContextMenu';
import { BlockProps } from '../common/types';
import ResultBlock from './ResultBlock';

const ControlBlock = (props: BlockProps) => {
  const { editor, children, attributes, element, value } = props;

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [mobileContext, setMobileContext] = React.useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [editAnchorEl, setEditAnchorEl] = useState<null | HTMLDivElement>(null);

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

  if (mobile) {
    return (
      <Draggable draggableId={`list-components-id-${element.id}`} index={index}>
        {(provided) => (
          <Stack
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
            {...provided.draggableProps}
          >
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
              }}
            >
              <ResultBlock attributes={attributes} element={element}>
                {children}
              </ResultBlock>
            </Stack>
          </Stack>
        )}
      </Draggable>
    );
  }

  return (
    <Draggable draggableId={`list-components-id-${element.id}`} index={index}>
      {(provided) => (
        <Stack
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
          {...provided.draggableProps}
        >
          <Tooltip title="Добавить элемент">
            <IconButton
              sx={{
                '&:hover ': {
                  backgroundColor: '#E6E6E6',
                },
                mr: '5px',
                borderRadius: '4px',
                transition: 'background-color 0.5s ease',
                backgroundColor: addAnchorEl ? '#E6E6E6' : 'transparent',
              }}
              onClick={(e) => setAddAnchorEl(e.currentTarget)}
            >
              <Add sx={{ color: '#333' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Перетащить элемент">
            <Stack
              sx={{
                '&:hover ': {
                  backgroundColor: '#E6E6E6',
                },
                p: '8px',
                borderRadius: '4px',
                transition: 'background-color 0.5s ease',
                backgroundColor: editAnchorEl ? '#E6E6E6' : 'transparent',
              }}
              {...provided.dragHandleProps}
              onClick={(e) => setEditAnchorEl(e.currentTarget)}
            >
              <DragIndicator sx={{ color: '#333' }} />
            </Stack>
          </Tooltip>

          <CreationMenu
            editor={editor}
            index={index}
            anchorEl={addAnchorEl}
            closeMenu={() => setAddAnchorEl(null)}
          />

          <ChangesMenu
            editor={editor}
            index={index}
            anchorEl={editAnchorEl}
            closeMenu={() => setEditAnchorEl(null)}
          />
          <Stack
            {...bind}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              width: '100%',
              height: '100%',
              p: '10px',
            }}
          >
            <ResultBlock attributes={attributes} element={element}>
              {children}
            </ResultBlock>
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
};

export default ControlBlock;
