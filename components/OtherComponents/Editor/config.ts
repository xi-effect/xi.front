/* eslint-disable import/prefer-default-export */
export enum BlockType {
  /* Заголовки */
  H1 = 'header-one',
  H2 = 'header-two',
  H3 = 'header-three',
  H4 = 'header-four',
  H5 = 'header-five',
  H6 = 'header-six',
  /* Цитата */
  Blockquote = 'blockquote',
  /* Блок с кодом */
  Code = 'code-block',
  /* Список */
  List = 'unordered-list-item',
  /* Нумерованный список */
  OrderList = 'ordered-list-item',
  /* Сноска */
  Cite = 'cite',
  /* Простой текст */
  Default = 'unstyled',
}

export const inlineStyles = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

export const BlockStyles = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];
