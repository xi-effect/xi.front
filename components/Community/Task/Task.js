
import React from "react";
import {
    Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import Description from "./Description";
import Target from "./Target";
import Materials from "./Materials";
import Result from "./Result";


const Task = inject()(
    observer(() => (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: "100%",
                height: "100vh",
            }}
        >
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                sx={{
                    width: "100%",
                    height: "100%",
                    maxWidth: 1200,
                    p: 3,
                }}
            >
                <Description />
                <Target />
                <Materials />
                <Result />
            </Stack>
        </Stack>
    ))
);

export default Task;
