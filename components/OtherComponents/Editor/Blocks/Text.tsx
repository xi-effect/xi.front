/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Typography } from '@mui/material';

import * as React from 'react';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type TextProps = {
  children: any;
  attributes: any;
  style: any;
};

const Text: React.FC<TextProps> = ({ children, attributes, style }) => {
  console.log('props', 'Text');

  return (
    <Typography
      {...attributes}
      sx={{
        textAlign: style.textAlign,
        minHeight: '32px',
        width: '100%',
      }}>
      {children}
    </Typography>
  );
};

export default Text;
