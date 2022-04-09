import React from "react";
import {
    Stack,
    Paper,
} from "@mui/material";

import { inject, observer } from "mobx-react";

const DateLine = inject()(
    observer(() => (
            <Paper
                elevation={24}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "primary.main",
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
                                borderLeft: "1px solid",
                                borderColor: "text.secondary",
                            }}
                        >
                            {`пт, ${1 + index} января`}
                        </Stack>
                    )}
                </Stack>
            </Paper>

        ))
);

export default DateLine;
