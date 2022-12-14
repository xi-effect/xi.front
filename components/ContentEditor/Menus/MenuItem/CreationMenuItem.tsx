/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import { CreationMenuConfigT, editorExample } from 'kit/Editor/common/menuConfig';
import EditorIcon from 'kit/MyIcon/Editor';
import { EditorsT } from 'kit/Editor/ContentEditor';
import { Type } from 'kit/Editor/common/withListsPlugin';

type MenuElementT = {
  index: number;
  closeMenu: () => void;
  elem: CreationMenuConfigT;
  onClick?: (type: Type) => void;
  setEditors: React.Dispatch<React.SetStateAction<EditorsT[]>>;
};

const CreationMenuItem: React.FC<MenuElementT> = (props) => {
  const {
    index,
    onClick,
    closeMenu,
    setEditors,
    elem: { label, icon, type },
  } = props;
  const [hover, setHover] = useState(false);

  const addBaseNode = () => {
    if (onClick) onClick(type);

    closeMenu();
    setEditors((editors) => {
      const newEditors = [...editors];
      newEditors.splice(index + 1, 0, editorExample(type));
      return newEditors;
    });
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

