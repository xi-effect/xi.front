export type errorCode = 404 | 500;

export const errorMessages: { [key in errorCode]: string } = {
  404: 'Страница не найдена',
  500: 'Ошибка сервера',
};
