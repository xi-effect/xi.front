/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { inject, observer } from "mobx-react";

const SubPaper = inject()(
    observer(() => (
        <Paper
            elevation={18}
            sx={{
                width: "100%",
                height: "100%",
                maxWidth: 300,
                borderRadius: 8,
            }}
        >
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    width: "100%",
                    height: "100%",
                    p: 2,
                }}
            >
                <Typography variant="h5">
                    Статус
                </Typography>
            </Stack>
        </Paper>
    ))
);

export default SubPaper;
