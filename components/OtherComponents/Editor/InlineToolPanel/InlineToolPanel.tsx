/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import styled from '@emotion/styled';
import { menuSelector } from '@szhsin/react-menu/style-utils';
import { ControlledMenu as ControlledMenuInner } from '@szhsin/react-menu';
import { Paper, Stack, Button, Tooltip } from '@mui/material';

import '@szhsin/react-menu/dist/index.css';
import { INLINE_STYLES } from '../config';

const ControlledMenu = styled(ControlledMenuInner)`
  ${menuSelector.name} {
    background-color: transparent;
  }
`;

const StyleButton = ({
  label,
  active,
  style,
  component,
  onToggle,
}: {
  label: string;
  active: boolean;
  style: string;
  component: JSX.Element;
  onToggle: (type: string) => void;
}) => {
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onToggle(style);
  };

  return (
    <Tooltip title={label} placement="top">
      <Button sx={{ color: active ? '#333' : '#fff', minWidth: 16 }} onMouseDown={handleToggle}>
        {component}
      </Button>
    </Tooltip>
  );
};

export type InlineToolPanelProps = {
  editorState: any;
  editorRef: any;
  menuProps: any;
  toggleMenu: any;
  anchorPoint: any;
  onToggleInlineStyleType: (type: string) => void;
};

const InlineToolPanel: React.FC<InlineToolPanelProps> = (props: InlineToolPanelProps) => {
  const {
    editorState,
    editorRef,
    menuProps,
    toggleMenu,
    anchorPoint,
    onToggleInlineStyleType,
  } = props;
  console.log('editorRef', editorRef);

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <ControlledMenu {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(false)}>
      <Paper
        sx={{
          bgcolor: 'primary.main',
          // width: 300,
          // height: 36,
        }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          {INLINE_STYLES.map((type) => (
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              component={type.component}
              onToggle={onToggleInlineStyleType}
              style={type.style}
            />
          ))}
        </Stack>
      </Paper>
    </ControlledMenu>
  );
};

export default InlineToolPanel;
