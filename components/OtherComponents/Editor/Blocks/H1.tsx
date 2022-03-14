/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Input } from '@mui/material';
import * as React from 'react';
// import { Menu, MenuItem, Stack, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import "./TextEditor.scss";

type H1Props = {
  contentState: any;
  blockProps: any;
  block: any;
};

const H1: React.FC<H1Props> = (props) => {
  const { contentState, blockProps, block } = props;
  console.log('contentStateH1', contentState, blockProps, block);
  // const { foo } = props.blockProps;
  // const data = contentState.getEntity(block.getEntityAt(0)).getData();
  // console.log('data', data, foo);
  return <Input value={block.text} />;
};
export default H1;
