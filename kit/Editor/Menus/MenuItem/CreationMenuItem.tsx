import * as React from 'react';
import { useState } from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import { Descendant, Editor, Transforms } from 'slate';
import { CreationMenuConfigT } from '../../common/menuConfig';
import EditorIcon from '../../../MyIcon/Editor';

type MenuElementT = {
  elem: CreationMenuConfigT;
  editor: Editor;
  index: number;
  closeMenu: () => void;
};

const CreationMenuItem: React.FC<MenuElementT> = (props) => {
  const {
    editor,
    index,
    closeMenu,
    elem: { label, icon, type },
  } = props;
  const [hover, setHover] = useState(false);

  return (
    <MenuItem
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        Transforms.insertNodes(
          editor,
          {
            type,
            id: new Date().getUTCMilliseconds(),
            children: [{ text: 'Текст, который можно редактировать' }],
          } as Descendant,
          { at: [index + 1] },
        );
        closeMenu();
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <EditorIcon color={hover ? '#445AFF' : '#333'} name={icon} />

        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          {label}
        </Typography>
      </Stack>
    </MenuItem>
  );
};

export default CreationMenuItem;
