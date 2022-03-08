/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import { ControlledMenu } from '@szhsin/react-menu';
import { Paper, Stack, Button } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import '@szhsin/react-menu/dist/index.css';

export type InlineToolPanelProps = {
  editorRef: any;
  menuProps: any;
  toggleMenu: any;
  anchorPoint: any;
};

const InlineToolPanel: React.FC<InlineToolPanelProps> = (props: InlineToolPanelProps) => {
  const { editorRef, menuProps, toggleMenu, anchorPoint } = props;
  console.log('editorRef', editorRef);

  return (
    <ControlledMenu {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(false)}>
      <Paper
        sx={{
          bgcolor: 'primary.main',
          width: 300,
          height: 32,
        }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          {[...Array(5)].map((item, index) => (
            <Button onClick={() => toggleMenu(false)} key={index.toString()}>
              <FormatBoldIcon sx={{ color: 'text.primary' }} />
            </Button>
          ))}
        </Stack>
      </Paper>
    </ControlledMenu>
  );
};

export default InlineToolPanel;
