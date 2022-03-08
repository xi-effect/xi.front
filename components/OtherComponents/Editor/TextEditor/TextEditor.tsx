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
  DraftHandleValue,
  Editor,
  EditorProps,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from 'draft-js';
// import ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
import { Box } from '@mui/material';
import { Map } from 'immutable';

import { indigo, orange } from '@mui/material/colors';
import {
  // insertCustomEmoji,
  // insertEmoji,
  // insertMention,
  removeCurrentBlockText,
} from '../utils';


export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
export type SyntheticEvent = React.SyntheticEvent<{}>;

export const styleMap = {
  UNDERLINE: {
    textDecoration: 'underline',
  },
  STRKIETHROUGH: {
    textDecoration: 'line-through',
  },
  CODE: {
    color: orange[600],
    border: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: '0.75rem',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
  },
  MENTION: {
    color: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: indigo[200],
    fontSize: '0.75rem',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
  },
};

const blockRenderMap = Map({
  unstyled: {
    element: 'div',
  },
  'code-block': {
    element: 'code',
    wrapper: <pre spellCheck="false" />,
  },
  blockquote: {
    element: 'blockquote',
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <ol />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <ul />,
  },
});

export type EditorMode = 'editor' | 'chat';
export interface TextEditorProps extends EditorProps {
  editorRef?: React.RefObject<Editor>; 
  readOnly?: boolean;
  editorMode?: EditorMode;
  // mentions?: Mention[];
  // onDragDropFiles?: (acceptedFiles: File[]) => UploadFile[];
  // onExtraButtonClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHandleKeyBinding?: (e: SyntheticKeyboardEvent) => string | null;
  // onHandlePastedText?: (
  //   text: string,
  //   html: string | undefined,
  //   editorState: EditorState,
  // ) => DraftHandleValue;
  // onHandleKeyCommand?: (
  //   command: string,
  //   editorState: EditorState,
  //   eventTimeStamp: number,
  // ) => DraftHandleValue;
  // onHandleReturn?: (e: SyntheticKeyboardEvent, editorState: EditorState) => DraftHandleValue;
  onHandleBeforeInput?: (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number,
  ) => DraftHandleValue;
  // onHandleMentionClick?: (mention: Mention) => void;
}

function TextEditor(props: TextEditorProps) {
  const {
    // editorMode,
    editorRef,
    editorState,
    onChange,
    readOnly = false,
    // mentions,
    // onDragDropFiles,
    // onExtraButtonClick,
    onHandleKeyBinding,
    // onHandlePastedText,
    // onHandleKeyCommand,
    // onHandleReturn,
    onHandleBeforeInput,
    // onHandleMentionClick,
  } = props;

  const smartKeyCommand = (type: 'block' | 'inline', style: string, editorState: EditorState) => {
    if (type === 'block') {
      onChange(EditorState.moveFocusToEnd(RichUtils.toggleBlockType(editorState, style)));
    } else {
      onChange(EditorState.moveFocusToEnd(RichUtils.toggleInlineStyle(editorState, style)));
    }
  };

  const markdownShortcut = (editorState: EditorState) => {
    const selection = editorState.getSelection();
    const command = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getText();

    switch (command) {
      case '-':
        smartKeyCommand('block', 'unordered-list-item', removeCurrentBlockText(editorState));
        return 'handled';
      case '>':
        smartKeyCommand('block', 'blockquote', removeCurrentBlockText(editorState));
        return 'handled';
      case '``':
        smartKeyCommand('block', 'code-block', removeCurrentBlockText(editorState));
        return 'handled';
      case '*':
        smartKeyCommand('block', 'ordered-list-item', removeCurrentBlockText(editorState));
        return 'handled';
      default:
        return 'not-handled';
    }
  };

  const handleBeforeInput = (chars: string, editorState: EditorState, eventTimeStamp: number) => {
    // if (chars === '@') _mentionShortcut(editorState);
    if (chars === ' ' || chars === '`') {
      return markdownShortcut(editorState);
    }

    return onHandleBeforeInput
      ? onHandleBeforeInput(chars, editorState, eventTimeStamp)
      : 'not-handled';
  };

  const handleKeyBinding = (e: SyntheticKeyboardEvent) => {
    if (e.metaKey && e.key === 'z') {
      return 'editor-undo';
    }

    return onHandleKeyBinding ? onHandleKeyBinding(e) : getDefaultKeyBinding(e);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Editor
        {...props}
        ref={editorRef}
        readOnly={readOnly}
        placeholder="Напишите тут"
        customStyleMap={styleMap}
        blockRenderMap={blockRenderMap}
        editorState={editorState}
        onChange={onChange}
        keyBindingFn={handleKeyBinding}
        handleBeforeInput={handleBeforeInput}
      />
    </Box>
  );
}

export default TextEditor;
