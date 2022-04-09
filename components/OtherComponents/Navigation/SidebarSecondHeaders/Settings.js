/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react"

import { Typography, Stack, } from "@mui/material";


const Settings = inject()(observer(() => (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                }}
            >
                Настройки
            </Typography>
        </Stack>
    )));

export default Settings;