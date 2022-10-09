import React, { useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Draggable } from 'react-beautiful-dnd';
import { ReactEditor, withReact } from 'slate-react';
import { withListsReact } from '@prezly/slate-lists';
import { ButtonStyles } from 'kit/Editor/common/styles';
import { Add, DragIndicator } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { ChangeEditorsT, EditorsT } from 'kit/Editor/ContentEditor';
import CreationMenu from 'components/ContentEditor/Menus/CreationMenu';
import ChangesMenu from 'components/ContentEditor/Menus/ChangesMenu';
import SlateSample from 'components/ContentEditor/Editor/SlateSample';
import { withListsPlugin } from 'kit/Editor/common/withListsPlugin';

type EditorT = {
  current: EditorsT;
  editors: EditorsT[];
  changeEditors: ChangeEditorsT;
  setEditors: React.Dispatch<React.SetStateAction<EditorsT[]>>;
};

const EditorSample: React.FC<EditorT> = (props) => {
  const { current, changeEditors, editors, setEditors } = props;

  const [editAnchorEl, setEditAnchorEl] = useState<null | HTMLDivElement>(null);
  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLButtonElement>(null);
  const editor = React.useMemo(
    () => withListsReact(withListsPlugin(withHistory(withReact(createEditor() as ReactEditor)))),
    [],
  );

  const index = editors.findIndex((item) => item.id === current.id);

  return (
    <Draggable draggableId={`list-components-id-${current.id}`} index={index}>
      {(provided) => (
        <Stack
          mb="10px"
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Tooltip title="Добавить элемент">
            <IconButton
              sx={ButtonStyles(!!addAnchorEl, { mr: '5px' })}
              onClick={(e) => setAddAnchorEl(e.currentTarget)}
            >
              <Add sx={{ color: '#333' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Перетащить элемент">
            <Stack
              {...provided.dragHandleProps}
              sx={ButtonStyles(!!editAnchorEl, { p: '8px' })}
              onClick={(e) => setEditAnchorEl(e.currentTarget)}
            >
              <DragIndicator sx={{ color: '#333' }} />
            </Stack>
          </Tooltip>

          <CreationMenu
            anchorEl={addAnchorEl}
            setEditors={setEditors}
            closeMenu={() => setAddAnchorEl(null)}
          />

          <ChangesMenu
            index={index}
            editors={editors}
            anchorEl={editAnchorEl}
            changeEditors={changeEditors}
            closeMenu={() => setEditAnchorEl(null)}
          />

          <SlateSample type={current.type} editor={editor} />
        </Stack>
      )}
    </Draggable>
  );
};

export default EditorSample;
