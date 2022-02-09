/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import {Editor, EditorState} from 'draft-js';
// import "./TextEditor.scss";

export type TextEditorProps = {
  className?: string;
};

const TextEditor: React.FC<TextEditorProps> = () => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default TextEditor;
