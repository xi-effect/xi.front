export type errorCode = 403 | 404 | 418 | 500;

export const errorMessages: { [key in errorCode]: string } = {
  403: 'Ошибка доступа',
  404: 'Запрашиваемая страница не найдена',
  418: "I'm a teapot!",
  500: 'Ошибка сервера',
};
