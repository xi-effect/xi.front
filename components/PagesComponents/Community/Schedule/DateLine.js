import React from "react";
import {
    CircularProgress,
    Skeleton,
    Grid,
    Typography,
    useTheme,
    Box,
    IconButton,
    Stack,
    Paper,
    Tooltip,
    Button,
    Container,
} from "@mui/material";

import { inject, observer } from "mobx-react";

const DateLine = inject("knowledgeStore")(
    observer(({ knowledgeStore }) => {


        return (
            <Paper
                elevation={24}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: 'primary.main',
                        // borderTopLeftRadius: 16,
                        pl: "82px",
                    }}
                >
                    {[...Array(10)].map((item, index) =>
                        <Stack
                            key={index.toString()}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                height: 32,
                                width: 356,
                                borderLeft: '1px solid',
                                borderColor: 'text.secondary',
                            }}
                        >
                            {`пт, ${1 + index} января`}
                        </Stack>
                    )}
                </Stack>
            </Paper>

        );
    })
);

export default DateLine;
