/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Typography } from '@mui/material';
import * as React from 'react';

type QuoteProps = {
  // item: string;
  children: any;
};

const Quote: React.FC<QuoteProps> = ({ children }) => (
  <Typography
    component='blockquote'
    sx={{
      p: 2,
      borderLeft: 1,
      borderColor: 'white',
      display: 'flex',
      alignItems: 'center'
    }}>
    {children}
  </Typography>
);
export default Quote;
