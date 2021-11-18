/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, Button, useTheme, Stack, Typography } from "@mui/material";
import CustomAvatar from '../Avatar/CustomAvatar'

const Upbar = inject(
  "rootStore",
  "settingsStore",
  "uiStore",
  "messageStore"
)(
  observer(({ rootStore, settingsStore, uiStore, messageStore, children }) => {
    const theme = useTheme();
    const router = useRouter();

    return (
<Stack
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  // spacing={2}
  sx={{
      height: '48px',
      width: '100%',
      }}
>
    <Typography variant="h4" sx={{ml: 1, mr: 'auto'}}>
    Ξffect
    </Typography>
    <Typography variant="h6" sx={{ mt: 2, ml: 'auto', mr: 1}}>
    {settingsStore.settings.username}
    </Typography>
    <Box sx={{ height: 48, width: 48, m: 1, cursor: 'pointer' }}>
        <CustomAvatar avatar={{ ...settingsStore.settings.avatar, bgcolor: 'rgba(0,0,0,0)' }} viewBox={{ x: '50', y: '-110', width: '690', height: '690' }} reverse={true}/>
    </Box>
  </Stack>
    );
  })
);

export default Upbar;
