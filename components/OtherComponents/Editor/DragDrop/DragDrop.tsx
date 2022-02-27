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
import Item from './Item';
import { BlocksTypeDict } from '../config';

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type ItemType = {
  id: string;
  type: string;
  value: string;
};

type Props = {
  items: ItemType[];
  setItems: (Items: ItemType[]) => void;
};

type ComponentProps = {
  item: ItemType;
  index: number;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  addNewItem: (index: number, type: string) => void;
};

function Component(props: ComponentProps) {
  const { item, index, addNewItem, deleteItem, duplicateItem } = props;
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Item
          addNewItem={addNewItem}
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          provided={provided}
          item={item}
          isDragging={snapshot.isDragging}
          index={index}
        />
      )}
    </Draggable>
  );
}

type ComponentsListProps = {
  items: ItemType[];
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  addNewItem: (index: number, type: string) => void;
};

function ComponentsList(props: ComponentsListProps) {
  const { items, addNewItem, deleteItem, duplicateItem } = props;
  return (
    <>
      {items.map((item, index) => (
        <Component
          addNewItem={addNewItem}
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          item={item}
          index={index}
          key={index.toString()}
        />
      ))}
    </>
  );
}

function DragDrop(props: Props) {
  const { items, setItems } = props;
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.source.index === result.destination.index) {
      return;
    }

    const newItems: ItemType[] = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
  }

  const deleteItem = (index: number) => {
    let newItems: ItemType[] = items;
    newItems.splice(index, 1);
    // for (let i = 0; i < newItems.length; i += 1) {
    //   newItems[i].id = i.toString();
    // }
    const newItemsLast: ItemType[] = newItems.map((item, indx) => ({
      ...item,
      id: indx.toString(),
    }));

    // console.log('newItems', newItems);
    setItems([...newItemsLast]);
  };

  const duplicateItem = (index: number) => {
    let newItems: ItemType[] = items;
    newItems.splice(index, 0, items[index]);
    // for (let i = 0; i < newItems.length; i += 1) {
    //   newItems[i].id = i.toString();
    //   console.log('newItems[i]', newItems[i]);
    // }
    const newItemsLast: ItemType[] = newItems.map((item, indx) => ({
      ...item,
      id: indx.toString(),
    }));

    // console.log('newItems', newItems);
    setItems([...newItemsLast]);
  };

  const addNewItem = (index: number, type: string) => {
    let newItems: ItemType[] = items;
    // @ts-ignore
    if (BlocksTypeDict[type]) {
      // @ts-ignore
      newItems.splice(index + 1, 0, BlocksTypeDict[type]);
    }
    // for (let i = 0; i < newItems.length; i += 1) {
    //   newItems[i].id = i.toString();
    //   console.log('newItems[i]', newItems[i]);
    // }
    const newItemsLast: ItemType[] = newItems.map((item, indx) => ({
      ...item,
      id: indx.toString(),
    }));

    // console.log('newItems', newItems);
    setItems([...newItemsLast]);
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
        //   <ItemItem
        //     provided={provided}
        //     isDragging={snapshot.isDragging}
        //     Item={Items[rubric.source.index]}
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
            <ComponentsList
              items={items}
              addNewItem={addNewItem}
              deleteItem={deleteItem}
              duplicateItem={duplicateItem}
            />
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDrop;
