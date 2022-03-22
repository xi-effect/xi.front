/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { EditorBlock } from 'draft-js';
import { Box } from '@mui/material';

import * as React from 'react';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type TextProps = {
  props: any;
};

const Text: React.FC<TextProps> = ({ props }) => {
  console.log('props', props);

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

export default Text;
