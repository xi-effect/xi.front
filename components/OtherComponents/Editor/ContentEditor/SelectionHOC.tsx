/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import Text from '../Blocks/Text';
import H1 from '../Blocks/H1';
import H2 from '../Blocks/H2';
import H3 from '../Blocks/H3';
import Ul from '../Blocks/Ul';
import Ol from '../Blocks/Ol';
import DividerComp from '../Blocks/DividerComp';
import Quote from '../Blocks/Quote';
import { SelectionHOCProps } from '../types';

// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

const SelectionHOC: React.FC<SelectionHOCProps> = ({ type, children }) => {
  if (type === 'text') {
    return <Text>{children}</Text>;
  }
  if (type === 'h1') {
    return <H1>{children}</H1>;
  }
  if (type === 'h2') {
    return <H2>{children}</H2>;
  }
  if (type === 'h3') {
    return <H3>{children}</H3>;
  }
  if (type === 'ul') {
    return <Ul>{children}</Ul>;
  }
  if (type === 'ol') {
    return <Ol>{children}</Ol>;
  }
  if (type === 'divider') {
    return <DividerComp>{children}</DividerComp>;
  }
  if (type === 'quote') {
    return <Quote>{children}</Quote>;
  }
  return null;
};

export default SelectionHOC;
