import React, { useState } from "react";

import {
  FormControl,
  Stack,
  Grid,
  useTheme,
  Divider,
  InputLabel,
  TextField,
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
import { inject, observer } from "mobx-react";

const UserAvatar = inject(
  "rootStore",
  "settingsStore"
)(
  observer(({ rootStore, settingsStore }) => {
    const theme = useTheme();

    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      ></Grid>
    );
  })
);

export default UserAvatar;
