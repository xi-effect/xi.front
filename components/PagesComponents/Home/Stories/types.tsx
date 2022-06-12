export type Item = {
  size?: number;
  top?: number;
  left?: number;
  image: string;
  label: string | null;
  sublabel?: string | null;
  body?: string | null;
  bgcolor?: string;
};

export type StoryItemProps = {
  index: number;
  item: Item;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: number | null) => void;
};
