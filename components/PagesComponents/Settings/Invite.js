import React, { useState } from "react";

import {
  FormControl,
  Stack,
  Grid,
  useTheme,
  TextField,
  Tooltip,
  tooltipClasses,
  Divider,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  Switch,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { inject, observer } from "mobx-react";

import { useCopyToClipboard } from "react-use";

const Invite = inject(
  "rootStore",
  "settingsStore"
)(
  observer(({ rootStore, settingsStore }) => {
    const theme = useTheme();

    //Используется тестовый код, нужно заменить значение из API
    const [inviteCode, setInviteCode] = useState("M36P07lB2FTP");
    const [statusCopy, setStatusCopy] = useState(false);

    const [state, copyToClipboard] = useCopyToClipboard();

    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
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
            defaultValue={settingsStore.settings.invite}
            onClick={() => {
              copyToClipboard("https://xieffect.netlify.app/registration?invite=" + settingsStore.settings.invite)
              setStatusCopy(true)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button sx={{ color: 'text.main' }}>
                    <ContentCopyIcon />
                  </Button>
                </InputAdornment>
              ),
              readOnly: true,
              style: {
                cursor: "pointer",
                minWidth: 450,
              },
            }}
          // onClick={copyInviteCode}
          />
        </Tooltip>
      </Grid >
    );
  })
);

export default Invite;
