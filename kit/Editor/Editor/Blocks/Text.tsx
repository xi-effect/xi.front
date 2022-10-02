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
};

const Text: React.FC<TextProps> = ({ children, attributes }) => {
  console.log('props', 'Text');
  console.log(attributes);
  return (
    <Typography
      {...attributes}
      sx={{
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
      }}
    >
      {children}
    </Typography>
  );
};

export default Text;
