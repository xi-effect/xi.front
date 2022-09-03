import React, { useRef, useState } from 'react';
import { Button, Stack, Typography, LinearProgress } from '@mui/material';
import { AttachFile, TextSnippetOutlined, Clear } from '@mui/icons-material';

const baseUrl = 'https://xieffect.ru:5000/files/';

// eslint-disable-next-line no-nested-ternary
const fileSizeFormat = (size) => size.toString().length > 9 ? `${(size / 1073741824).toFixed(1)} GB`
  // eslint-disable-next-line no-nested-ternary
  : size.toString().length > 6 ? `${(size / 1048576).toFixed(1)} MB`
    : size.toString().length > 3 ? `${(size / 1024).toFixed(1)} KB`
      : `${size} Bytes`;

const Research = () => {
  const filePicker = useRef(null);

  const [filesArray, setFilesArray] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [serverAnswerPost, setServerAnswerPost] = useState({});

  const handleInputFile = (event) => {
    setFilesArray(prevState => [...prevState, ...event.target.files]);
  };

  const handlePost = async () => {
    if (!filesArray) {
      console.log('Choose a file!');
      return;
    }
    setIsFetching(true);

    while(filesArray.length) {
      try {
        const formData = new FormData();
        formData.append('file', filesArray.shift());

        // eslint-disable-next-line no-await-in-loop
        const res = await fetch(baseUrl,
          {
            method: 'POST',
            body: formData,
            credentials: "include",
            mode: "cors",
          }
        );
        // eslint-disable-next-line no-await-in-loop
        setServerAnswerPost(await res.json());
      } catch (e) {
        console.log('###-Error:',e);
      } finally {
        console.log('###-ResPost:', JSON.stringify(serverAnswerPost));
      }
    }
    setIsFetching(false);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  const handleFileDelete = (event) => {
    setFilesArray(prevState => prevState.filter((_, index) => index !== Number(event.target.dataset.id)));
  };

  return (
    <>
      <input
        onChange={handleInputFile}
        type="file"
        ref={filePicker}
        multiple
        style={{ position: 'absolute', visibility: 'hidden' }}
      />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#ECEFFF',
        }}
      >
        <Stack
          sx={{
            width: '508px',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Stack direction="row" justifyContent="space-between" sx={{ m: '24px 24px 12px 24px' }}>
            <Stack direction="row" alignItems="flex-end">
              <Typography variant="h5"><strong>Решение</strong></Typography>
              <Typography variant="subtitle2" color="#999999" sx={{ ml: '5px', mb: '4px' }}>до 14 сен 22</Typography>
            </Stack>
            <Typography variant="subtitle1"
                        sx={{
                          borderRadius: '8px',
                          backgroundColor: '#B0F9CE',
                          color: '#11743A',
                          p: '4px 14px 4px 14px'
                        }}
            >
              Назначено
            </Typography>
          </Stack>

          {filesArray
            .map((file, index) =>
              (
                <FileItemComponent
                  key={index}
                  id={index}
                  handleFileDelete={handleFileDelete}
                  fileName={file.name}
                  fileSize={fileSizeFormat(file.size)}
                  isFetching={isFetching && index === 0}
                />
              ))}

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing="12px"
            sx={{
              m: '24px 24px 0 24px'
            }}
          >
            <Button onClick={handlePick} variant="outlined" startIcon={<AttachFile/>}
                    sx={{ width: '50%', height: '48px' }}>
              Прикрепить
            </Button>
            <Button variant="outlined" startIcon={<TextSnippetOutlined/>} sx={{ width: '50%', height: '48px' }}>
              Редактор
            </Button>
          </Stack>
          <Stack
            sx={{
              height: '48px',
              m: '12px 24px 24px 24px'
            }}
          >
            <Button
              onClick={handlePost}
              variant="contained"
              sx={{
                width: '100%',
                borderRadius: '8px',
                backgroundColor: '#445AFF',
                color: '#FFFFFF',
                fontSize: '18px',
                textTransform: 'none',
              }}>Сдать</Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Research;

const FileItemComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, fileName, fileSize, handleFileDelete, isFetching } = props;

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: '72px', m: '12px 24px 0 24px',
          border: '1px solid #E6E6E6',
          borderRadius: '8px',
        }}
      >
        <Stack direction="row">
          <Stack>
            <TextSnippetOutlined sx={{ width: '45px', height: '55px', ml: '15px', color: '#445AFF' }}/>
          </Stack>
          <Stack direction="column" spacing="5px" sx={{ ml: '10px' }}>
            <Stack><Typography variant="subtitle1">{fileName}</Typography></Stack>
            <Stack><Typography variant="subtitle2">{fileSize}</Typography></Stack>
          </Stack>
        </Stack>

        <Stack sx={{ mr: '15px', cursor: 'pointer' }} data-id={id} onClick={handleFileDelete}>
          <Clear/>
        </Stack>
      </Stack>
      {
        isFetching &&
        <Stack
          sx={{
            m: '-8px 32px 0 32px',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
          }}
        >
          <LinearProgress />
        </Stack>
      }

    </>
  );
};
