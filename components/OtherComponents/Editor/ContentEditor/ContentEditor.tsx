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
import { Editor, EditorProps, EditorState } from 'draft-js';
import 'react-virtualized/styles.css';
import { Box } from '@mui/material';
import { useMenuState } from '@szhsin/react-menu';
import TextEditor from '../TextEditor/TextEditor';
import InlineToolPanel from '../InlineToolPanel/InlineToolPanel';

export interface ContentEditorProps extends EditorProps {
  readOnly?: boolean;
  editorRef?: React.RefObject<Editor>;
  setEditorState: (newState: EditorState) => void;
}

function ContentEditor(props: ContentEditorProps) {
  const { editorRef, editorState, setEditorState } = props;

  const [menuProps, toggleMenu] = useMenuState();
  console.log('menuProps', menuProps);
  const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });

  function onChangeFn(newState: any) {
    const currentContentState = editorState.getCurrentContent();
    const newContentState = newState.getCurrentContent();
    setEditorState(newState);
    if (currentContentState !== newContentState) {
      // There was a change in the content
    } else {
      // The change was triggered by a change in focus/selection
      const selection = window.getSelection();
      // Resets when the selection has a length of 0
      if (!selection || selection.anchorOffset === selection.focusOffset) {
        return;
      }

      const getBoundingClientRect = () => {
        if (selection && selection.rangeCount >= 1)
          return selection.getRangeAt(0).getBoundingClientRect();
        return null;
      };
      const values = getBoundingClientRect();
      // console.log('values', values);
      if (values) {
        setAnchorPoint({
          x: values.x,
          y: values.y - 48,
        });
        toggleMenu(true);
      }
    }
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <TextEditor
        {...props}
        editorRef={editorRef}
        readOnly={false}
        editorState={editorState}
        onChange={onChangeFn}
      />
      <InlineToolPanel
        editorRef={editorRef}
        menuProps={menuProps}
        toggleMenu={toggleMenu}
        anchorPoint={anchorPoint}
      />
    </Box>
  );
}

export default ContentEditor;
