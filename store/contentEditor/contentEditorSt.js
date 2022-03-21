/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { observable, makeObservable, action } from 'mobx';

import {
  ContentState,
  convertFromHTML,
  // DraftHandleValue,
  // Editor,
  // EditorProps,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
  genKey,
  ContentBlock,
} from 'draft-js';

import { List } from 'immutable';
import { insertCustomEmoji, insertEmoji, removeCurrentBlockText } from '../../components/OtherComponents/Editor/utils';

class ContentEditorSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable editorState = EditorState.createEmpty();

  @action setEditorState = (value) => {
    this.editorState = value;
  };

  @observable editorMeta = {
    anchorPoint: {
      x: 0,
      y: 0,
    }
  }

  @action setEditorMeta = (name, value) => {
    this.editorMeta[name] = value;
  };

  @action onChangeFn = (newState) => {
    const currentContentState = this.editorState.getCurrentContent();
    const newContentState = newState.getCurrentContent();
    console.log('newState', newState);
    this.setEditorState(newState);
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
        this.setEditorMeta("anchorPoint", {
          x: values.x,
          y: values.y - 48,
        });
      }
    }
  };

  @action handleToggleInlineStyleType = (type) => {
    this.onChangeFn(RichUtils.toggleInlineStyle(this.editorState, type));
  };

  @action handleToggleBlockType = (type) => {
    this.onChangeFn(RichUtils.toggleBlockType(this.editorState, type));
  };

  @action handleAddEmoji = (emoji) => {
    let newEditorState;

    if ('native' in emoji) {
      newEditorState = insertEmoji(this.editorState, emoji.native);
    } else {
      newEditorState = insertCustomEmoji(this.editorState, emoji.imageUrl);
    }

    this.onChangeFn(EditorState.moveFocusToEnd(newEditorState));
  };

  @action newBlockAdd = (direction, editorState) => {
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
    const newBlocks =
      direction === 'before'
        ? [
          [
            newBlockKey,
            new ContentBlock({
              key: newBlockKey,
              type: '',
              text: '',
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
              type: '',
              text: '',
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

  @action smartKeyCommand = (type, style, editorState) => {
    if (type === 'block') {
      this.onChangeFn(EditorState.moveFocusToEnd(RichUtils.toggleBlockType(editorState, style)));
    } else {
      this.onChangeFn(EditorState.moveFocusToEnd(RichUtils.toggleInlineStyle(editorState, style)));
    }
  };

  @action markdownShortcut = (editorState) => {
    const selection = editorState.getSelection();
    const command = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getText();

    switch (command) {
      case '-':
        this.smartKeyCommand('block', 'unordered-list-item', removeCurrentBlockText(editorState));
        return 'handled';
      case '>':
        this.smartKeyCommand('block', 'blockquote', removeCurrentBlockText(editorState));
        return 'handled';
      case '``':
        this.smartKeyCommand('block', 'code-block', removeCurrentBlockText(editorState));
        return 'handled';
      case '*':
        this.smartKeyCommand('block', 'ordered-list-item', removeCurrentBlockText(editorState));
        return 'handled';
      default:
        return 'not-handled';
    }
  };

  handleBeforeInput = (chars, editorState) => { // eventTimeStamp
    // if (chars === '@') _mentionShortcut(editorState);
    if (chars === ' ' || chars === '`') {
      return this.markdownShortcut(editorState);
    }

    return 'not-handled'; // onHandleBeforeInput ? this.onHandleBeforeInput(chars, editorState, eventTimeStamp) :
  };

  handleKeyBinding = (e) => {
    if (e.metaKey && e.key === 'z') {
      return 'editor-undo';
    }

    return getDefaultKeyBinding(e);
  };

  handlePastedText = (text, html, editorState) => {
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
      this.onChangeFn(EditorState.moveFocusToEnd(newEditorState));

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
      this.onChangeFn(EditorState.moveFocusToEnd(newEditorState));

      return 'handled';
    }

    return 'not-handled'; // onHandlePastedText ? onHandlePastedText(text, html, editorState) :
  };
}

export default ContentEditorSt;
