/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from "react";
import { Editor } from "draft-js";
import cn from "classnames";
import { useEditorApi } from "./context";
// import "./TextEditor.scss";

export type TextEditorProps = {
  className?: string;
};

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const { state, onChange } = useEditorApi();

  return (
    <div className={cn(className)}>
      <Editor placeholder="Введите ваш текст" editorState={state} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
