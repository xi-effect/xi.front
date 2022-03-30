/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// import { Input } from '@mui/material';
import { Box } from '@mui/material';
import { EditorBlock } from 'draft-js';
import * as React from 'react';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type H1Props = {
  props: any;
};

const H1: React.FC<H1Props> = ({ props }) => {
  console.log('props', 'H1');

  return (
    <Box
      sx={{
        minHeight: '32px',
        width: '100%',
      }}>
      <EditorBlock {...props} />
    </Box>
  );
};

export default H1;
