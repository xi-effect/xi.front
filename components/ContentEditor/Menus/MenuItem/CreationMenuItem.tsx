/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState } from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import { CreationMenuConfigT, editorExample } from 'kit/Editor/common/menuConfig';
import EditorIcon from 'kit/MyIcon/Editor';
import { EditorsT } from 'kit/Editor/ContentEditor';
import { Type } from 'kit/Editor/common/withListsPlugin';

type MenuElementT = {
  closeMenu: () => void;
  elem: CreationMenuConfigT;
  onClick?: (type: Type) => void;
  setEditors: React.Dispatch<React.SetStateAction<EditorsT[]>>;
};

const CreationMenuItem: React.FC<MenuElementT> = (props) => {
  const {
    onClick,
    closeMenu,
    setEditors,
    elem: { label, icon, type },
  } = props;
  const [hover, setHover] = useState(false);

  const addBaseNode = () => {
    if (onClick) onClick(type);

    closeMenu();
    setEditors((editors) => [...editors, editorExample(type)]);
  };

  return (
    <MenuItem
      onClick={addBaseNode}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
