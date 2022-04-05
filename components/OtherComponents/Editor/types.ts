export type BlockType = {
  id: string;
  type: string;
  value: string;
};

export type BlockProps = {
  editor: any;
  children: any;
  attributes: any;
  element?: any;
  value: any;
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
