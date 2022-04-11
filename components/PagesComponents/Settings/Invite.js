/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  Grid,
  useTheme,
  TextField,
  Tooltip,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { inject, observer } from "mobx-react";
import { useCopyToClipboard } from "react-use";
import QRCode from "react-qr-code";

const Invite = inject(
  "rootStore",
  "userSt"
)(
  observer(({ rootStore, userSt }) => {

    // Используется тестовый код, нужно заменить значение из API
    const [statusCopy, setStatusCopy] = useState(false);
    const [openQR, setOpenQR] = React.useState(false)

    const [state, copyToClipboard] = useCopyToClipboard();

    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          width: "100%"
        }}
      >
        <Tooltip
          title={
            statusCopy
              ? "Ссылка успешно скопирован в буфер обмена!"
              : "Кликните чтобы скопировать ссылку"
          }
        >
          <TextField
            id="invite-code"
            label="Код-приглашение"
            defaultValue={userSt.settings.invite}
            onClick={() => {
              copyToClipboard(`https://xieffect.ru/registration?invite=${userSt.settings.invite}`)
              setStatusCopy(true)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button sx={{ color: "text.primary" }}>
                    <ContentCopyIcon />
                  </Button>
                </InputAdornment>
              ),
              readOnly: true,
              style: {
                cursor: "pointer",
                width: "100%",
              },
            }}
          />
        </Tooltip>
        <Button sx={{ m: 1 }} onClick={() => setOpenQR(true)} variant="contained">
          Сгенерировать QR-код для ссылки-приглашения
        </Button>
        {openQR &&
          <Box
            sx={{
              m: 2,
              width: 256,
              height: 256,
            }}
          >
            <QRCode value={`https://xieffect.netlify.app/registration?invite=${userSt.settings.invite}`} />
          </Box>}
      </Grid >
    );
  })
);

export default Invite;
