import { Dayjs } from 'dayjs';

export type ProfileT = {
    email: string;
    confirmed: boolean | null; // Подтверждён ли email
    invite: string | null;
    name: string;
    surname: string;
    patronymic: string;
    birthday: Dayjs | null; // "2011-12-19T15:28:46.493Z" date.toISOString();
};
