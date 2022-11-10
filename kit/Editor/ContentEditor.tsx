/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { Box } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { handlingEditors } from 'utils/handlingEditors';
import EditorSample from 'components/ContentEditor/Editor/EditorSample';
import { Type } from './common/withListsPlugin';

export type EditorsT = { id: string; type: Type };
export type ChangeEditorsT = (
  options: { startIndex: number; endIndex: number } | null,
) => (index: number) => void;

const ContentEditor = () => {
  const [editors, setEditors] = useState<EditorsT[]>([{ id: v4(), type: Type.TEXT }]);

  const changeEditors = (options: { startIndex: number; endIndex: number } | null) => {
    if (options) handlingEditors(setEditors, options);

    return (index: number) => handlingEditors(setEditors, null)(index);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    changeEditors({
      startIndex: result.source.index,
      endIndex: result.destination.index,
    });
  };

  return (
    <Box
      sx={{
        height: '100%',
        padding: '30px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflowY: 'scroll',
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {editors.map((e) => (
                <EditorSample
                  key={e.id}
                  current={e}
                  editors={editors}
                  setEditors={setEditors}
                  changeEditors={changeEditors}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ContentEditor;
