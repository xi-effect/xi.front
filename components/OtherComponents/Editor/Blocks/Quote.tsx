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
  // children: React.ReactElement;
};

const Quote: React.FC<QuoteProps> = ({ children }) => (
  <Typography
    sx={{
      p: 2,
    }}>
    {children}
  </Typography>
);
export default Quote;
