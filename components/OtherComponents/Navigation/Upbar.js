/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, Button, useTheme, Stack, Typography } from "@mui/material";


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
  spacing={2}
  sx={{
      height: '48px',
      width: '100vw',
      }}
>
    <Typography variant="h4" sx={{ml: 1}}>
    Ξffect
    </Typography>
</Stack>
    );
  })
);

export default Upbar;
