// import React from 'react';
// import type { DraggableProvided } from 'react-beautiful-dnd';

export type SelectionHOCProps = {
  props: any;
  // contentState: any;
  // blockProps: any;
  // block: any;
  // tree: any;
  // selection: any;
  // customStyleFn: any;
  // customStyleMap: any;
  // direction: any;
  // forceSelection: boolean;
  // offsetKey: string;
};

export type BlockType = {
  id: string;
  type: string;
  value: string;
};

export type BlockProps = {
  // item: BlockType;
  // isDragging: boolean;
  // provided: DraggableProvided;
  // index: number;
  // deleteItem: (index: number) => void;
  // duplicateItem: (index: number) => void;
  // addNewItem: (index: number, type: string) => void;
  // changeItemType: (index: number, newType: string) => void;
  children: any;
};

export type ContentEditorProps = {
  items: BlockType[];
  setItems: (items: BlockType[]) => void;
};

export type BlockItemProps = {
  item: BlockType;
  index: number;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  addNewItem: (index: number, type: string) => void;
  changeItemType: (index: number, newType: string) => void;
};

export type BlocksListProps = {
  items: BlockType[];
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  addNewItem: (index: number, type: string) => void;
  changeItemType: (index: number, newType: string) => void;
};
