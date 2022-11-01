import React from 'react';

import { Stack, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const typographyStyles = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  color: 'grayscale.40',
};

type FormValues = {
  password: string;
  newPassword: string;
  newPasswordAgain: string;
};

const schema = yup
  .object({
    password: yup.string().min(6).max(100).required(),
    newPassword: yup.string().min(6).max(100).required(),
    newPasswordAgain: yup.string().min(6).max(100).required(),
  })
  .required();

const Account = inject(
  'rootStore',
  'profileSt',
)(
  observer(() => {
    const {
      control,
      handleSubmit,
      // trigger,
      // reset,
      // formState: { errors },
    } = useForm<FormValues>({
      resolver: yupResolver(schema),
    });

    const onSubmit = (newData) => {
      console.log('newData', newData);
    };

    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const handleChange = (newValue: Dayjs | null) => {
      setValue(newValue);
    };

    return (
      <>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            bgcolor: 'grayscale.0',
            width: '100%',
            height: '120px',
            borderRadius: '8px',
            padding: '24px 36px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
            }}
          >
            Kolipseazer
          </Typography>
        </Stack>

        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            bgcolor: 'grayscale.0',
            width: '100%',
            borderRadius: '8px',
            padding: '24px',
          }}
        >
          <Typography
            sx={{
              ...typographyStyles,
            }}
          >
            Никнейм
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                type="text"
                fullWidth
                placeholder="Текущий пароль"
                {...field}
                sx={{
                  mt: '4px',
                  backgroundColor: 'grayscale.0',
                }}
              />
            )}
          />
          <Typography
            sx={{
              mt: '24px',
              ...typographyStyles,
            }}
          >
            Имя
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                type="text"
                fullWidth
                placeholder="Текущий пароль"
                {...field}
                sx={{
                  mt: '4px',
                  backgroundColor: 'grayscale.0',
                }}
              />
            )}
          />
          <Typography
            sx={{
              mt: '24px',
              ...typographyStyles,
            }}
          >
            Фамилия
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                type="text"
                fullWidth
                placeholder="Текущий пароль"
                {...field}
                sx={{
                  mt: '4px',
                  backgroundColor: 'grayscale.0',
                }}
              />
            )}
          />
          <Typography
            sx={{
              mt: '24px',
              ...typographyStyles,
            }}
          >
            Отчество
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldCustom
                variant="outlined"
                type="text"
                fullWidth
                placeholder="Текущий пароль"
                {...field}
                sx={{
                  mt: '4px',
                  backgroundColor: 'grayscale.0',
                }}
              />
            )}
          />
          <Typography
            sx={{
              mt: '24px',
              ...typographyStyles,
            }}
          >
            Дата рождения
          </Typography>
          <DesktopDatePicker
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextFieldCustom {...params} />}
            maxDate={dayjs()}
          />
        </Stack>
      </>
    );
  }),
);

export default Account;
