/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-exact-props */
// @flow
import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import type { DraggableProvided } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type Quote = {
  id: string;
  value: string;
};

type Props = {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  index: number;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent

function QuoteItem(props: Props) {
  const { index, isDragging, quote, provided } = props;

  const [hover, setHover] = React.useState(false);

  return (
    <Stack
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        p: 1,
        cursor: 'default !important',
      }}
      ref={provided.innerRef}
      draggable={isDragging}
      {...provided.draggableProps}>
      <AddIcon
        onClick={() => console.log(index)}
        sx={{
          color: 'text.secondary',
          cursor: 'pointer !important',
          visibility: hover ? 'visible' : 'hidden',
          transition: '0.1s',
        }}
      />
      <IconButton
        {...provided.dragHandleProps}
        sx={{
          cursor: 'grab !important',
          visibility: hover ? 'visible' : 'hidden',
          transition: '0.1s',
        }}>
        <DragIndicatorIcon
          sx={{
            color: 'text.secondary',
          }}
        />
      </IconButton>
      <Typography> {quote.value} </Typography>
    </Stack>
  );
}

export default React.memo<Props>(QuoteItem);
