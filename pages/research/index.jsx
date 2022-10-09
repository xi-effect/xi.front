import React, { useRef, useState } from 'react';
import {
  Button,
  Stack,
  Typography,
  LinearProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel, Radio, Box
} from '@mui/material';
import { AttachFile, TextSnippetOutlined, Clear } from '@mui/icons-material';
import { useGetFile, usePostFiles, useDeleteFiles } from 'utils/useFiles';
import TextField from '@mui/material/TextField';

const Research = () => {
  const filePicker = useRef(null);
  const [filesArray, setFilesArray] = useState([]);

  const [formType, setFormType] = useState('post');
  const [getFileName, setGetFileName] = useState('');
  const [deleteFileName, setDeleteGetFileName] = useState('');


  const { handleGetFile, downloadURL, error: getError, isLoading } = useGetFile();
  const { handlePostFile, fileSizeFormat, isUploading, error: postError, notUploaded } = usePostFiles();
  const { handleDeleteFile, error: deleteError, isDeleting } = useDeleteFiles();

  if (notUploaded) {
    console.log('Файлы не были загружена на сервер:', notUploaded);
  }

  if (formType === 'post') {
    console.log('Error post:', postError);
  }

  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };

  const handleFormGetFileNameChange = (event) => {
    setGetFileName(event.target.value);
  };

  const handleFormDeleteFileNameChange = (event) => {
    setDeleteGetFileName(event.target.value);
  };

  const handleInputFile = (event) => {
    setFilesArray(prevState => [...prevState, ...event.target.files]);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  const handleFileDelete = (event) => {
    setFilesArray(prevState => prevState.filter((_, index) => index !== Number(event.target.dataset.id)));
  };

  return (
    <>
      <FormControl sx={{ position: 'absolute' }} >
        <FormLabel id="demo-controlled-radio-buttons-group">API files</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={formType}
          onChange={handleFormTypeChange}
        >
          <FormControlLabel value="get" control={<Radio />} label="get" />
          <FormControlLabel value="post" control={<Radio />} label="post" />
          <FormControlLabel value="delete" control={<Radio />} label="delete" />
        </RadioGroup>
      </FormControl>
       {
          formType === 'get'
        &&
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                height: '372px', m: '24px 24px 0 24px',
                border: '1px solid #E6E6E6',
                borderRadius: '8px',
              }}
            >
              <Box
                textAlign="center"
                sx={{
                  width: '300px',
                  minHeight: '300px'
                }}
              >
                {downloadURL && !getError ?
                  <img
                    alt=""
                    src={downloadURL}
                    style={{
                      maxWidth: '350px',
                      height: 'auto'
                    }}
                  />
                 : <Typography variant="h6" textAlign="center">{getError}</Typography>
                }
              </Box>
            </Stack>
            {
              isLoading &&
              <Stack
                sx={{
                  m: '-8px 32px 0 32px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '8px',
                }}
              >
                <LinearProgress/>
              </Stack>
            }

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                m: '24px 24px 10px 24px'
              }}
            >
              <TextField
                variant="outlined"
                sx={{ width: '100%', height: '48px' }}
                onChange={handleFormGetFileNameChange}
                value={getFileName}
                placeholder="Введите имя файла"
              />
            </Stack>
            <Stack
              sx={{
                height: '48px',
                m: '12px 24px 24px 24px'
              }}
            >
              <Button
                onClick={() => handleGetFile(getFileName)}
                variant="contained"
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: '#445AFF',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  textTransform: 'none',
                }}>Загрузить</Button>
            </Stack>
          </Stack>
        </Stack>
      }

      {
        formType === 'post'
        && <>
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
                      isUploading={isUploading && index === 0}
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
                  onClick={() => handlePostFile(filesArray)}
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
      }
      {
        formType === 'delete'
        &&
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                height: '72px', m: '24px 24px 0 24px',
                border: '1px solid #E6E6E6',
                borderRadius: '8px',
              }}
            >
              {
                deleteError && <Typography variant="h6" textAlign="center">{deleteError}</Typography>
              }
            </Stack>
            {
              isDeleting &&
              <Stack
                sx={{
                  m: '-8px 32px 0 32px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '8px',
                }}
              >
                <LinearProgress/>
              </Stack>
            }
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing="12px"
              sx={{
                m: '24px 24px 10px 24px'
              }}
            >
              <TextField
                variant="outlined"
                sx={{ width: '100%', height: '48px' }}
                onChange={handleFormDeleteFileNameChange}
                value={deleteFileName}
                placeholder="Введите идентификатор файла"
              />
            </Stack>
            <Stack
              sx={{
                height: '48px',
                m: '12px 24px 24px 24px'
              }}
            >
              <Button
                onClick={() => handleDeleteFile(deleteFileName)}
                variant="contained"
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: '#445AFF',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  textTransform: 'none',
                }}>Удалить</Button>
            </Stack>
          </Stack>
        </Stack>
      }
    </>
  );
};

export default Research;

const FileItemComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, fileName, fileSize, handleFileDelete, isUploading } = props;

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
        isUploading &&
        <Stack
          sx={{
            m: '-8px 32px 0 32px',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
          }}
        >
          <LinearProgress/>
        </Stack>
      }
    </>
  );
};
