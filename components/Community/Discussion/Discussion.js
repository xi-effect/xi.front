
import React from "react";
import {
    Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import Comments from "./Comments";


const Discussion = inject()(
    observer(() => (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                width: "100%",
                height: "100vh",
            }}
        >
            <Comments />
        </Stack>
    ))
);

export default Discussion;
