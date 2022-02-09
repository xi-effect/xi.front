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
import ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import {
  Droppable,
  Draggable,
  DragDropContext,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
  DropResult,
} from 'react-beautiful-dnd';
import QuoteItem from './QuoteItem';

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type Quote = {
  id: string;
  value: string;
};

type Props = {
  quotes: Quote[];
  setQuotes: (quotes: Quote[]) => void;
};

type RowProps = {
  index: number;
};

const getRowRender = (quotes: Quote[]) =>
  function ({ index }: RowProps) {
    const quote: Quote = quotes[index];

    return (
      <Draggable draggableId={quote.id} index={index} key={quote.id}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <QuoteItem
            provided={provided}
            quote={quote}
            isDragging={snapshot.isDragging}
            index={index}
          />
        )}
      </Draggable>
    );
  };

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric,
        ) => (
          <QuoteItem
            provided={provided}
            isDragging={snapshot.isDragging}
            quote={quotes[rubric.source.index]}
            index={rubric.source.index}
          />
        )}>
        {(droppableProvided: DroppableProvided) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                autoHeight
                rowCount={quotes.length}
                height={height}
                // isScrolling={isScrolling}
                // onScroll={onChildScroll}
                // scrollTop={scrollTop}
                rowHeight={110}
                width={width}
                ref={(ref: React.ReactInstance | null | undefined) => {
                  // react-virtualized has no way to get the list's ref that I can so
                  // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                  if (ref) {
                    // eslint-disable-next-line react/no-find-dom-node
                    const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);
                    if (whatHasMyLifeComeTo instanceof HTMLElement) {
                      droppableProvided.innerRef(whatHasMyLifeComeTo);
                    }
                  }
                }}
                rowRenderer={getRowRender(quotes)}
              />
            )}
          </AutoSizer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDrop;
