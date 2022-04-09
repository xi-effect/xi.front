/* eslint-disable no-shadow */
import React from "react";
import {
    Typography,
    Box,
    Stack,
    Paper,
} from "@mui/material";

import { inject, observer } from "mobx-react";

const LessonsList = inject()(
    observer(() => (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    bgcolor: "grey.800",
                    width: "82px",
                    height: "100%",
                }}
            >
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: "100%",
                        width: "100%",
                        pt: 1,
                        touchAction: "pan-y",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                >
                    {[...Array(20)].map((item, index) =>
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="center"
                            key={index.toString()}
                            sx={{
                                minHeight: "90px",
                                width: "82px",
                            }}
                        >
                            {`${index + 6}:00`}
                        </Stack>
                    )}
                </Stack>
            </Stack>
            {[...Array(10)].map((item1, index) =>
                <Stack
                    key={index.toString()}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: 356,
                        pl: 1,
                    }}
                >
                    {[...Array(30)].map((item2, index) =>
                        <Box
                            key={index.toString()}
                            sx={{
                                mt: 2,
                                width: "100%",
                                position: "relative",
                                m: 1,
                            }}
                        >
                            <Paper
                                elevation={24}
                                sx={{
                                    minHeight: "32px",
                                    height: "32px",
                                    width: "calc(100% - 8px)",
                                    borderRadius: "8px",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                            height: "32px",
                                            width: "72px",
                                            bgcolor: "primary.main",
                                            borderTopLeftRadius: "8px",
                                            borderBottomLeftRadius: "8px",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                // color: getTaskColor(task.type),
                                                // width: "calc(100% - 16px)",
                                                // ml: 2,
                                            }}
                                            noWrap
                                        >
                                            11:00
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            // color: getTaskColor(task.type),
                                            width: "calc(100% - 16px)",
                                            ml: 2,
                                        }}
                                        noWrap
                                    >
                                        Занятие
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Box>
                    )}
                </Stack>
            )}
        </Stack>
    ))
);

export default LessonsList;
