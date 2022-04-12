/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable react/function-component-definition */
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
import { Box } from '@mui/material';
import { Slate, Editable, withReact } from 'slate-react';
import { useLocalStorage } from 'react-use';
import { createEditor, Descendant, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { css } from '@emotion/css';
import InlineToolPanel, { toggleFormat } from '../InlineToolPanel/InlineToolPanel';
import Block from './Block';

// eslint-disable-next-line react/prop-types
const Leaf = ({ attributes, children, leaf }) => {
  // eslint-disable-next-line react/prop-types
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  // eslint-disable-next-line react/prop-types
  if (leaf.code) {
    children = <code
      className={css`
        background-color: #333;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
      `}
    >
      {children}
    </code>;
  }
  // eslint-disable-next-line react/prop-types
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  // eslint-disable-next-line react/prop-types
  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValueDefault = [
  {
    type: 'paragraph',
    id: 1,
    children: [
      {
        text: '',
      },
    ],
  },
];

type Props = {
  initialState?: any;
  pageId?: any;
};

const ContentEditor: React.FC<Props> = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { initialState, pageId } = props;

  const [value, setValue] = React.useState<Descendant[]>(initialState || initialValueDefault);
  // @ts-ignore
  const editor = React.useMemo(() => withHistory(withReact(createEditor())), []);

  // eslint-disable-next-line no-unused-vars
  const [storage, setStorage, remove] = useLocalStorage(`page-${pageId}`);

  const handleChange = (value) => {
    setValue(value);
    setStorage(value)
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    Transforms.moveNodes(editor, {
      at: [result.source.index],
      to: [result.destination.index],
    });
  };

  return (
    <Box sx={{ width: 'calc(100% - 88px)', height: '100%', mt: 4, ml: 2, mr: 9 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              <Slate editor={editor} value={value} onChange={handleChange}>
                <InlineToolPanel />
                <Editable
                  renderElement={(props) => <Block {...props} editor={editor} value={value} />}
                  renderLeaf={(props) => <Leaf {...props} />}
                  placeholder="Enter some text..."
                  onDOMBeforeInput={(event: InputEvent) => {
                    // event.preventDefault();
                    switch (event.inputType) {
                      case 'formatBold':
                        return toggleFormat(editor, 'bold');
                      case 'formatItalic':
                        return toggleFormat(editor, 'italic');
                      case 'formatUnderline':
                        return toggleFormat(editor, 'underlined');
                      case 'formatCode':
                        return toggleFormat(editor, 'code');
                    }
                  }}
                />
              </Slate>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ContentEditor;
