import { v4 } from 'uuid';
import { Type } from './withListsPlugin';

export type CreationMenuConfigT = {
  type: Type;
  icon: string;
  label: string;
};

export const editorExample = (type: Type) => ({ type, id: v4() });

export const slateExample = (type: Type) => {
  switch (type) {
    case Type.H1:
      return [{ type, children: [{ text: 'Заголовок 1' }] }];

    case Type.H2:
      return [{ type, children: [{ text: 'Заголовок 2' }] }];

    case Type.H3:
      return [{ type, children: [{ text: 'Заголовок 3' }] }];

    case Type.QUOTE:
      return [{ type, children: [{ text: 'Колямбус вжжжжж...' }] }];

    case Type.ORDERED_LIST:
      return [
        {
          type,
          children: [
            {
              type: Type.LIST_ITEM,
              children: [
                {
                  type: Type.LIST_ITEM_TEXT,
                  children: [{ text: 'Нумерованный список' }],
                },
              ],
            },
            {
              type: Type.LIST_ITEM,
              children: [
                {
                  type: Type.LIST_ITEM_TEXT,
                  children: [{ text: 'Нумерация продолжается' }],
                },
              ],
            },
          ],
        },
      ];

    case Type.UNORDERED_LIST:
      return [
        {
          type,
          children: [
            {
              type: Type.LIST_ITEM,
              children: [
                {
                  type: Type.LIST_ITEM_TEXT,
                  children: [{ text: 'Маркированный список' }],
                },
              ],
            },
            {
              type: Type.LIST_ITEM,
              children: [
                {
                  type: Type.LIST_ITEM_TEXT,
                  children: [{ text: 'Маркирация продолжается' }],
                },
              ],
            },
          ],
        },
      ];

    default:
      return [{ type, children: [{ text: 'Текст, который можно редактировать' }] }];
  }
};

export const CreationMenuConfig: CreationMenuConfigT[] = [
  { type: Type.TEXT, icon: 'text', label: 'Текст' },
  { type: Type.H1, icon: 'h1', label: 'Заголовок 1' },
  { type: Type.H2, icon: 'h2', label: 'Заголовок 2' },
  { type: Type.H3, icon: 'h3', label: 'Заголовок 3' },
  { type: Type.ORDERED_LIST, icon: 'ol', label: 'Нумерованный список' },
  { type: Type.UNORDERED_LIST, icon: 'ul', label: 'Маркированный список' },
  { type: Type.QUOTE, icon: 'quote', label: 'Цитата' },
  { type: Type.DIVIDER, icon: 'divider', label: 'Разделитель' },
];

// export const CreationMenuConfigTest: CreationMenuConfigT[] = [
//   {type: Type.ORDERED_LIST, icon: 'ol', label: 'Нумерованный список'},
//   {type: Type.UNORDERED_LIST, icon: 'ul', label: 'Маркированный список'},
//
// ];

// export const CreationMenuConfigTest1: CreationMenuConfigT[] = [
//   {type: 'ol', icon: 'ol', label: 'Нумерованный список'},
//   {type: 'ul', icon: 'ul', label: 'Маркированный список'},
//   {type: 'quote', icon: 'quote', label: 'Цитата'},
//   {type: 'image', icon: 'image', label: 'Изображение'},
//   {type: 'video', icon: 'video', label: 'Видео'},
//   {type: 'file', icon: 'fileEditor', label: 'Файл'},
// ];
