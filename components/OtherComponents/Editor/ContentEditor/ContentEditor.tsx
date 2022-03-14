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
  ContentBlock,
  // ContentState,
  Editor,
  EditorProps,
  EditorState,
  genKey,
  RichUtils,
} from 'draft-js';
import 'react-virtualized/styles.css';
import { Box, Button } from '@mui/material';
import { EmojiData } from 'emoji-mart';
import { useMenuState } from '@szhsin/react-menu';
import { List } from 'immutable';
import TextEditor from '../TextEditor/TextEditor';
import InlineToolPanel from '../InlineToolPanel/InlineToolPanel';
import { insertCustomEmoji, insertEmoji } from '../utils';

const newBlockAdd = (direction, editorState) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const currentBlock = contentState.getBlockForKey(selection.getEndKey());

  const blockMap = contentState.getBlockMap();
  // Split the blocks
  const blocksBefore = blockMap.toSeq().takeUntil((v) => v === currentBlock);
  const blocksAfter = blockMap
    .toSeq()
    .skipUntil((v) => v === currentBlock)
    .rest();
  const newBlockKey = genKey();
  let newBlocks =
    direction === 'before'
      ? [
          [
            newBlockKey,
            new ContentBlock({
              key: newBlockKey,
              type: 'h1',
              text: 'текст блока h1',
              characterList: List(),
            }),
          ],
          [currentBlock.getKey(), currentBlock],
        ]
      : [
          [currentBlock.getKey(), currentBlock],
          [
            newBlockKey,
            new ContentBlock({
              key: newBlockKey,
              type: 'h1',
              text: 'текст блока h1',
              characterList: List(),
            }),
          ],
        ];
  const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap();
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection,
  });
  return EditorState.push(editorState, newContentState, 'insert-fragment');
};

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
    console.log('newState', newState);
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

  const handleToggleInlineStyleType = (type: string) => {
    onChangeFn(RichUtils.toggleInlineStyle(editorState, type));
  };

  // const handleToggleBlockType = (type: string) => {
  //   onChangeFn(RichUtils.toggleBlockType(editorState, type));
  // };

  const handleAddEmoji = (emoji: EmojiData) => {
    let newEditorState;

    if ('native' in emoji) {
      newEditorState = insertEmoji(editorState, emoji.native);
    } else {
      newEditorState = insertCustomEmoji(editorState, emoji.imageUrl);
    }

    onChangeFn(EditorState.moveFocusToEnd(newEditorState));
  };

  const addEmptyBlock = () => {
    const newState = newBlockAdd('after', editorState);
    setEditorState(newState);
  };

  return (
    <Box sx={{ width: '100%', p: 2, mt: 4 }}>
      <TextEditor
        {...props}
        editorRef={editorRef}
        readOnly={false}
        editorState={editorState}
        onChange={onChangeFn}
      />
      <InlineToolPanel
        editorState={editorState}
        editorRef={editorRef}
        menuProps={menuProps}
        toggleMenu={toggleMenu}
        anchorPoint={anchorPoint}
        onToggleInlineStyleType={handleToggleInlineStyleType}
        onAddEmoji={handleAddEmoji}
      />
      <Button onClick={() => addEmptyBlock()}>Добавить</Button>
    </Box>
  );
}

export default ContentEditor;
