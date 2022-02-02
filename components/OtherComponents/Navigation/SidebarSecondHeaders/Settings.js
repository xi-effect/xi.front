/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { Typography, Stack, } from "@mui/material";

import { motion } from "framer-motion";

const Settings = inject("rootStore")(observer(({ rootStore }) => {

    return (
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
                    // p: 1
                }}
            >
                Настройки
            </Typography>
        </Stack>
    )
}));

export default Settings;