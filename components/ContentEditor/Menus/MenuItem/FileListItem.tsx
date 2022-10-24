/* eslint-disable no-unused-vars */
import React, { CSSProperties } from 'react';
import EditorIcon from 'kit/MyIcon/Editor';
import { Clear } from '@mui/icons-material';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

type FileListItemT = {
  id: string;
  file: File;
  styles?: CSSProperties;
  deleteFile: (id: string) => void;
};

const FileListItem: React.FC<FileListItemT> = ({ deleteFile, file, id, styles }) => (
  <Stack
    id="file-item"
    direction="row"
    alignItems="center"
    sx={{
      p: '14px',
      height: '70x',
      width: '100%',
      m: '0 0 16px 0',
      cursor: 'default',
      borderRadius: '8px',
      border: '1px solid #E6E6E6',
      ...styles,
    }}
  >
    <EditorIcon name="fileEditorMedium" />

    <Stack mr="auto" ml="15px">
      <Typography
        sx={{
          mb: '8px',
          width: '140px',
          fontWeight: 500,
          fontSize: '16px',
          overflow: 'hidden',
          lineHeight: '20px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {file.name}
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '16px',
          color: '#333',
        }}
      >
        {`${Number((file.size / 1048576).toFixed(2))} Мб`}
      </Typography>
    </Stack>

    <Tooltip title="Удалить файл">
      <IconButton onClick={() => deleteFile(id)}>
        <Clear sx={{ color: '#333' }} />
      </IconButton>
    </Tooltip>
  </Stack>
);

export default FileListItem;
