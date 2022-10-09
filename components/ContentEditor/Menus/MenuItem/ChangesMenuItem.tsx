import * as React from 'react';
import { useState } from 'react';
import { MenuItem, Stack, Typography } from '@mui/material';
import EditorIcon from '../../../../kit/MyIcon/Editor';

type ChangesMenuItemT = {
  text: string;
  icon: string;
  disabled: boolean;
  handler: () => void;
};

const ChangesMenuItem: React.FC<ChangesMenuItemT> = (props) => {
  const { handler, disabled, text, icon } = props;
  const [hover, setHover] = useState(false);

  return (
    <MenuItem
      onClick={handler}
      disabled={disabled}
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
        <EditorIcon color={hover ? '#F42D2D' : '#333'} name={icon} />

        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          {text}
        </Typography>
      </Stack>
    </MenuItem>
  );
};

export default ChangesMenuItem;
