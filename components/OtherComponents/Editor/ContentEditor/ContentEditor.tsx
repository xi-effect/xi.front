/* eslint-disable react/function-component-definition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
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
import {
  // ContentState,
  Editor,
  EditorProps,
} from 'draft-js';
import 'react-virtualized/styles.css';
import { Box } from '@mui/material';
import { inject, observer } from 'mobx-react';
import TextEditor from '../TextEditor/TextEditor';
import InlineToolPanel from '../InlineToolPanel/InlineToolPanel';

export interface ContentEditorProps extends EditorProps {
  editorRef?: React.RefObject<Editor>;
  contentEditorSt: any;
}

const ContentEditor: React.FC<ContentEditorProps> = inject('contentEditorSt')(
  observer((props) => {
    const { editorRef } = props;

    return (
      <Box sx={{ width: '100%', height: '100%', p: 2, mt: 4 }}>
        <TextEditor {...props} editorRef={editorRef} readOnly={false} />
        <InlineToolPanel editorRef={editorRef} />
      </Box>
    );
  }),
);

export default ContentEditor;
