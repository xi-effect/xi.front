/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState, DragEvent, ChangeEvent, KeyboardEvent } from 'react';
import { v4 } from 'uuid';
import { Box, Button, Menu, Stack, TextField, Typography } from '@mui/material';
import { FileMenuButtonS, fileMenuStyles } from 'kit/Editor/common/styles';
import { AnchorElT } from '../Blocks/File';
import FileListItem from './MenuItem/FileListItem';

type AddFileMenuT = {
  text: string;
  onClose: () => void;
  anchorEl: AnchorElT | null;
  type: 'image' | 'video' | 'file';
  setFilePreview: React.Dispatch<React.SetStateAction<File | null>>;
  setLinkPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setFilePreviewList: React.Dispatch<React.SetStateAction<FileListT[] | null>>;
};

export type FileListT = {
  id: string;
  file: File;
};

const FileMenu: React.FC<AddFileMenuT> = (props) => {
  const { anchorEl, onClose, text, type, setFilePreview, setLinkPreview, setFilePreviewList } =
    props;

  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileList, setFileList] = useState<FileListT[]>([]);
  const [loadMethod, setLoadMethod] = useState<'load' | 'link'>('load');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const description = file ? `Добавлен: ${file.name}` : `Перенесите файл или нажмите (до 4 Мб)`;

  const fileSizeMb = (size: number) => Number((size / 1048576).toFixed(2));
  const deleteFile = (id: string) => setFileList((list) => list.filter((file) => file.id !== id));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') addOutputFile();
  };

  const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) checkFileList(e.currentTarget.files);
  };

  const onDropAreaChange = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) checkFileList(e.dataTransfer.files);
  };

  const onFileSrcError = () => {
    if (file || link) setError('Проблема с вашим файлом или ссылкой...');
  };

  const onInputLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);

    setLink(e.currentTarget.value);
  };

  const checkFileList = (list: FileList) => {
    if (type === 'file') {
      const filteredList = [...list]
        .filter((file: File) => fileSizeMb(file.size) < 4)
        .map((file: File) => ({ file, id: v4() }));

      if (fileList.length + filteredList.length > 10) {
        setError('Превышено максимально количество файлов. Максимум 10.');
        setTimeout(() => setError(null), 1000);
      } else {
        setFileList((list) => [...list, ...filteredList]);
      }
    } else if (list.length > 1) {
      setError('Превышено количество файлов, допустимо не более 1.');
    } else if (fileSizeMb(list[0].size) > 4) {
      setError(`Превышен размер более чем 4Мб. Текущий: ${fileSizeMb(list[0].size)}Мб`);
    } else {
      setError(null);
      setFile(list[0]);
    }
  };

  const addOutputFile = () => {
    if (loadMethod === 'link' && link) {
      const linkHandler = (link: string) => {
        closeMenu();
        setLinkPreview(link);
        setFilePreview(null);
      };

      if (type === 'video') {
        const vimeoId = /vimeo.com\/(\d+)/.exec(link);
        const youtubeId =
          /https:\/\/(m\.)?(?:youtu\.be\/|(?:[a-z]{2,3}\.)?youtube\.com\/watch(?:\?|#!)v=)([\w-]{11}).*/gi.exec(
            link,
          );

        if (!youtubeId && !vimeoId) setError('Ссылка не валидная...');

        if (vimeoId) linkHandler(`https://player.vimeo.com/video/${vimeoId[1]}`);

        if (youtubeId) linkHandler(`https://www.youtube.com/embed/${youtubeId[2]}`);
      } else {
        linkHandler(link);
      }
    } else if (type === 'file') {
      closeMenu();
      setFilePreviewList(fileList);
    } else {
      closeMenu();
      setFilePreview(file);
      setLinkPreview(null);
    }
  };

  const changeToDefaultValue = (method?: 'load' | 'link') => {
    const cleatState = () => {
      if (link) setLink(null);
      if (file) setFile(null);
      if (error) setError(null);
      if (fileList.length) setFileList([]);
    };

    if (method) {
      if (loadMethod !== method) {
        cleatState();
        setLoadMethod(method);
      }
    } else {
      cleatState();
      setLoadMethod('load');
    }
  };

  const closeMenu = () => {
    onClose();

    setTimeout(changeToDefaultValue, 200);
  };

  return (
    <Menu
      open={!!anchorEl}
      onClose={closeMenu}
      sx={fileMenuStyles}
      anchorReference="anchorPosition"
      anchorPosition={anchorEl || undefined}
    >
      <Box width="322px">
        {!!fileList.length && (
          <Box
            sx={{
              pr: '5px',
              mb: '20px',
              maxHeight: '300px',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {fileList.map(({ file, id }) => (
              <FileListItem id={id} key={id} file={file} deleteFile={deleteFile} />
            ))}
          </Box>
        )}

        {(type === 'image' || type === 'video') && (
          <Stack mb="25px" direction="row" alignItems="center" justifyContent="space-around">
            <Button
              variant="text"
              onClick={() => changeToDefaultValue('load')}
              sx={FileMenuButtonS(loadMethod === 'load')}
            >
              Загрузить
            </Button>

            <Button
              variant="text"
              onClick={() => changeToDefaultValue('link')}
              sx={FileMenuButtonS(loadMethod === 'link')}
            >
              Вставить ссылку
            </Button>
          </Stack>
        )}

        {loadMethod === 'link' ? (
          <>
            <TextField
              fullWidth
              error={!!error}
              helperText={error}
              variant="outlined"
              onKeyDown={onKeyDown}
              onChange={onInputLinkChange}
              label={`Вставьте ссылку на ${type === 'image' ? 'изображение' : 'видео'}...`}
              sx={{
                mb: type === 'video' ? '12px' : '25px',
                borderRadius: '8px',
              }}
            />

            {type === 'video' && (
              <Typography
                sx={{
                  mb: '25px',
                  color: '#999',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '16px',
                }}
              >
                Работает с YouTube, Vimeo
              </Typography>
            )}
          </>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            onDrop={onDropAreaChange}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            sx={{
              height: '80px',
              width: '100%',
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'center',
              borderRadius: '8px',
              marginBottom: '25px',
              padding: '18px',
              border: '1px dashed #BD9FFF',
              color: file || error ? '#333' : '#BD9FFF',
              transition: 'background-color 0.3s ease-out',
              backgroundColor: file || error ? `${error ? '#ff7171' : '#8aff83'}` : '#F5F0FF',
            }}
          >
            <input
              type="file"
              ref={inputRef}
              multiple={type === 'file'}
              onChange={onInputFileChange}
              style={{ display: 'none' }}
            />

            {error || description}
          </Stack>
        )}

        <Button
          fullWidth
          disabled={!!error}
          variant="contained"
          onClick={addOutputFile}
          sx={{
            p: '10px 55px',
            fontWeight: 500,
            fontSize: '18px',
            borderRadius: '8px',
            fontFamily: 'Inter',
            textTransform: 'none',
            backgroundColor: '#445AFF',
          }}
        >
          {type === 'file' ? 'Загрузить' : text}
        </Button>
      </Box>

      {type === 'image' && (
        <img
          alt="none"
          aria-hidden="true"
          onError={onFileSrcError}
          style={{ display: 'none' }}
          src={file ? window.URL.createObjectURL(file) : `${link}`}
        />
      )}

      {type === 'video' && (
        <video
          title="none"
          aria-hidden="true"
          onError={onFileSrcError}
          style={{ display: 'none' }}
          src={file ? window.URL.createObjectURL(file) : ''}
        />
      )}
    </Menu>
  );
};

export default FileMenu;
