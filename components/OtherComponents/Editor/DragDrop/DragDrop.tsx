/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
// @flow
import React from 'react';
// import ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
// import { AutoSizer, List } from 'react-virtualized';
import {
  Droppable,
  Draggable,
  DragDropContext,
  // DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  // DraggableRubric,
  DropResult,
} from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import QuoteItem from './QuoteItem';

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type Quote = {
  id: string;
  type: string;
  value: string;
};

type Props = {
  quotes: Quote[];
  setQuotes: (quotes: Quote[]) => void;
};

type ComponentProps = {
  quote: Quote;
  index: number;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
};

function Component(props: ComponentProps) {
  const { quote, index, deleteItem, duplicateItem } = props;
  return (
    <Draggable draggableId={quote.id} index={index} key={quote.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <QuoteItem
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          provided={provided}
          quote={quote}
          isDragging={snapshot.isDragging}
          index={index}
        />
      )}
    </Draggable>
  );
}

type ComponentsListProps = {
  quotes: Quote[];
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
};

function ComponentsList(props: ComponentsListProps) {
  const { quotes, deleteItem, duplicateItem } = props;
  return (
    <>
      {quotes.map((quote, index) => (
        <Component
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          quote={quote}
          index={index}
          key={index.toString()}
        />
      ))}
    </>
  );
}

function DragDrop(props: Props) {
  const { quotes, setQuotes } = props;
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.source.index === result.destination.index) {
      return;
    }

    const newQuotes: Quote[] = reorder(quotes, result.source.index, result.destination.index);
    setQuotes(newQuotes);
  }

  const deleteItem = (index: number) => {
    let newQuotes: Quote[] = quotes;
    newQuotes.splice(index, 1);
    // for (let i = 0; i < newQuotes.length; i += 1) {
    //   newQuotes[i].id = i.toString();
    // }
    const newItems: Quote[] = newQuotes.map((item, indx) => ({
      ...item,
      id: indx.toString(),
    }));

    // console.log('newItems', newItems); 
    setQuotes([...newItems]);
  };

  const duplicateItem = (index: number) => {
    let newQuotes: Quote[] = quotes;
    newQuotes.splice(index, 0, quotes[index]);
    // for (let i = 0; i < newQuotes.length; i += 1) {
    //   newQuotes[i].id = i.toString();
    //   console.log('newQuotes[i]', newQuotes[i]);
    // }
    const newItems: Quote[] = newQuotes.map((item, indx) => ({
      ...item,
      id: indx.toString(),
    }));

    // console.log('newItems', newItems);
    setQuotes([...newItems]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable"
        // mode="virtual"
        // renderClone={(
        //   provided: DraggableProvided,
        //   snapshot: DraggableStateSnapshot,
        //   rubric: DraggableRubric,
        // ) => (
        //   <QuoteItem
        //     provided={provided}
        //     isDragging={snapshot.isDragging}
        //     quote={quotes[rubric.source.index]}
        //     index={rubric.source.index}
        //   />
        // )}
      >
        {(provided) => (
          <Grid
            ref={provided.innerRef}
            sx={{
              width: 'calc(100% - 16px)',
              height: '100%',
              pb: 30,
            }}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
            <ComponentsList quotes={quotes} deleteItem={deleteItem} duplicateItem={duplicateItem} />
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDrop;
