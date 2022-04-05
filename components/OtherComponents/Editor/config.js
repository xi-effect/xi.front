/* eslint-disable import/prefer-default-export */
// @ts-nocheck
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';

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
  { type: 'unstyled', label: 'Текст', description: 'просто начните писать здесь' },
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
