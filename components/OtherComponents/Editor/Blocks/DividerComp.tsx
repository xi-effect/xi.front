/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Divider } from '@mui/material';
import * as React from 'react';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type DividerProps = {
  // item: string;
  // children: React.ReactElement;
};

const DividerComp: React.FC<DividerProps> = () => (
  <Divider flexItem sx={{ height: '1px', width: '100%', bgcolor: 'text.primary', mt: 3 }} />
);
export default DividerComp;
