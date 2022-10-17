/* eslint-disable no-unused-vars */
import React from 'react';
import { EditorsT } from 'kit/Editor/ContentEditor';

export function handlingEditors(
  setEditors: React.Dispatch<React.SetStateAction<EditorsT[]>>,
  options: { startIndex: number; endIndex: number } | null,
) {
  if (options) {
    const { startIndex, endIndex } = options;

    setEditors((editors) => {
      const result = Array.from(editors);

      const [removed] = result.splice(startIndex, 1);

      result.splice(endIndex, 0, removed);

      return result;
    });
  }

  return (index: number) => setEditors((editors) => editors.filter((e, i) => i !== index));
}
