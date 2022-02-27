/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Typography, Divider } from '@mui/material';
import * as React from 'react';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type QuoteProps = {
  // item: string;
  // children: React.ReactElement;
};

const Quote: React.FC<QuoteProps> = ({ children }) => (
  <>
    <Divider
      orientation="vertical"
      sx={{
        bgcolor: 'text.secondary',
        height: '100%',
        minHeight: '48px',
        width: '4px',
        borderRadius: '2px',
        ml: 2,
      }}
    />
    <Typography
      sx={{
        p: 2,
      }}>
      {children}
    </Typography>
  </>
);
export default Quote;
