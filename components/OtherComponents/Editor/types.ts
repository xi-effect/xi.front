import React from 'react';
import type { DraggableProvided } from 'react-beautiful-dnd';

export type SelectionHOCProps = {
  type: string;
  children: React.ReactElement;
};

export type BlockType = {
  id: string;
  type: string;
  value: string;
};

export type BlockProps = {
  item: BlockType;
  isDragging: boolean;
  provided: DraggableProvided;
  index: number;
  deleteItem: (index: number) => void;
  duplicateItem: (index: number) => void;
  addNewItem: (index: number, type: string) => void;
  changeItemType: (index: number, newType: string) => void;
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
