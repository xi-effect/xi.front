import { useState } from 'react';

const baseUrl: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/files/`;

interface IFile {
  name: string;
  size: number;
  type: string;
}

interface IResult {
  url?: string;
  error?: string;
}

const fileSizeFormat = (fileSize: number): string => {
  const stringLength: number = fileSize.toString().length;
  if (stringLength > 9) {
    return `${(fileSize / 1000 ** 3).toFixed(1)} ГБ`;
  }
  if (stringLength > 6) {
    return `${(fileSize / 1000 ** 2).toFixed(1)} МБ`;
  }
  if (stringLength > 3) {
    return `${(fileSize / 1000).toFixed(1)} КБ`;
  }
  return `${fileSize} Б`;
};

const getFile = async (fileName): Promise<IResult> => {
  try {
    const response = await fetch(`${baseUrl + fileName}/`);

    if (response.status === 200) {
      const dataBlob = await response.blob();
      return { url: URL.createObjectURL(dataBlob) };
    }
    return { error: 'Ошибка получения файла' };
  } catch (e) {
    return { error: 'Ошибка получения файла' };
  }
};

export const useGetFile: any = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>();
  const [error, setError] = useState<string>();

  const handleGetFile = async (fileName: string) => {
    if (!fileName) {
      setError('Имя файла не может быть пустым');
      return;
    }
    setIsLoading(true);

    const data = await getFile(fileName);
    if (data.url) {
      setDownloadURL(data.url);
      setError(undefined);
    } else if (data.error) {
      setError(data.error);
    }
    setIsLoading(false);
  };

  return { handleGetFile, downloadURL, error, isLoading };
};

const postFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      mode: 'cors',
    });

    if (response.status === 200) {
      const data = await response.json();

      return { ...data };
    }
  } catch (e) {
    return { error: 'Файл не был загружен на сервер' };
  }
  return { error: 'Файл не был загружен на сервер' };
};

export const usePostFiles: any = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [notUploaded, setNotUploaded] = useState<any[]>();

  const validate = (files: IFile[]): boolean => {
    if (!files.length) {
      setError('Отсутсвуют файлы к отправке');
      return false;
    }

    for (const file of files) {
      if (file.size > 4 * 1000 ** 2) {
        setError('Размер файла превышает 4 МБ');
        return false;
      }
    }
    setError(undefined);
    return true;
  };

  const postFiles = async (files) => {
    const currentFile = files.shift();

    const data = await postFile(currentFile);

    if (data.error) {
      setNotUploaded((prevState) => (prevState ? [...prevState, currentFile] : [currentFile]));
    }
    if (!files.length) return files;

    return postFiles(files);
  };

  const handlePostFile = async (filesToPost: IFile[]) => {
    if (!validate(filesToPost)) {
      return;
    }

    setIsUploading(true);
    const data = await postFiles(filesToPost);
    if (data.error) {
      setError(data.error);
    } else setError(undefined);
    setIsUploading(false);
  };

  return { handlePostFile, fileSizeFormat, isUploading, error, notUploaded };
};

const deleteFile = async (fileId): Promise<IResult> => {
  try {
    const response = await fetch(`${baseUrl}manager/${fileId}/`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
    });

    if (response.status === 200) {
      const data = await response.json();
      return { ...data };
    }
    return { error: 'Ошибка удаления файла' };
  } catch (e) {
    return { error: 'Ошибка удаления файла' };
  }
};

export const useDeleteFiles: any = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleDeleteFile = async (fileId: string) => {
    if (!fileId) {
      setError('Идентификатор файла не может быть пустым');
      return;
    }

    setIsDeleting(true);
    const data = await deleteFile(fileId);
    if (data.error) {
      setError(data.error);
    } else setError(undefined);
    setIsDeleting(false);
  };

  return { handleDeleteFile, error, isDeleting };
};
