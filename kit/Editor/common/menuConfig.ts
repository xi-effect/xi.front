/* eslint-disable import/prefer-default-export */
// @ts-nocheck

export type CreationMenuConfigT = {
  type: string;
  icon: string;
  label: string;
};

export const CreationMenuConfig: CreationMenuConfigT[] = [
  { type: 'text', icon: 'text', label: 'Текст' },
  { type: 'h1', icon: 'h1', label: 'Заголовок 1' },
  { type: 'h2', icon: 'h2', label: 'Заголовок 2' },
  { type: 'h3', icon: 'h3', label: 'Заголовок 3' },
  { type: 'ol', icon: 'ol', label: 'Нумерованный список' },
  { type: 'ul', icon: 'ul', label: 'Маркированный список' },
  { type: 'quote', icon: 'quote', label: 'Цитата' },
  { type: 'divider', icon: 'divider', label: 'Разделитель' },
  { type: 'image', icon: 'image', label: 'Изображение' },
  { type: 'video', icon: 'video', label: 'Видео' },
  { type: 'file', icon: 'fileEditor', label: 'Файл' },
];
