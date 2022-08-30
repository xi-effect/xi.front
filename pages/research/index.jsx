import React, { useState } from 'react';
import { Button, Box, Stack, Typography, Divider, TextField } from '@mui/material';

const baseUrl = 'https://xieffect.ru:5000/files/';

// eslint-disable-next-line no-nested-ternary
const fileSizeFormat = (size) => size.toString().length > 9 ? `${(size / 1073741824).toFixed(3)} MB`
  // eslint-disable-next-line no-nested-ternary
  : size.toString().length > 6 ? `${(size / 1048576).toFixed(1)} MB`
    : size.toString().length > 3 ? `${(size / 1024).toFixed(1)} KB`
      : `${size} Bytes`;

const Research = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const [fileProperty, setFileProperty] = useState({});
  const [serverAnswerGet, setServerAnswerGet] = useState({});
  const [serverAnswerPost, setServerAnswerPost] = useState({});
  const [serverAnswerDelete, setServerAnswerDelete] = useState({});
  const [fileName, setFileName] = useState('');
  const [indexDelete, setIndexDelete] = useState('');


  const handleChange = (event) => {
    setFileName(event.target.value);
  };

  const handleChangeDelete = (event) => {
    setIndexDelete(event.target.value);
  };

  const handleGet = async () => {
    if (!fileName) {
      // alert("Please enter a fileName");
      return;
    }

    const res = await fetch(`${baseUrl + fileName}/`,
      {
        method: 'GET'
      }
    );
    setServerAnswerGet(res);
    const responseBlob = await res.blob();
    // @ts-ignore
    setUploaded(URL.createObjectURL(responseBlob));
  };

  const handlePost = async () => {
    if (!selectedFile) {
      // alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch(baseUrl,
      {
        method: 'POST',
        body: formData,
        credentials: "include",
        mode: "cors",
      }
    );
    setServerAnswerPost(await res.json());
  };

  const handleWinFilePicker = async () => {
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker();
    const fileData = await fileHandle.getFile();
    if (fileData) {
      // eslint-disable-next-line guard-for-in
      const tempData = {};
      // eslint-disable-next-line guard-for-in
     for (const attr in fileData) {
       if (attr) {
        tempData[attr] = fileData[attr].toString();
       }
     }
     setFileProperty(tempData);
    }
    setSelectedFile(fileData);
  };

  const handleDelete = async () => {
    if (!indexDelete) {
      // alert("Please enter a index");
      return;
    }

    const res = await fetch(`${baseUrl}manager/${indexDelete}/`,
      {
        method: 'DELETE',
        credentials: "include",
        mode: "cors",
      }
    );
    setServerAnswerDelete(await res.json());
  };

  // @ts-ignore
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        justifyContent="center"
        bgcolor="#dddddd"
        sx={{
          pb: '10px',
          pt: '10px'
        }}
      >
        <Stack width="500px" >
          <Button
            sx={{
              backgroundColor: 'primary.dark',
              color: 'gray.0'
            }}
            onClick={handleWinFilePicker}
          >Upload</Button>
          <Box
            textAlign="center"
            sx={{
              width: '300px',
              minHeight: '300px'
            }}
          >
            {fileProperty?.type?.includes('image') ? (
                <img
                  alt=""
                  src={URL.createObjectURL(new Blob([selectedFile]))}
                  style={{
                    maxWidth: '300px',
                    height: 'auto'
                  }}
                />
            ) : <Typography variant="h6" textAlign="center">Preview</Typography>
            }
          </Box>
          <Button
            sx={{
              backgroundColor: 'primary.dark',
              color: 'gray.0'
            }}
            onClick={handlePost}
          >POST</Button>

        </Stack>
        <Stack width="500px" direction="column">
          <Typography variant="h5" textAlign="center">File property:</Typography>
          <ul>
            {fileProperty &&
              Object.keys(fileProperty).map((attribute, index) => (
                <li key={`${index}-${attribute}`}>
                  <strong>{`${attribute}: `}</strong>
                  {attribute === 'size' ? fileSizeFormat(fileProperty[attribute]) : fileProperty[attribute]}
                </li>
              ))}
          </ul>
          <Typography variant="h5" textAlign="center">Server answer:</Typography>
          <Typography variant="h6" textAlign="center">{JSON.stringify(serverAnswerPost)}</Typography>
        </Stack>
      </Stack>

      <Divider
        sx={{
          width: '100%',
          height: '5px',
          backgroundColor: '#000000', // gray.100
          borderRadius: '100px',
        }}
      />

      <Stack
        direction="row"
        spacing={2}
        width="100%"
        justifyContent="center"
        bgcolor="#c5c5c5"
        sx={{
          pb: '10px',
          pt: '10px'
        }}
      >
        <Stack width="500px" justifyContent="center">

          <TextField
          label="Введите имя файла"
          value={fileName}
          defaultValue=""
          onChange={handleChange}
          />
          <Button
            sx={{
              backgroundColor: 'primary.dark',
              color: 'gray.0'
            }}
            onClick={handleGet}
          >GET</Button>
        </Stack>
      <Stack width="500px" alignItems="center">
        <Typography variant="h5" textAlign="center">Load from server:</Typography>
          <Box
            textAlign="center"
            sx={{
              width: '300px',
              minHeight: '300px'
            }}
          >
            {uploaded ? (
            <img
              alt=""
              src={uploaded}
              style={{
                maxWidth: '300px',
                height: 'auto'
              }}
            />
            )
              : <Typography variant="h6" textAlign="center">Preview</Typography>
            }
          </Box>
        <Typography variant="h5" textAlign="center">Server answer:</Typography>
        <Typography variant="h6" textAlign="center">{JSON.stringify(serverAnswerGet)}</Typography>
      </Stack>
      </Stack>

      <Divider
        sx={{
          width: '100%',
          height: '5px',
          backgroundColor: '#000000', // gray.100
          borderRadius: '100px',
        }}
      />

      <Stack
        direction="row"
        spacing={2}
        width="100%"
        justifyContent="center"
        bgcolor="#dddddd"
        sx={{
          pb: '10px',
          pt: '10px'
        }}
      >
        <Stack width="500px" justifyContent="center">

          <TextField
            label="Введите индекс файла"
            value={indexDelete}
            defaultValue=""
            onChange={handleChangeDelete}
          />
          <Button
            sx={{
              backgroundColor: 'primary.dark',
              color: 'gray.0'
            }}
            onClick={handleDelete}
          >Delete</Button>
        </Stack>
        <Stack width="500px" alignItems="center">
          <Typography variant="h5" textAlign="center">Server answer:</Typography>
          <Typography variant="h6" textAlign="center">{JSON.stringify(serverAnswerDelete)}</Typography>
        </Stack>
      </Stack>

    </>
  );
};

export default Research;
