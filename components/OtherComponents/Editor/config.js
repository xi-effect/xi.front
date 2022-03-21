/* eslint-disable import/prefer-default-export */
// @ts-nocheck
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import { indigo, orange } from '@mui/material/colors';
// import { Map } from 'immutable';

// import Block from './ContentEditor/Block.tsx';

export const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD',
    component: <FormatBoldIcon />,
  },
  {
    label: 'Italic',
    style: 'ITALIC',
    component: <FormatItalicIcon />,
  },
  {
    label: 'Strike Through',
    style: 'STRIKETHROUGH',
    component: <StrikethroughSIcon />,
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    component: <FormatUnderlinedIcon />,
  },
  {
    label: 'Code',
    style: 'CODE',
    component: <CodeIcon />,
  },
];

export const BlockStyles = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

export const NewBlocks = [
  { type: 'text', label: 'Текст', description: 'просто начните писать здесь' },
  { type: 'h1', label: 'Заголовок 1', description: 'большой заголовок' },
  { type: 'h2', label: 'Заголовок 2', description: 'средний заголовок' },
  { type: 'h3', label: 'Заголовок 3', description: 'маленький заголовок' },
  {
    type: 'ul',
    label: 'Маркированный список',
    description: 'создайте простой маркированный список',
  },
  { type: 'ol', label: 'Нумерованный список', description: 'создайте простой нумерованный список' },
  { type: 'divider', label: 'Разделитель', description: 'визуально разделите блоки' },
  { type: 'quote', label: 'Цитата', description: 'создайте цитату' },
];

export const styleMap = {
  UNDERLINE: {
    textDecoration: 'underline',
  },
  STRKIETHROUGH: {
    textDecoration: 'line-through',
  },
  CODE: {
    color: orange[600],
    border: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: '1.25rem',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
  },
  MENTION: {
    color: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: indigo[200],
    fontSize: '0.75rem',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
  },
};

// export const blockRenderMap = Map({
//   h1: {
//     element: 'h1',
//     wrapper: <Block />,
//   },
//   unstyled: {
//     element: 'div',
//     wrapper: <Block />,
//   },
//   'code-block': {
//     element: 'code',
//     wrapper: <pre spellCheck="false" />,
//   },
//   blockquote: {
//     element: 'blockquote',
//   },
//   'ordered-list-item': {
//     element: 'li',
//     wrapper: <ol />,
//   },
//   'unordered-list-item': {
//     element: 'li',
//     wrapper: <ul />,
//   },
// });

export const BlocksTypeDict = {
  text: { type: 'text', value: '' },
  h1: { type: 'h1', value: '' },
  h2: { type: 'h2', value: '' },
  h3: { type: 'h3', value: '' },
  ul: { type: 'ul', value: '' },
  ol: { type: 'ol', value: '' },
  divider: { type: 'divider' },
  quote: { type: 'quote', value: '' },
};
