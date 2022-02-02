import * as React from 'react';
import { Editor } from 'draft-js';
import { useEditorApi } from './context';
import cn from 'classnames';
import './TextEditor.scss';

export type TextEditorProps = {
  className?: string;
};

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const { state, onChange } = useEditorApi();

  return (
    <div className={cn('text-editor', className)}>
      <Editor placeholder="Введите ваш текст" editorState={state} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
