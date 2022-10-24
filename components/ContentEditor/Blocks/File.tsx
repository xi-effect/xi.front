import React, { useState, MouseEvent } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import EditorIcon from 'kit/MyIcon/Editor';
import FileMenu, { FileListT } from '../Menus/FileMenu';
import FileListItem from '../Menus/MenuItem/FileListItem';

export type AnchorElT = {
  left: number;
  top: number;
};

type FileT = {
  icon: string;
  text: string;
  type: 'image' | 'video' | 'file';
};

const File: React.FC<FileT> = ({ icon, text, type }) => {
  const [anchorEl, setAnchorEl] = useState<AnchorElT | null>(null);
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [linkPreview, setLinkPreview] = useState<string | null>(null);
  const [filePreviewList, setFilePreviewList] = useState<FileListT[]>([]);

  const deleteFile = (id: string) =>
    setFilePreviewList((list) => list.filter((file) => file.id !== id));

  const openMenu = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const mousePosition = {
      left: e.clientX,
      top: e.clientY - (type === 'file' ? 230 : 290),
    };

    if (type === 'file') {
      if (!target.closest('#file-item')) setAnchorEl(mousePosition);
    } else {
      setAnchorEl(mousePosition);
    }
  };

  return (
    <div contentEditable={false} style={{ width: '100%', height: '100%' }}>
      <Stack
        direction="row"
        id="file-wrapper"
        onClick={openMenu}
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease-in-out',
          border: '1px solid #E6E6E6',
          p: filePreview || linkPreview || filePreviewList.length ? 0 : '18px',
          backgroundColor: filePreview || linkPreview ? '#F5F0FF' : 'transparent',
        }}
      >
        {!filePreview && !linkPreview && !filePreviewList.length && (
          <>
            <EditorIcon name={icon} />

            <Typography
              sx={{
                ml: '15px',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '20px',
              }}
            >
              {text}
            </Typography>
          </>
        )}

        {!!filePreviewList.length && (
          <Stack p={1} width="100%" direction="row" flexWrap="wrap" justifyContent="space-around">
            {filePreviewList.map(({ file, id }) => (
              <FileListItem
                id={id}
                key={id}
                file={file}
                deleteFile={deleteFile}
                styles={{
                  maxWidth: '260px',
                  margin: '5px 0',
                }}
              />
            ))}
          </Stack>
        )}

        {(filePreview || linkPreview) && (
          <Box
            sx={{
              position: 'relative',
              paddingTop: '36%',
              width: '100%',

              'iframe, img': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                objectFit: 'cover',
                borderRadius: '8px',
              },
            }}
          >
            {type === 'image' ? (
              <img
                alt="file"
                src={filePreview ? window.URL.createObjectURL(filePreview) : `${linkPreview}`}
              />
            ) : (
              <iframe
                frameBorder="0"
                allowFullScreen
                title={filePreview ? filePreview.name : 'video player'}
                src={filePreview ? window.URL.createObjectURL(filePreview) : `${linkPreview}`}
                allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            )}
          </Box>
        )}
      </Stack>

      <FileMenu
        type={type}
        text={text}
        anchorEl={anchorEl}
        setLinkPreview={setLinkPreview}
        setFilePreview={setFilePreview}
        setFilePreviewList={setFilePreviewList}
        onClose={() => setAnchorEl(null)}
      />
    </div>
  );
};

export default File;
