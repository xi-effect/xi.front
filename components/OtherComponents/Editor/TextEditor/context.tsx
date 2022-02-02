/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from "react";
import { EditorApi, useEditor } from "./useEditor";

const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

export const useEditorApi = () => {
  const context = React.useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error("useEditorApi must be used within TextEditorProvider");
  }

  return context;
};

export const TextEditorProvider: React.FC = ({ children }) => {
  const editorApi = useEditor();

  return <TextEditorContext.Provider value={editorApi}>{children}</TextEditorContext.Provider>;
};
