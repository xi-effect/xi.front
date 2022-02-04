/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import {
    Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";

const NewCommentCreation = inject()(
    observer(() => (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        />
    ))
);

export default NewCommentCreation;
