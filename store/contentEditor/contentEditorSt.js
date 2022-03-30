/* eslint-disable no-restricted-syntax */
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
    },
    focusedBlockKey: null,
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

  @action newBlockAdd = (type = 'unstyled') => {
    const selection = this.editorState.getSelection();
    const contentState = this.editorState.getCurrentContent();
    console.log("key", this.editorMeta.focusedBlockKey);
    const currentBlock = contentState.getBlockForKey(this.editorMeta.focusedBlockKey);

    const blockMap = contentState.getBlockMap()
    // Split the blocks
    const blocksBefore = blockMap.toSeq().takeUntil((v) => v === currentBlock)
    const blocksAfter = blockMap.toSeq().skipUntil((v) => v === currentBlock).rest()
    const newBlockKey = genKey()
    console.log("currentBlock", currentBlock);
    const newBlocks = [
      [currentBlock.getKey(), currentBlock],
      [newBlockKey, new ContentBlock({
        key: newBlockKey,
        type,
        text: '',
        characterList: List(),
      })],
    ];
    const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap()
    const newContentState = contentState.merge({
      blockMap: newBlockMap,
      selectionBefore: selection,
      selectionAfter: selection,
    })
    this.setEditorState(EditorState.push(this.editorState, newContentState, 'insert-fragment'));
  };

  @action duplicateBlock = () => {
    const selection = this.editorState.getSelection();
    const contentState = this.editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(this.editorMeta.focusedBlockKey);

    const blockMap = contentState.getBlockMap()
    // Split the blocks
    const blocksBefore = blockMap.toSeq().takeUntil((v) => v === currentBlock)
    const blocksAfter = blockMap.toSeq().skipUntil((v) => v === currentBlock).rest()
    const newBlockKey = genKey()
    const newBlocks = [
      [currentBlock.getKey(), currentBlock],
      [newBlockKey, new ContentBlock({
        key: newBlockKey,
        type: currentBlock.getType(),
        text: currentBlock.getText(),
        characterList: currentBlock.getCharacterList(),
      })],
    ];
    const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap()
    const newContentState = contentState.merge({
      blockMap: newBlockMap,
      selectionBefore: selection,
      selectionAfter: selection,
    })
    this.setEditorState(EditorState.push(this.editorState, newContentState, 'insert-fragment'));
  };

  @action deleteBlock = () => {
    const contentState = this.editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(this.editorMeta.focusedBlockKey);
    const blockArray = contentState.getBlocksAsArray();
    const currentBlockIndex = blockArray.indexOf(currentBlock);

    blockArray.splice(currentBlockIndex, 1);
    this.setEditorState(
      EditorState.push(
        this.editorState,
        ContentState.createFromBlockArray(blockArray),
        'move-block',
      ),
    );
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

  @action handleBeforeInput = (chars, editorState) => { // eventTimeStamp
    // if (chars === '@') _mentionShortcut(editorState);
    if (chars === ' ' || chars === '`') {
      return this.markdownShortcut(editorState);
    }

    return 'not-handled'; // onHandleBeforeInput ? this.onHandleBeforeInput(chars, editorState, eventTimeStamp) :
  };

  @action handleKeyBinding = (e) => {
    if (e.metaKey && e.key === 'z') {
      return 'editor-undo';
    }

    return getDefaultKeyBinding(e);
  };

  @action handlePastedText = (text, html, editorState) => {
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

  @action onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const contentState = this.editorState.getCurrentContent();
    const blockArray = contentState.getBlocksAsArray();
    const removedBlock = blockArray.splice(result.source.index, 1)[0];
    blockArray.splice(result.destination.index, 0, removedBlock);
    this.setEditorState(
      EditorState.push(
        this.editorState,
        ContentState.createFromBlockArray(blockArray),
        'move-block',
      ),
    );
  };
}

export default ContentEditorSt;
