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
              ? "Код успешно скопирован в буфер!"
              : "Кликните чтобы скопировать код"
          }
        >
          <TextField
            id="invite-code"
            label="Код приглашения"
            defaultValue={inviteCode}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button sx={{color: 'text.main'}} onClick={() => {
                    copyToClipboard(inviteCode)
                    setStatusCopy(true)
                  }}>
                  <ContentCopyIcon />
                </Button>
                </InputAdornment>
        ),
        readOnly: true,
        style: {
          cursor: "pointer",
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
