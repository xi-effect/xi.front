/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { Stack, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { inject, observer } from 'mobx-react';
import { useCopyToClipboard } from 'react-use';

import TextFieldCustom from 'kit/TextFieldCustom';

const Account = inject(
  'rootStore',
  'userSt',
)(
  observer(({ rootStore, userSt }) => {
    // Используется тестовый код, нужно заменить значение из API
    const [statusCopy, setStatusCopy] = useState(false);
    const [openQR, setOpenQR] = React.useState(false);

    const [state, copyToClipboard] = useCopyToClipboard();

    return (
      <Stack
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          width: '100%',
        }}
      >
        <Typography sx={{ pl: 2, pr: 2, pb: 4 }}>
          Скопируйте ссылку и отправьте человеку, которого хотели бы пригласить на платформу.
          Приглашённый пользователь, получив от вас ссылку, может сразу её открыть. Он попадёт на
          страницу регистрации, а код-приглашение будет уже заполнен
        </Typography>
      </Stack>
    );
  }),
);

export default Account;
