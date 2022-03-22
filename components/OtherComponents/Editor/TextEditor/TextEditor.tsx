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
import { inject, observer } from 'mobx-react';
// import { Box } from '@mui/material';

import { styleMap } from '../config';
import SelectionFn from './SelectionFn';

export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
export type SyntheticEvent = React.SyntheticEvent<{}>;

export type EditorMode = 'editor' | 'chat';
export interface TextEditorProps extends EditorProps {
  editorRef?: React.RefObject<Editor>;
  readOnly?: boolean;
  contentEditorSt: any;
}

const TextEditor: React.FC<TextEditorProps> = inject('contentEditorSt')(
  observer((props) => {
    const {
      // editorMode,
      editorRef,
      readOnly = false,
      contentEditorSt,
    } = props;

    return (
      <Editor
        {...props}
        ref={editorRef}
        readOnly={readOnly}
        customStyleMap={styleMap}
        blockRendererFn={SelectionFn}
        editorState={contentEditorSt.editorState}
        onChange={contentEditorSt.onChangeFn}
        keyBindingFn={contentEditorSt.handleKeyBinding}
        handlePastedText={contentEditorSt.handlePastedText}
        handleBeforeInput={contentEditorSt.handleBeforeInput}
      />
    );
  }),
);

export default TextEditor;
