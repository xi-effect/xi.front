/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// import { Input } from '@mui/material';
import { Typography } from '@mui/material';
import * as React from 'react';

type H1Props = {
  children: any;
  attributes: any;
  style: any;
};

const H1: React.FC<H1Props> = ({ children, attributes, style }) => {
  console.log('props', 'H1');

  return (
    <Typography
      variant="h3"
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

export default H1;
