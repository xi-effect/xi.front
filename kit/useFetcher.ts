import { useState } from 'react';

const baseUrl: string = 'https://xieffect.ru:5000/files/';

interface IFile {
  name: string,
  size: number,
  type: string
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

export const useGetFetcher: any = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getURL, setGetURL] = useState<string>();
  const [errors, setErrors] = useState<string>();

  const handleGet = async (fileName: string) => {
    if (!fileName) {
      setErrors('Имя файла не может быть пустым');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl + fileName}/`);

      switch (response.status) {
        case 200:
          setGetURL(URL.createObjectURL(await response.blob()));
          break;
        default:
          throw new Error('Ошибка получения файла');
      }
    } catch (e) {
      setErrors(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGet, getURL, errors, isLoading, fileSizeFormat };
};

export const usePostFetcher: any = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>();
  const [notUploaded, setNotUploaded] = useState();

  const validate = (files: IFile[]): boolean => {
    if (!files.length) {
      setErrors('Отсутсвуют файлы к отправке');
      return false;
    }

    for (const file of files) {
      if (file.size > 4 * 1000 ** 2) {
        setErrors('Размер файла превышает 4 МБ');
        return false;
      }
    }
    setErrors(undefined);
    return true;
  };

  const handlePost = async (filesToPost: IFile[]) => {
    if (!validate(filesToPost)) {
      return;
    }
    setIsLoading(true);

    while (filesToPost.length) {
      const currentFile = filesToPost.shift();
      try {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', currentFile);

        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(baseUrl,
          {
            method: 'POST',
            body: formData,
            credentials: "include",
            mode: "cors",
          }
        );

        switch (response.status) {
          case 200:
            // eslint-disable-next-line no-await-in-loop,no-case-declarations
            const data = await response.json();
            console.log(data);
            break;
          default:
            throw new Error('Файлы не были загружены на сервер');
        }
      } catch (e) {
        setErrors(e.message);
        // @ts-ignore
        setNotUploaded(prevState => prevState ? [...prevState, currentFile] : [currentFile]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { handlePost, fileSizeFormat, isLoading, errors, notUploaded };
};

export const useDeleteFetcher: any = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>();

  const handleDelete = async (fileId: string) => {
    if (!fileId) {
      setErrors('Идентификатор файла не может быть пустым');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}manager/${fileId}/`,
        {
          method: 'DELETE',
          credentials: "include",
          mode: "cors",
        }
      );

      switch (response.status) {
        case 200:
          // eslint-disable-next-line no-case-declarations
          const data = await response.json();
          console.log(data);
          break;
        default:
          throw new Error('Ошибка удаления файла');
      }
    } catch (e) {
      setErrors(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDelete, errors, isLoading };
};
