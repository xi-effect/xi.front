/* eslint-disable react/function-component-definition */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
// @flow
import React from 'react';
import { Editor, EditorProps } from 'draft-js';
import 'react-virtualized/styles.css';
// import { inject, observer } from 'mobx-react';
// import { Box } from '@mui/material';

import { Box } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import { styleMap } from '../config';
import SelectionFn from './SelectionFn';

export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
export type SyntheticEvent = React.SyntheticEvent<{}>;

export type EditorMode = 'editor' | 'chat';
export interface TextEditorProps extends EditorProps {
  editorRef?: React.RefObject<Editor>;
  readOnly?: boolean;
  editorState: any;
  onChange: any;
  keyBindingFn: any;
  handlePastedText: any;
  handleBeforeInput: any;
  contentEditorSt: any;
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const {
    // editorMode,
    editorRef,
    readOnly = false,
    editorState,
    onChange,
    keyBindingFn,
    handlePastedText,
    handleBeforeInput,
  } = props;

  return (
    <Droppable droppableId="list">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          <Editor
            {...props}
            ref={editorRef}
            readOnly={readOnly}
            customStyleMap={styleMap}
            blockRendererFn={SelectionFn}
            editorState={editorState}
            onChange={onChange}
            keyBindingFn={keyBindingFn}
            handlePastedText={handlePastedText}
            handleBeforeInput={handleBeforeInput}
          />
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default TextEditor;
