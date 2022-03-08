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

type H1Props = {
  // item: string;
  children: React.ReactElement | string;
};

const H1: React.FC<H1Props> = ({ children }) => <Typography variant='h4'>{children}</Typography>;
export default H1;
