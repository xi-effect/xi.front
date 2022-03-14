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
import {
  ContentState,
  convertFromHTML,
  DraftHandleValue,
  Editor,
  EditorProps,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from 'draft-js';
// import ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
import { Box } from '@mui/material';

import {
  // insertCustomEmoji,
  // insertEmoji,
  // insertMention,
  removeCurrentBlockText,
} from '../utils';
import { blockRenderMap, styleMap } from '../config';
import H1 from '../Blocks/H1';
import Text from '../Blocks/Text';
import { SelectionHOCProps } from '../types';

export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
export type SyntheticEvent = React.SyntheticEvent<{}>;

export type EditorMode = 'editor' | 'chat';
export interface TextEditorProps extends EditorProps {
  editorRef?: React.RefObject<Editor>;
  readOnly?: boolean;
  editorMode?: EditorMode;
  // mentions?: Mention[];
  // onDragDropFiles?: (acceptedFiles: File[]) => UploadFile[];
  // onExtraButtonClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHandleKeyBinding?: (e: SyntheticKeyboardEvent) => string | null;
  onHandlePastedText?: (
    text: string,
    html: string | undefined,
    editorState: EditorState,
  ) => DraftHandleValue;
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

const SelectionHOC: React.FC<SelectionHOCProps> = (props) => {
  console.log('SelectionHOC', props);
  const { contentState, blockProps, block } = props;
  if (blockProps?.type === 'unstyled') {
    return <Text contentState={contentState} blockProps={blockProps} block={block}/>;
  }
  if (blockProps?.type === 'h1') {
    return <H1 contentState={contentState} blockProps={blockProps} block={block}/>;
  }
  // if (type === 'h2') {
  //   return <H2 />;
  // }
  // if (type === 'h3') {
  //   return <H3 />;
  // }
  // if (type === 'ul') {
  //   return <Ul />;
  // }
  // if (type === 'ol') {
  //   return <Ol />;
  // }
  // if (type === 'divider') {
  //   return <DividerComp />;
  // }
  // if (type === 'quote') {
  //   return <Quote />;
  // }
  return null;
};

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  console.log('contentBlock', contentBlock);
  return {
    // @ts-ignore
    component: SelectionHOC,
    editable: false,
    props: {
      type
    },
  };
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
    onHandlePastedText,
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

  const handlePastedText = (text: string, html: string | undefined, editorState: EditorState) => {
    if (html) {
      const blocksFromHTML = convertFromHTML(html);
      const pastedBlocks = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      ).getBlockMap();

      const newState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        pastedBlocks,
      );

      const newEditorState = EditorState.push(editorState, newState, 'insert-fragment');
      onChange(EditorState.moveFocusToEnd(newEditorState));

      return 'handled';
    }

    if (text) {
      const pastedBlocks = ContentState.createFromText(text).getBlockMap();
      const newState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        pastedBlocks,
      );

      const newEditorState = EditorState.push(editorState, newState, 'insert-fragment');
      onChange(EditorState.moveFocusToEnd(newEditorState));

      return 'handled';
    }

    return onHandlePastedText ? onHandlePastedText(text, html, editorState) : 'not-handled';
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Editor
        {...props}
        ref={editorRef}
        // readOnly={readOnly}
        readOnly
        placeholder="Напишите тут"
        customStyleMap={styleMap}
        blockRenderMap={blockRenderMap}
        blockRendererFn={myBlockRenderer}
        editorState={editorState}
        onChange={onChange}
        keyBindingFn={handleKeyBinding}
        handlePastedText={handlePastedText}
        handleBeforeInput={handleBeforeInput}
      />
    </Box>
  );
}

export default TextEditor;
