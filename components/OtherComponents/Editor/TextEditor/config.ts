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