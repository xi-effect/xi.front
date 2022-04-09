/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Typography } from '@mui/material';
import * as React from 'react';

type H2Props = {
  children: any;
  attributes: any;
  style: any;
};

const H2: React.FC<H2Props> = ({ children, attributes, style }) => {
  console.log('props', 'H2');

  return (
    <Typography
      variant="h4"
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

export default H2;
