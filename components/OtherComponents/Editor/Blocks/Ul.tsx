/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Typography } from '@mui/material';
import * as React from 'react';
import LensIcon from '@mui/icons-material/Lens';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type UlProps = {
  // item: string;
  // children: React.ReactElement;
};

const Ul: React.FC<UlProps> = ({ children }) => (
  <>
    <LensIcon sx={{ ml: 1, mr: 2, fontSize: 12 }} />
    <Typography>{children}</Typography>
  </>
);
export default Ul;
